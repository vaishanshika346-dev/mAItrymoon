"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ChatMessage } from "@/lib/types";
import { ApiError, sendMessage, sendVoiceMessage } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import MessageBubble from "./MessageBubble";

const FALLBACK_WELCOME =
  "Hi, I'm mAItrymoon — your AI-powered Relationship Counsellor. This is a private space. Tell me what happened, in your own words, and we'll work through it together.";

function newId() {
  return `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export default function ChatWindow({
  sessionId,
  welcomeMessage,
}: {
  sessionId: string;
  welcomeMessage?: string;
}) {
  const { getIdToken } = useAuth();
  const router = useRouter();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "welcome",
      sender: "ai",
      text: welcomeMessage || FALLBACK_WELCOME,
      sentAt: new Date().toISOString(),
    },
  ]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [turnInfo, setTurnInfo] = useState<{ turn: number; max: number } | null>(null);
  const [outOfCredits, setOutOfCredits] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending, isTranscribing]);

  async function handleApiError(err: unknown, fallback: string) {
    if (err instanceof ApiError) {
      if (err.errorKey === "unauthorized") {
        router.replace("/login?redirect=/chat");
        return;
      }
      if (err.errorKey === "session_not_found") {
        router.replace("/dashboard");
        return;
      }
      if (err.errorKey === "payment_required") {
        setOutOfCredits(true);
        setErrorText("You're out of session credits. Visit My Plans on your dashboard to top up.");
        return;
      }
      if (err.errorKey === "transcription_failed") {
        setErrorText("Could not understand audio. Please speak clearly or type instead.");
        return;
      }
    }
    setErrorText(err instanceof Error ? err.message : fallback);
  }

  async function handleSend() {
    const text = draft.trim();
    if (!text || sending || outOfCredits) return;

    const userMessage: ChatMessage = { id: newId(), sender: "user", text, sentAt: new Date().toISOString() };
    setMessages((m) => [...m, userMessage]);
    setDraft("");
    setSending(true);
    setErrorText(null);

    try {
      const idToken = await getIdToken();
      if (!idToken) throw new Error("Your session expired — please log in again.");
      const result = await sendMessage(idToken, sessionId, text);
      setMessages((m) => [
        ...m,
        { id: newId(), sender: "ai", text: result.reply, sentAt: new Date().toISOString() },
      ]);
      setTurnInfo({ turn: result.turnCount, max: result.maxTurns });
    } catch (err) {
      await handleApiError(err, "Something went wrong sending that message. Please try again.");
    } finally {
      setSending(false);
    }
  }

  async function startRecording() {
    setErrorText(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : MediaRecorder.isTypeSupported("audio/mp4")
        ? "audio/mp4"
        : "";
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const blob = new Blob(audioChunksRef.current, { type: mimeType || "audio/webm" });
        await handleVoiceUpload(blob);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      setErrorText("Couldn't access your microphone. Check your browser's mic permission and try again.");
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  }

  async function handleVoiceUpload(blob: Blob) {
    if (blob.size === 0 || outOfCredits) return;
    setIsTranscribing(true);
    setErrorText(null);
    try {
      const idToken = await getIdToken();
      if (!idToken) throw new Error("Your session expired — please log in again.");
      const result = await sendVoiceMessage(idToken, sessionId, blob);
      setMessages((m) => [
        ...m,
        { id: newId(), sender: "user", text: result.transcription, sentAt: new Date().toISOString() },
        { id: newId(), sender: "ai", text: result.reply, sentAt: new Date().toISOString() },
      ]);
      setTurnInfo({ turn: result.turnCount, max: result.maxTurns });
    } catch (err) {
      await handleApiError(err, "Couldn't send that voice note. Please try again.");
    } finally {
      setIsTranscribing(false);
    }
  }

  const busy = sending || isTranscribing;

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
        {isTranscribing && (
          <div className="flex justify-end">
            <div className="rounded-2xl rounded-br-sm bg-ink/10 px-4 py-3 text-sm text-ink/50">
              Transcribing your voice note…
            </div>
          </div>
        )}
        {errorText && <p className="text-center text-sm text-red-600">{errorText}</p>}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-ink/10 bg-white px-4 py-4 sm:px-8">
        {turnInfo && (
          <p className="mb-2 text-right text-[11px] text-ink/35">
            Turn {turnInfo.turn} of {turnInfo.max}
          </p>
        )}
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
            disabled={outOfCredits}
            placeholder={isRecording ? "Recording…" : "Type what's on your mind…"}
            className="max-h-32 flex-1 resize-none rounded-2xl border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
          />
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            disabled={busy || outOfCredits}
            title={isRecording ? "Stop recording" : "Record a voice note"}
            aria-label={isRecording ? "Stop recording" : "Record a voice note"}
            className={`shrink-0 rounded-full border p-3 transition ${
              isRecording
                ? "border-garnet bg-garnet/10 text-garnet"
                : "border-ink/10 text-ink/60 hover:bg-ink/5"
            } disabled:opacity-40`}
          >
            {isRecording ? "⏹" : "🎙"}
          </button>
          <button
            type="submit"
            disabled={!draft.trim() || busy || outOfCredits}
            className="shrink-0 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-canvas hover:bg-ink-light disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
