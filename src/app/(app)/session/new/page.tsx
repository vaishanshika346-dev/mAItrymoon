"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { ApiError, createSession, partnerInvite, partnerJoin } from "@/lib/api";
import type { SessionType } from "@/lib/types";

function NewSessionForm() {
  const { user, getIdToken, setActiveSession } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = (searchParams.get("type") as SessionType) || "individual";

  const [type, setType] = useState<SessionType>(initialType);
  const [mode, setMode] = useState<"start" | "join">("start");
  const [joinCode, setJoinCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  // Invite dialog shown right after a partner session is created — matches
  // section 3.3 of the spec ("Displays the Invite Partner Dialog").
  const [invite, setInvite] = useState<{ code: string; url: string; sessionId: string } | null>(null);

  useEffect(() => {
    if (user && !user.isOnboarded) {
      router.replace(`/consent?redirect=${encodeURIComponent(`/session/new?type=${type}`)}`);
    }
  }, [user, type, router]);

  async function handleAuthedError(err: unknown, fallback: string) {
    if (err instanceof ApiError) {
      if (err.errorKey === "unauthorized") {
        router.replace("/login?redirect=/dashboard");
        return;
      }
      if (err.errorKey === "consent_required") {
        router.replace(`/consent?redirect=${encodeURIComponent(`/session/new?type=${type}`)}`);
        return;
      }
      if (err.errorKey === "payment_required") {
        setError("You're out of session credits. Visit My Plans on your dashboard to top up.");
        setStatus("error");
        return;
      }
    }
    setError(err instanceof Error ? err.message : fallback);
    setStatus("error");
  }

  async function handleCreate() {
    setStatus("loading");
    setError(null);
    try {
      const idToken = await getIdToken();
      if (!idToken) throw new Error("Your session expired — please log in again.");
      const session = await createSession(idToken, type);
      setActiveSession(session);

      if (type === "partner") {
        try {
          const inv = await partnerInvite(idToken, session.id);
          setInvite({ code: inv.joinCode, url: inv.inviteUrl, sessionId: session.id });
          setStatus("idle");
          return; // wait for them to acknowledge the dialog before entering chat
        } catch {
          // Invite generation failing shouldn't block starting the chat itself.
        }
      }
      router.replace("/chat");
    } catch (err) {
      await handleAuthedError(err, "Couldn't start a session. Please try again.");
    }
  }

  async function handleJoin() {
    setStatus("loading");
    setError(null);
    try {
      const idToken = await getIdToken();
      if (!idToken) throw new Error("Your session expired — please log in again.");
      const code = joinCode.trim().toUpperCase();
      if (!code) throw new Error("Enter the join code your partner shared with you.");
      const result = await partnerJoin(idToken, code);
      setActiveSession({ id: result.sessionId, type: result.mode, status: "active" });
      router.replace("/chat");
    } catch (err) {
      await handleAuthedError(err, "That code didn't work. Double-check it and try again.");
    }
  }

  if (invite) {
    return (
      <section className="container-page flex flex-1 items-center justify-center py-16">
        <div className="w-full max-w-md rounded-xl2 border border-ink/10 bg-white p-8 shadow-sm">
          <h1 className="font-serif text-2xl font-bold text-ink">Invite your partner</h1>
          <p className="mt-2 text-sm text-ink/60">
            Share this code or link so they can join the same session.
          </p>

          <div className="mt-6 rounded-lg border border-gold/25 bg-gold/5 px-4 py-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Join code</p>
            <p className="mt-1 font-mono text-2xl font-bold tracking-wider text-ink">{invite.code}</p>
          </div>

          <div className="mt-4">
            <label className="text-xs font-semibold uppercase tracking-wide text-ink/40">
              Invite link
            </label>
            <div className="mt-1 flex items-center gap-2">
              <input
                readOnly
                value={invite.url}
                className="w-full rounded-lg border border-ink/15 bg-moon-light px-3 py-2 text-xs text-ink/70"
              />
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(invite.url)}
                className="shrink-0 rounded-full border border-ink/15 px-3 py-2 text-xs font-semibold text-ink hover:bg-ink/5"
              >
                Copy
              </button>
            </div>
          </div>

          <button
            onClick={() => router.replace("/chat")}
            className="mt-8 w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas hover:bg-ink-light"
          >
            Continue to Chat
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page flex flex-1 items-center justify-center py-16">
      <div className="w-full max-w-md rounded-xl2 border border-ink/10 bg-white p-8 shadow-sm">
        <h1 className="font-serif text-2xl font-bold text-ink">
          {mode === "start" ? "Start a Session" : "Join a Partner Session"}
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          {mode === "start"
            ? "Choose your session type below."
            : "Enter the join code your partner shared with you."}
        </p>

        {mode === "start" ? (
          <>
            <div className="mt-6 flex rounded-full border border-ink/15 p-1 text-sm">
              <button
                type="button"
                onClick={() => setType("individual")}
                className={`flex-1 rounded-full py-2 font-medium transition ${
                  type === "individual" ? "bg-ink text-canvas" : "text-ink/60"
                }`}
              >
                Individual
              </button>
              <button
                type="button"
                onClick={() => setType("partner")}
                className={`flex-1 rounded-full py-2 font-medium transition ${
                  type === "partner" ? "bg-ink text-canvas" : "text-ink/60"
                }`}
              >
                Partner
              </button>
            </div>

            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

            <button
              onClick={handleCreate}
              disabled={status === "loading"}
              className="mt-8 w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas hover:bg-ink-light disabled:opacity-60"
            >
              {status === "loading" ? "Starting session…" : "Start a Session"}
            </button>

            {type === "partner" && (
              <button
                type="button"
                onClick={() => {
                  setMode("join");
                  setError(null);
                }}
                className="mt-4 w-full text-center text-sm text-ink/60 underline"
              >
                Have a code already? Join a session instead
              </button>
            )}
          </>
        ) : (
          <>
            <div className="mt-6">
              <label htmlFor="join-code" className="text-sm font-medium text-ink">
                Join code
              </label>
              <input
                id="join-code"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="MM-XXXXXX"
                className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm uppercase"
              />
            </div>

            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

            <button
              onClick={handleJoin}
              disabled={status === "loading"}
              className="mt-8 w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas hover:bg-ink-light disabled:opacity-60"
            >
              {status === "loading" ? "Joining…" : "Join Session"}
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("start");
                setError(null);
              }}
              className="mt-4 w-full text-center text-sm text-ink/60 underline"
            >
              ← Back
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default function NewSessionPage() {
  return (
    <Suspense fallback={null}>
      <NewSessionForm />
    </Suspense>
  );
}
