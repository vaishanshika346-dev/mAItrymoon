"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { submitConsent } from "@/lib/api";
import { ApiError } from "@/lib/api";
import SafetyNotice from "@/components/ui/SafetyNotice";

function ConsentForm() {
  const { user, getIdToken, patchUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  // If onboarding is already done (e.g. this page was reloaded, or the
  // gatekeeper check ran again), skip straight through.
  useEffect(() => {
    if (user?.isOnboarded) {
      router.replace(redirectTo);
    }
  }, [user, redirectTo, router]);

  const canSubmit = ageConfirmed && privacyAgreed;

  async function handleContinue() {
    if (!canSubmit || status === "loading") return;
    setStatus("loading");
    setError(null);
    try {
      const idToken = await getIdToken();
      if (!idToken) throw new Error("Your session expired — please log in again.");
      const result = await submitConsent(idToken, {
        ageConsent: "18+",
        privacyConsent: "yes",
        marketingConsent: marketingOptIn ? "yes" : "no",
        referralCode: referralCode.trim() || undefined,
      });
      patchUser({ isOnboarded: result.isOnboarded, availableSessions: result.availableSessions });
      router.replace(redirectTo);
    } catch (err) {
      setStatus("error");
      if (err instanceof ApiError && err.errorKey === "unauthorized") {
        router.replace(`/login?redirect=${encodeURIComponent(redirectTo)}`);
        return;
      }
      setError(err instanceof Error ? err.message : "Couldn't save that — please try again.");
    }
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
            checked={ageConfirmed}
            onChange={setAgeConfirmed}
            label="I confirm that I am 18 years of age or older."
          />
          <ConsentCheckbox
            checked={privacyAgreed}
            onChange={setPrivacyAgreed}
            label="I agree to the Counselling Principles and Privacy Policy. I understand AI Mitr provides supportive relationship guidance, not clinical psychiatric treatment or legal representation."
          />
          <ConsentCheckbox
            checked={marketingOptIn}
            onChange={setMarketingOptIn}
            label="Keep me updated with relationship tips and feature updates. (Optional)"
          />
        </div>

        <div className="mt-6">
          <label htmlFor="referral" className="text-sm font-medium text-ink">
            Referral code <span className="font-normal text-ink/40">(optional)</span>
          </label>
          <input
            id="referral"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            placeholder="e.g. COUPLE2026"
            className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm uppercase"
          />
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <button
          onClick={handleContinue}
          disabled={!canSubmit || status === "loading"}
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
