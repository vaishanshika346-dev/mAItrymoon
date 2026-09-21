"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { mockSubmitConsent } from "@/lib/mock-api";
import SafetyNotice from "@/components/ui/SafetyNotice";

function ConsentForm() {
  const { user, completeConsent } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [agreed, setAgreed] = useState({ ai: false, privacy: false, terms: false });
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  // If onboarding is already done, skip straight through.
  useEffect(() => {
    if (user?.hasCompletedConsent) {
      router.replace(redirectTo);
    }
  }, [user, redirectTo, router]);

  const allAgreed = agreed.ai && agreed.privacy && agreed.terms;

  async function handleContinue() {
    if (!user || !allAgreed) return;
    setStatus("loading");
    await mockSubmitConsent(user.id);
    completeConsent();
    router.replace(redirectTo);
  }

  if (!user) return null;

  return (
    <section className="container-page flex flex-1 items-center justify-center py-16">
      <div className="w-full max-w-lg rounded-xl2 border border-ink/10 bg-white p-8 shadow-sm">
        <h1 className="font-serif text-2xl font-bold text-ink">Before we begin</h1>
        <p className="mt-2 text-sm text-ink/60">
          A few things to know before your first session with mAItrymoon.
        </p>

        <div className="mt-6">
          <SafetyNotice />
        </div>

        <div className="mt-6 space-y-4">
          <ConsentCheckbox
            checked={agreed.ai}
            onChange={(v) => setAgreed((a) => ({ ...a, ai: v }))}
            label="I understand mAItrymoon is an AI-powered Relationship Counsellor, not a human therapist, and its responses may sometimes be imperfect."
          />
          <ConsentCheckbox
            checked={agreed.privacy}
            onChange={(v) => setAgreed((a) => ({ ...a, privacy: v }))}
            label="I've read the Privacy Policy and understand how my conversation data is handled."
          />
          <ConsentCheckbox
            checked={agreed.terms}
            onChange={(v) => setAgreed((a) => ({ ...a, terms: v }))}
            label="I agree to the Terms & Conditions."
          />
        </div>

        <button
          onClick={handleContinue}
          disabled={!allAgreed || status === "loading"}
          className="mt-8 w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas hover:bg-ink-light disabled:opacity-40"
        >
          {status === "loading" ? "Continuing…" : "Continue"}
        </button>
      </div>
    </section>
  );
}

function ConsentCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-start gap-3 text-sm text-ink/80">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0"
      />
      {label}
    </label>
  );
}

export default function ConsentPage() {
  return (
    <Suspense fallback={null}>
      <ConsentForm />
    </Suspense>
  );
}
