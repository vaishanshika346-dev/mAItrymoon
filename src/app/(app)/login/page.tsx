"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
  mockRequestEmailLogin,
  mockRequestPhoneOtp,
  mockVerifyEmailCode,
  mockVerifyPhoneOtp,
} from "@/lib/mock-api";
import ConnectionLines from "@/components/illustrations/ConnectionLines";
import { PrivacyIcon, ConversationIcon, PartnerIcon } from "@/components/icons/Icons";

type Method = "phone" | "email";
type Stage = "enter-identifier" | "enter-code";
type Status = "idle" | "loading" | "error";

function LoginForm() {
  const { loginAs } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [method, setMethod] = useState<Method>("phone");
  const [stage, setStage] = useState<Stage>("enter-identifier");
  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  async function requestCode() {
    setStatus("loading");
    setError(null);
    try {
      if (method === "phone") {
        await mockRequestPhoneOtp(identifier);
      } else {
        await mockRequestEmailLogin(identifier);
      }
      setStage("enter-code");
      setStatus("idle");
      setResendCooldown(30);
      const timer = setInterval(() => {
        setResendCooldown((s) => {
          if (s <= 1) {
            clearInterval(timer);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  async function verifyCode() {
    setStatus("loading");
    setError(null);
    try {
      const user =
        method === "phone"
          ? await mockVerifyPhoneOtp(identifier, code)
          : await mockVerifyEmailCode(identifier, code);
      loginAs({
        id: user.id,
        identifier: user.identifier,
        method: user.method,
        hasCompletedConsent: false,
        createdAt: new Date().toISOString(),
      });
      router.replace(`/consent?redirect=${encodeURIComponent(redirectTo)}`);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Network error — please try again.");
    }
  }

  return (
    <section className="relative flex flex-1 items-center overflow-hidden bg-gradient-to-b from-gold-light/25 via-canvas to-gold-light/10 py-14 sm:py-20">
      {/* Soft texture so the ivory background isn't a flat, empty field —
          a faint connecting-lines pattern plus a warm glow, matching the
          treatment used elsewhere on the site. */}
      <ConnectionLines className="pointer-events-none absolute inset-0 h-full w-full opacity-40" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 55% at 85% 15%, rgba(201,152,46,0.16) 0%, rgba(201,152,46,0) 70%)",
        }}
      />

      <div className="container-page relative">
        <p className="mb-8 text-center font-serif text-sm italic text-gold-dark sm:mb-10">
          From honeymoon to companionship
        </p>

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Brand panel — no illustration graphic, just clean typography and
            a short feature list, since illustrated scenes here kept missing
            the mark. Kept in its own contained space so it never crowds the
            form. */}
        <div className="relative hidden overflow-hidden rounded-xl2 bg-ink-deep p-10 lg:flex lg:min-h-[480px] lg:flex-col lg:justify-between">
          <ConnectionLines className="pointer-events-none absolute inset-0 h-full w-full opacity-15" />
          <div className="relative">
            <p className="font-serif text-2xl font-bold leading-snug text-canvas sm:text-3xl">
              Sometimes, you just need a space to explain what happened.
            </p>
            <div className="mt-6 h-px w-14 bg-gold/50" />

            {/* What logging in actually starts — different content from the
                trust strip below the form, so nothing is repeated. */}
            <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-gold-dark">
              What happens next
            </p>
            <ol className="relative mt-5 space-y-6 border-l border-canvas/15 pl-6">
              {[
                { step: "1", text: "Log in with your phone or email." },
                { step: "2", text: "Tell mAItrymoon what's going on, in your own words." },
                { step: "3", text: "Answer a few gentle questions so it understands the full picture." },
              ].map(({ step, text }) => (
                <li key={step} className="relative text-sm leading-relaxed text-canvas/85">
                  <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full border border-gold/50 bg-ink-deep text-xs font-semibold text-gold">
                    {step}
                  </span>
                  {text}
                </li>
              ))}
            </ol>
          </div>

          <p className="relative mt-8 max-w-sm text-sm text-canvas/60">
            No perfect phrasing needed — just start talking, and mAItrymoon
            takes it from there.
          </p>
        </div>

        {/* Compact mobile-only header, plain text — no illustration to
            crowd small screens. */}
        <div className="rounded-xl2 bg-ink-deep px-5 py-4 lg:hidden">
          <p className="text-sm font-medium text-canvas/90">
            Sometimes, you just need a space to explain what happened.
          </p>
        </div>

        <div className="mx-auto w-full max-w-md rounded-xl2 border border-gold/20 bg-white p-8 shadow-md">
        <h1 className="font-serif text-2xl font-bold text-ink">Talk to mAItrymoon</h1>
        <p className="mt-2 text-sm text-ink/60">
          Log in to start a private counselling session.
        </p>

        {stage === "enter-identifier" && (
          <>
            <div className="mt-6 flex rounded-full border border-ink/15 p-1 text-sm">
              <button
                type="button"
                onClick={() => setMethod("phone")}
                className={`flex-1 rounded-full py-2 font-medium transition ${
                  method === "phone" ? "bg-ink text-canvas" : "text-ink/60"
                }`}
              >
                Phone OTP
              </button>
              <button
                type="button"
                onClick={() => setMethod("email")}
                className={`flex-1 rounded-full py-2 font-medium transition ${
                  method === "email" ? "bg-ink text-canvas" : "text-ink/60"
                }`}
              >
                Email
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                requestCode();
              }}
              className="mt-6 space-y-4"
            >
              <div>
                <label htmlFor="identifier" className="text-sm font-medium text-ink">
                  {method === "phone" ? "Phone number" : "Email address"}
                </label>
                <input
                  id="identifier"
                  required
                  autoFocus
                  type={method === "phone" ? "tel" : "email"}
                  placeholder={method === "phone" ? "+91 98765 43210" : "you@example.com"}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas hover:bg-ink-light disabled:opacity-60"
              >
                {status === "loading" ? "Sending code…" : "Send Code"}
              </button>
            </form>
          </>
        )}

        {stage === "enter-code" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              verifyCode();
            }}
            className="mt-6 space-y-4"
          >
            <p className="text-sm text-ink/70">
              Enter the 6-digit code sent to <span className="font-medium text-ink">{identifier}</span>.
            </p>
            <input
              required
              inputMode="numeric"
              maxLength={6}
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              className="w-full rounded-lg border border-ink/15 px-3 py-2 text-center text-lg tracking-[0.5em]"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={status === "loading" || code.length !== 6}
              className="w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas hover:bg-ink-light disabled:opacity-60"
            >
              {status === "loading" ? "Verifying…" : "Verify & Continue"}
            </button>
            <button
              type="button"
              disabled={resendCooldown > 0}
              onClick={requestCode}
              className="w-full text-center text-sm text-ink/60 underline disabled:no-underline disabled:opacity-50"
            >
              {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend code"}
            </button>
            <button
              type="button"
              onClick={() => {
                setStage("enter-identifier");
                setCode("");
                setError(null);
              }}
              className="w-full text-center text-xs text-ink/40 underline"
            >
              Use a different {method === "phone" ? "number" : "email"}
            </button>
          </form>
        )}

        <p className="mt-6 text-xs text-ink/40">
          Test codes for this mock build: any 6 digits works except{" "}
          <code>000000</code> (invalid) and <code>111111</code> (expired, phone only).
        </p>

        <p className="mt-6 text-center text-xs text-ink/40">
          <Link href="/" className="underline">
            ← Back to the website
          </Link>
        </p>
        </div>
        </div>

        {/* Trust strip — fills what was empty space below the two cards
            with a quick reassurance row, rather than leaving flat background. */}
        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-4 border-t border-gold/15 pt-8 text-center sm:grid-cols-3 sm:gap-6">
          {[
            { icon: PrivacyIcon, text: "Private & confidential" },
            { icon: ConversationIcon, text: "We analyse and help you find the solution" },
            { icon: PartnerIcon, text: "For both of you" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex flex-col items-center gap-2">
              <Icon className="h-6 w-6 text-garnet" />
              <p className="text-xs font-medium text-ink/60">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
