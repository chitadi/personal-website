import { NextResponse } from "next/server";

import { askChittemGpt } from "@/lib/chittem-gpt";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let question = "";

  try {
    const body = (await request.json()) as { question?: unknown };
    question = typeof body.question === "string" ? body.question.trim() : "";
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (!question) {
    return NextResponse.json(
      { error: "Question is required." },
      { status: 400 },
    );
  }

  if (question.length > 500) {
    return NextResponse.json(
      { error: "Question is too long. Keep it under 500 characters." },
      { status: 400 },
    );
  }

  try {
    const answer = await askChittemGpt(question);

    return NextResponse.json({ answer });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong while contacting Gemini.";

    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}

