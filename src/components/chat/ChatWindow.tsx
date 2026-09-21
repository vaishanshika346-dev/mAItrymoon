"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/lib/types";
import { mockSendMessage } from "@/lib/mock-api";
import MessageBubble from "./MessageBubble";

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  sender: "ai",
  text:
    "Hi, I'm mAItrymoon — your AI-powered Relationship Counsellor. This is a private space. Tell me what happened, in your own words, and we'll work through it together.",
  sentAt: new Date().toISOString(),
};

export default function ChatWindow({ sessionId }: { sessionId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [sessionState, setSessionState] = useState<"active" | "error">("active");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  async function handleSend() {
    const text = draft.trim();
    if (!text || sending) return;

    const userMessage: ChatMessage = {
      id: `local_${Date.now()}`,
      sender: "user",
      text,
      sentAt: new Date().toISOString(),
    };
    setMessages((m) => [...m, userMessage]);
    setDraft("");
    setSending(true);
    setSessionState("active");

    try {
      const reply = await mockSendMessage(sessionId, text);
      setMessages((m) => [...m, reply]);
    } catch {
      setSessionState("error");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6 sm:px-8">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        {sending && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-sm text-ink/40 shadow-sm ring-1 ring-ink/5">
              mAItrymoon is typing…
            </div>
          </div>
        )}
        {sessionState === "error" && (
          <p className="text-center text-sm text-red-600">
            Something went wrong sending that message. Please try again.
          </p>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-ink/10 bg-white px-4 py-4 sm:px-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-end gap-2"
        >
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            rows={1}
            placeholder="Type what's on your mind…"
            className="max-h-32 flex-1 resize-none rounded-2xl border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="button"
            disabled
            title="Voice messages aren't connected to the backend yet"
            className="shrink-0 rounded-full border border-ink/10 p-3 text-ink/30"
            aria-label="Voice message (not yet available)"
          >
            🎙
          </button>
          <button
            type="submit"
            disabled={!draft.trim() || sending}
            className="shrink-0 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-canvas hover:bg-ink-light disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
