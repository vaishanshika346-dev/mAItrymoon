"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { mockCreateSession } from "@/lib/mock-api";
import type { SessionType } from "@/lib/types";

function NewSessionForm() {
  const { setActiveSession } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = (searchParams.get("type") as SessionType) || "individual";

  const [type, setType] = useState<SessionType>(initialType);
  const [referralCode, setReferralCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    setStatus("loading");
    setError(null);
    try {
      const session = await mockCreateSession(type, referralCode || undefined);
      setActiveSession(session);
      router.replace("/chat");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Couldn't start a session. Please try again.");
    }
  }

  return (
    <section className="container-page flex flex-1 items-center justify-center py-16">
      <div className="w-full max-w-md rounded-xl2 border border-ink/10 bg-white p-8 shadow-sm">
        <h1 className="font-serif text-2xl font-bold text-ink">Start a Session</h1>
        <p className="mt-2 text-sm text-ink/60">
          Choose your session type. You can enter a referral code below if
          you have one.
        </p>

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

        <div className="mt-6">
          <label htmlFor="referral" className="text-sm font-medium text-ink">
            Referral code (optional)
          </label>
          <input
            id="referral"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            placeholder="e.g. MAITRY5"
            className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm uppercase"
          />
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <button
          onClick={handleCreate}
          disabled={status === "loading"}
          className="mt-8 w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas hover:bg-ink-light disabled:opacity-60"
        >
          {status === "loading" ? "Starting session…" : "Start a Session"}
        </button>
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
