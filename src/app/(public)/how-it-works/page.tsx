import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works — How AI Relationship Counselling Works",
  description:
    "See exactly how a mAItrymoon session works, from opening a chat to exploring your situation with the AI-powered Relationship Counsellor.",
};

const STEPS = [
  { title: "Open mAItrymoon", body: "Choose the website chatbot or WhatsApp." },
  { title: "Tell Your Story", body: "Describe what happened in your own words." },
  { title: "Answer Questions", body: "mAItrymoon asks relevant follow-up questions to understand context." },
  { title: "Explore the Situation", body: "The AI-powered Relationship Counsellor responds to the information you've shared." },
  { title: "Continue", body: "Ask questions, clarify details, and continue the conversation." },
  { title: "Partner Session", body: "Where available, use the Partner Session flow to involve both partners." },
];

export default function HowItWorksPage() {
  return (
    <section className="container-page py-16">
      <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">How It Works</h1>
      <p className="mt-4 max-w-2xl text-ink/70">
        A calm, guided journey from "I have a relationship problem" to
        greater clarity.
      </p>

      <ol className="mt-10 space-y-4">
        {STEPS.map((step, i) => (
          <li
            key={step.title}
            className="group flex cursor-default gap-4 rounded-xl2 border-2 border-ink/10 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-garnet hover:shadow-md"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-canvas transition-colors duration-200 group-hover:bg-garnet">
              {i + 1}
            </span>
            <div>
              <p className="font-semibold text-ink transition-colors duration-200 group-hover:text-garnet">
                {step.title}
              </p>
              <p className="mt-1 text-sm text-ink/70">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <Link
        href="/login"
        className="mt-10 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas hover:bg-ink-light"
      >
        Try It Now
      </Link>
    </section>
  );
}
