import type { Metadata } from "next";
import PlaceholderNotice from "@/components/ui/PlaceholderNotice";

export const metadata: Metadata = {
  title: "Referral Code",
  description: "How the mAItrymoon referral code works.",
};

const QUESTIONS = [
  "What is a referral code?",
  "Where do I enter it?",
  "When is the code applied?",
  "What benefit does the new user receive?",
  "What benefit does the referring user receive, if any?",
  "Can the code be reused?",
  "What happens if it is invalid or expired?",
  "Can users refer a partner or friend?",
];

export default function ReferralPage() {
  return (
    <section className="container-page max-w-3xl py-16">
      <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">Referral Code</h1>
      <p className="mt-4 text-ink/70">
        Enter a referral code when you create your first session. Here's
        what to know before you use one.
      </p>

      <ul className="mt-8 space-y-3">
        {QUESTIONS.map((q) => (
          <li key={q} className="rounded-xl2 border border-ink/10 bg-white p-4 text-sm text-ink/80 shadow-sm">
            {q}
          </li>
        ))}
      </ul>

      <div className="mt-10 rounded-xl2 border border-accent/40 bg-accent/10 p-6">
        <h2 className="font-serif text-lg font-bold text-ink">MAITRY5 — Campaign Example</h2>
        <p className="mt-2 text-sm text-ink/70">
          If this promotion is still active, <code className="rounded bg-white px-1.5 py-0.5">MAITRY5</code> can
          be used as a first-sessions promotional code.
        </p>
        <PlaceholderNotice>
          Confirm eligibility, expiry, session-counting rules, and
          abuse-prevention rules with the product team before publishing
          this publicly (blueprint section 16 / 34). Use only the actual
          backend rules — never publish benefits that aren't technically
          enforced.
        </PlaceholderNotice>
      </div>
    </section>
  );
}
