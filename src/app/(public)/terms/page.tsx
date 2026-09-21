import type { Metadata } from "next";
import PlaceholderNotice from "@/components/ui/PlaceholderNotice";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The rules and limitations for using mAItrymoon.",
};

const SECTIONS = [
  "Eligibility.",
  "Account/session rules.",
  "Acceptable use.",
  "Nature and limitations of an AI-powered Relationship Counsellor.",
  "AI limitations and possibility of inaccurate responses.",
  "No guarantee of relationship outcomes.",
  "User responsibilities.",
  "Intellectual property.",
  "Third-party services.",
  "Referral/promotional rules.",
  "Suspension/termination.",
  "Disclaimers and liability provisions as legally appropriate.",
  "Governing law/disputes as legally appropriate.",
  "Changes to terms.",
];

export default function TermsPage() {
  return (
    <section className="container-page max-w-3xl py-16">
      <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">Terms &amp; Conditions</h1>

      <PlaceholderNotice>
        Final terms require qualified legal review (blueprint section 21).
        The outline below is the structure it should cover.
      </PlaceholderNotice>

      <ol className="mt-8 space-y-3">
        {SECTIONS.map((s, i) => (
          <li key={s} className="rounded-xl2 border border-ink/10 bg-white p-4 text-sm text-ink/80 shadow-sm">
            <span className="mr-2 font-semibold text-accent">{i + 1}.</span>
            {s}
          </li>
        ))}
      </ol>
    </section>
  );
}
