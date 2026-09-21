"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { ApiError, getVerdict } from "@/lib/api";
import type { SessionVerdict } from "@/lib/types";
import ChatWindow from "@/components/chat/ChatWindow";
import SafetyNotice from "@/components/ui/SafetyNotice";

export default function ChatPage() {
  const { user, activeSession, getIdToken } = useAuth();
  const router = useRouter();

  const [verdictOpen, setVerdictOpen] = useState(false);
  const [verdict, setVerdict] = useState<SessionVerdict | null>(null);
  const [verdictStatus, setVerdictStatus] = useState<"idle" | "loading" | "error">("idle");

  useEffect(() => {
    if (user && !user.isOnboarded) {
      router.replace("/consent?redirect=/chat");
      return;
    }
    if (user && !activeSession) {
      router.replace("/dashboard");
    }
  }, [user, activeSession, router]);

  async function openVerdict() {
    if (!activeSession) return;
    setVerdictOpen(true);
    setVerdictStatus("loading");
    try {
      const idToken = await getIdToken();
      if (!idToken) throw new Error("Your session expired — please log in again.");
      const data = await getVerdict(idToken, activeSession.id);
      setVerdict(data);
      setVerdictStatus("idle");
    } catch (err) {
      if (err instanceof ApiError && err.errorKey === "unauthorized") {
        router.replace("/login?redirect=/chat");
        return;
      }
      setVerdictStatus("error");
    }
  }

  if (!user || !user.isOnboarded || !activeSession) return null;

  return (
    <div className="flex flex-1 flex-col bg-moon-light">
      <div className="border-b border-ink/10 bg-white">
        <div className="container-page flex flex-wrap items-center justify-between gap-2 py-3">
          <div>
            <p className="font-serif text-base font-bold text-ink">
              {activeSession.type === "partner" ? "Partner Session" : "Individual Session"}
            </p>
            <p className="text-xs text-ink/50">
              Session status: <span className="font-medium text-ink/70">{activeSession.status}</span>
              {activeSession.partnerCode && (
                <>
                  {" "}
                  · Partner code: <span className="font-mono font-medium text-ink/70">{activeSession.partnerCode}</span>
                </>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <button onClick={openVerdict} className="text-ink/60 underline">
              Assessment
            </button>
            <Link href="/tutorials" className="text-ink/60 underline">
              Help
            </Link>
            <Link href="/dashboard" className="text-ink/60 underline">
              Exit to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="container-page flex flex-1 flex-col py-4">
        <div className="flex flex-1 flex-col overflow-hidden rounded-xl2 border border-ink/10 bg-moon-light">
          <ChatWindow sessionId={activeSession.id} welcomeMessage={activeSession.welcomeMessage} />
        </div>
        <div className="mt-4">
          <SafetyNotice compact />
        </div>
      </div>

      {verdictOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4"
          onClick={() => setVerdictOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-xl2 border border-ink/10 bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h2 className="font-serif text-xl font-bold text-ink">Session Assessment</h2>
              <button
                onClick={() => setVerdictOpen(false)}
                className="text-ink/40 hover:text-ink"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {verdictStatus === "loading" && (
              <p className="mt-4 text-sm text-ink/60">Reviewing your conversation…</p>
            )}
            {verdictStatus === "error" && (
              <p className="mt-4 text-sm text-red-600">
                Couldn't load an assessment right now. Please try again shortly.
              </p>
            )}
            {verdictStatus === "idle" && verdict && !verdict.verdictReady && (
              <p className="mt-4 text-sm text-ink/60">
                Not quite ready yet — keep talking it through a little more, and check
                back here.
              </p>
            )}
            {verdictStatus === "idle" && verdict?.verdictReady && (
              <div className="mt-4 space-y-4">
                {typeof verdict.verdictPercentage === "number" && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                      Clarity score
                    </p>
                    <p className="mt-1 text-2xl font-bold text-ink">
                      {Math.round(verdict.verdictPercentage)}%
                    </p>
                  </div>
                )}
                {verdict.summary && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                      Summary
                    </p>
                    <p className="mt-1 text-sm text-ink/80">{verdict.summary}</p>
                  </div>
                )}
                {verdict.recommendations && verdict.recommendations.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                      Recommendations
                    </p>
                    <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-ink/80">
                      {verdict.recommendations.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
