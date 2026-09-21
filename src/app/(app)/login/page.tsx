"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  type ConfirmationResult,
} from "firebase/auth";
import { useAuth } from "@/lib/auth-context";
import { firebaseAuth, isFirebaseConfigured } from "@/lib/firebase";
import ConnectionLines from "@/components/illustrations/ConnectionLines";
import { PrivacyIcon, ConversationIcon, PartnerIcon } from "@/components/icons/Icons";

type Method = "phone" | "google";
type Stage = "enter-identifier" | "enter-code";
type Status = "idle" | "loading" | "error";

function LoginForm() {
  const { isAuthenticated, user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [method, setMethod] = useState<Method>("phone");
  const [stage, setStage] = useState<Stage>("enter-identifier");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  const confirmationRef = useRef<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  // Once Firebase + the backend both confirm this person is signed in
  // (AuthContext runs /auth/sync automatically on Firebase state changes),
  // move them on: straight to their destination if already onboarded,
  // otherwise to the consent step first.
  useEffect(() => {
    if (authLoading || !isAuthenticated || !user) return;
    if (!user.isOnboarded) {
      router.replace(`/consent?redirect=${encodeURIComponent(redirectTo)}`);
    } else {
      router.replace(redirectTo);
    }
  }, [authLoading, isAuthenticated, user, redirectTo, router]);

  function getRecaptcha() {
    if (!firebaseAuth) throw new Error("Firebase isn't configured.");
    if (!recaptchaRef.current) {
      recaptchaRef.current = new RecaptchaVerifier(firebaseAuth, "recaptcha-container", {
        size: "invisible",
      });
    }
    return recaptchaRef.current;
  }

  async function requestOtp() {
    setStatus("loading");
    setError(null);
    try {
      if (!firebaseAuth) throw new Error("Firebase isn't configured yet.");
      const digits = phone.replace(/[^\d+]/g, "");
      if (digits.replace(/\D/g, "").length < 8) {
        throw new Error("Enter a valid phone number, including country code.");
      }
      const verifier = getRecaptcha();
      const confirmation = await signInWithPhoneNumber(firebaseAuth, digits, verifier);
      confirmationRef.current = confirmation;
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
      setError(err instanceof Error ? err.message : "Couldn't send the code. Please try again.");
      // Reset the invisible reCAPTCHA widget so a retry doesn't reuse a spent token.
      recaptchaRef.current?.clear();
      recaptchaRef.current = null;
    }
  }

  async function verifyOtp() {
    setStatus("loading");
    setError(null);
    try {
      if (!confirmationRef.current) throw new Error("Request a code first.");
      await confirmationRef.current.confirm(code);
      // AuthContext's onAuthStateChanged listener picks this up and runs
      // /auth/sync; the redirect effect above fires once that resolves.
    } catch (err: any) {
      setStatus("error");
      if (err?.code === "auth/invalid-verification-code") {
        setError("That code isn't right. Please try again.");
      } else if (err?.code === "auth/code-expired") {
        setError("This code has expired. Request a new one.");
      } else {
        setError(err instanceof Error ? err.message : "Couldn't verify that code. Please try again.");
      }
    }
  }

  async function signInWithGoogle() {
    setStatus("loading");
    setError(null);
    try {
      if (!firebaseAuth) throw new Error("Firebase isn't configured yet.");
      await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
      // Same as above — AuthContext handles the sync + this effect redirects.
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Google sign-in was cancelled or failed.");
    }
  }

  const waitingOnSync = status !== "error" && firebaseAuth?.currentUser && !isAuthenticated;

  return (
    <section className="relative flex flex-1 items-center overflow-hidden bg-gradient-to-b from-gold-light/25 via-canvas to-gold-light/10 py-14 sm:py-20">
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
          <div className="relative hidden overflow-hidden rounded-xl2 bg-ink-deep p-10 lg:flex lg:min-h-[480px] lg:flex-col lg:justify-between">
            <ConnectionLines className="pointer-events-none absolute inset-0 h-full w-full opacity-15" />
            <div className="relative">
              <p className="font-serif text-2xl font-bold leading-snug text-canvas sm:text-3xl">
                Sometimes, you just need a space to explain what happened.
              </p>
              <div className="mt-6 h-px w-14 bg-gold/50" />
              <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-gold-dark">
                What happens next
              </p>
              <ol className="relative mt-5 space-y-6 border-l border-canvas/15 pl-6">
                {[
                  { step: "1", text: "Sign in with Google or your phone number." },
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

          <div className="rounded-xl2 bg-ink-deep px-5 py-4 lg:hidden">
            <p className="text-sm font-medium text-canvas/90">
              Sometimes, you just need a space to explain what happened.
            </p>
          </div>

          <div className="mx-auto w-full max-w-md rounded-xl2 border border-gold/20 bg-white p-8 shadow-md">
            <h1 className="font-serif text-2xl font-bold text-ink">Talk to mAItrymoon</h1>
            <p className="mt-2 text-sm text-ink/60">
              Sign in to start a private counselling session.
            </p>

            {!isFirebaseConfigured && (
              <p className="mt-4 rounded-lg border border-garnet/30 bg-garnet/5 px-3 py-2 text-xs text-garnet">
                Firebase isn't configured yet — add your project's keys to
                <code className="mx-1 rounded bg-garnet/10 px-1">.env.local</code>
                (see <code className="rounded bg-garnet/10 px-1">.env.local.example</code>) to enable sign-in.
              </p>
            )}

            {waitingOnSync && (
              <p className="mt-4 text-sm text-ink/60">Signing you in…</p>
            )}

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
                    onClick={() => setMethod("google")}
                    className={`flex-1 rounded-full py-2 font-medium transition ${
                      method === "google" ? "bg-ink text-canvas" : "text-ink/60"
                    }`}
                  >
                    Google
                  </button>
                </div>

                {method === "phone" ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      requestOtp();
                    }}
                    className="mt-6 space-y-4"
                  >
                    <div>
                      <label htmlFor="phone" className="text-sm font-medium text-ink">
                        Phone number
                      </label>
                      <input
                        id="phone"
                        required
                        autoFocus
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
                      />
                      <p className="mt-1 text-xs text-ink/40">Include the country code (e.g. +91).</p>
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <button
                      type="submit"
                      disabled={status === "loading" || !isFirebaseConfigured}
                      className="w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas hover:bg-ink-light disabled:opacity-60"
                    >
                      {status === "loading" ? "Sending code…" : "Send Code"}
                    </button>
                  </form>
                ) : (
                  <div className="mt-6 space-y-4">
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <button
                      type="button"
                      onClick={signInWithGoogle}
                      disabled={status === "loading" || !isFirebaseConfigured}
                      className="flex w-full items-center justify-center gap-3 rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-semibold text-ink shadow-sm transition hover:bg-ink/5 disabled:opacity-60"
                    >
                      <svg viewBox="0 0 48 48" className="h-4 w-4" aria-hidden="true">
                        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C33.9 6.1 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/>
                        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C33.9 6.1 29.2 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                        <path fill="#4CAF50" d="M24 44c5.1 0 9.8-2 13.3-5.2l-6.1-5.2C29.2 35.2 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.6 39.7 16.3 44 24 44z"/>
                        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.1 5.2C40.9 36 44 30.5 44 24c0-1.3-.1-2.7-.4-3.5z"/>
                      </svg>
                      {status === "loading" ? "Signing in…" : "Continue with Google"}
                    </button>
                  </div>
                )}
              </>
            )}

            {stage === "enter-code" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  verifyOtp();
                }}
                className="mt-6 space-y-4"
              >
                <p className="text-sm text-ink/70">
                  Enter the 6-digit code sent to <span className="font-medium text-ink">{phone}</span>.
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
                  onClick={requestOtp}
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
                  Use a different number
                </button>
              </form>
            )}

            {/* Required by Firebase's invisible reCAPTCHA for phone auth. */}
            <div id="recaptcha-container" />

            <p className="mt-6 text-center text-xs text-ink/40">
              <Link href="/" className="underline">
                ← Back to the website
              </Link>
            </p>
          </div>
        </div>

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
