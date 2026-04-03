"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { suggestedPrompts } from "@/content/site-data";

const TYPING_DELAY = 95;
const BACKSPACE_DELAY = 42;
const PAUSE_AFTER_TYPED = 1600;
const PAUSE_AFTER_ERASED = 340;

export function ChittemGptDock() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [typedPrompt, setTypedPrompt] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (question || isFocused) {
      return;
    }

    const currentPrompt = suggestedPrompts[promptIndex];
    const isAtEnd = typedPrompt === currentPrompt;
    const isAtStart = typedPrompt === "";

    let delay = isDeleting ? BACKSPACE_DELAY : TYPING_DELAY;

    if (!isDeleting && isAtEnd) {
      delay = PAUSE_AFTER_TYPED;
    }

    if (isDeleting && isAtStart) {
      delay = PAUSE_AFTER_ERASED;
    }

    const timer = window.setTimeout(() => {
      if (!isDeleting && isAtEnd) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && isAtStart) {
        setIsDeleting(false);
        setPromptIndex((current) => (current + 1) % suggestedPrompts.length);
        return;
      }

      setTypedPrompt((current) =>
        isDeleting
          ? current.slice(0, -1)
          : currentPrompt.slice(0, current.length + 1),
      );
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isDeleting, isFocused, promptIndex, question, typedPrompt]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;

      if (!target || !dockRef.current || dockRef.current.contains(target)) {
        return;
      }

      if (response || error) {
        setResponse("");
        setError("");
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [response, error]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isLoading) {
      return;
    }

    setIsLoading(true);
    setError("");
    setResponse("");

    try {
      const result = await fetch("/api/chittemgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: trimmedQuestion }),
      });

      const payload = (await result.json()) as {
        answer?: string;
        error?: string;
      };

      if (!result.ok || !payload.answer) {
        throw new Error(payload.error || "ChittemGPT could not answer right now.");
      }

      setResponse(payload.answer);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "ChittemGPT could not answer right now.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="gpt-dock" ref={dockRef}>
      <div className="gpt-dock__header">
        <span className="gpt-dock__label">ChittemGPT</span>
        <span className="gpt-dock__helper">Ask anything from the site</span>
      </div>

      {(response || error || isLoading) ? (
        <div className="gpt-dock__body">
          {isLoading ? <p className="gpt-dock__response">Thinking...</p> : null}
          {response ? (
            <div className="gpt-dock__response gpt-dock__response--markdown">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ node: _node, ...props }) => (
                    <a {...props} target="_blank" rel="noreferrer" />
                  ),
                }}
              >
                {response}
              </ReactMarkdown>
            </div>
          ) : null}
          {error ? <p className="gpt-dock__response gpt-dock__response--error">{error}</p> : null}
        </div>
      ) : null}

      <form className="gpt-dock__form" onSubmit={handleSubmit}>
        <label htmlFor="question" className="visually-hidden">
          Ask ChittemGPT a question
        </label>

        <div
          className="gpt-dock__input-shell"
          onClick={() => inputRef.current?.focus()}
          role="presentation"
        >
          <input
            ref={inputRef}
            id="question"
            name="question"
            value={question}
            onChange={(event) => {
              setQuestion(event.target.value);
              if (response) {
                setResponse("");
              }
              if (error) {
                setError("");
              }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder=""
            autoComplete="off"
          />
          {!question && !isFocused ? (
            <span className="gpt-dock__ghost" aria-hidden="true">
              {typedPrompt}
              <span className="gpt-dock__caret" />
            </span>
          ) : null}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
