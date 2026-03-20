import { buildProfileText } from "@/lib/site";

const DEFAULT_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${DEFAULT_MODEL}:generateContent`;

type GeminiTextPart = {
  text?: string;
};

type GeminiCandidate = {
  content?: {
    parts?: GeminiTextPart[];
  };
  finishReason?: string;
};

type GeminiResponse = {
  candidates?: GeminiCandidate[];
  promptFeedback?: {
    blockReason?: string;
  };
  error?: {
    message?: string;
  };
};

function buildSystemPrompt() {
  return [
    "You are ChittemGPT, the site assistant for Chittem's personal website.",
    "Answer only from the provided website context.",
    "If the answer is missing from the context, say that the website does not include that information yet.",
    "Do not invent facts that are not present in the context.",
    "Keep answers concise, warm, and factual.",
    "",
    "Website context:",
    buildProfileText(),
  ].join("\n");
}

function extractAnswer(payload: GeminiResponse) {
  return payload.candidates
    ?.flatMap((candidate) => candidate.content?.parts ?? [])
    .map((part) => part.text ?? "")
    .join("")
    .trim();
}

export async function askChittemGpt(question: string) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY.");
  }

  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: buildSystemPrompt() }],
      },
      contents: [
        {
          role: "user",
          parts: [{ text: question }],
        },
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 400,
      },
    }),
    cache: "no-store",
  });

  const payload = (await response.json()) as GeminiResponse;

  if (!response.ok) {
    throw new Error(payload.error?.message || "Gemini request failed.");
  }

  if (payload.promptFeedback?.blockReason) {
    throw new Error(`Gemini blocked the request: ${payload.promptFeedback.blockReason}.`);
  }

  const answer = extractAnswer(payload);

  if (!answer) {
    const finishReason = payload.candidates?.[0]?.finishReason;
    throw new Error(
      finishReason
        ? `Gemini did not return text. Finish reason: ${finishReason}.`
        : "Gemini did not return any text.",
    );
  }

  return answer;
}
