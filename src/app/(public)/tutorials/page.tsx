import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tutorials — How to Use mAItrymoon",
  description: "A step-by-step tutorial for using the mAItrymoon website chatbot.",
};

const TUTORIAL_STEPS = [
  "Click Talk to mAItrymoon.",
  "Choose the session option.",
  "Read the brief AI/privacy notice.",
  "Start typing your relationship situation.",
  "Send your message.",
  "Answer follow-up questions.",
  "Read the counsellor's response.",
  "Ask follow-up questions.",
  "Continue or finish the session.",
  "Leave feedback when finished.",
];

const FAQS = [
  { q: "What is mAItrymoon?", a: "mAItrymoon is an AI-powered Relationship Counsellor — a private space to talk through relationship situations and find greater clarity." },
  { q: "Is mAItrymoon a human counsellor?", a: "No. mAItrymoon is AI-powered, not a licensed human therapist, and its responses may sometimes be imperfect." },
  { q: "Can I use mAItrymoon without WhatsApp?", a: "Yes — mAItrymoon is now available directly on the website." },
  { q: "Can I still use mAItrymoon on WhatsApp?", a: "Yes, WhatsApp remains available as an alternative access channel." },
  { q: "How do I start a session?", a: "Click \"Talk to mAItrymoon,\" log in, complete onboarding if it's your first time, then choose Individual or Partner Session." },
  { q: "What is Partner Session?", a: "A dedicated flow that lets both partners take part in a session, where that feature is enabled." },
  { q: "How does a referral code work?", a: "See our Referral Code page for the current rules." },
  { q: "Is my conversation private?", a: "See our Privacy Policy for exactly how your data is handled." },
  { q: "Can I request deletion of my data?", a: "See our Privacy Policy for your rights and how to request this." },
  { q: "How do I report a problem?", a: "Use the Contact Us page and choose \"Report a problem.\"" },
];

export default function TutorialsPage() {
  return (
    <section className="container-page max-w-3xl py-16">
      <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">
        Tutorials &amp; Help
      </h1>
      <p className="mt-4 text-ink/70">
        A quick walkthrough of the website chatbot, plus answers to common
        questions.
      </p>

      <h2 className="mt-10 font-serif text-xl font-bold text-ink">Website Chatbot Tutorial</h2>
      <ol className="mt-4 space-y-2">
        {TUTORIAL_STEPS.map((step, i) => (
          <li key={step} className="flex gap-3 text-sm text-ink/80">
            <span className="font-semibold text-accent">{i + 1}.</span> {step}
          </li>
        ))}
      </ol>

      <h2 className="mt-12 font-serif text-xl font-bold text-ink">Frequently Asked Questions</h2>
      <div className="mt-4 divide-y divide-ink/10 rounded-xl2 border border-ink/10 bg-white shadow-sm">
        {FAQS.map((faq) => (
          <details key={faq.q} className="group p-5">
            <summary className="cursor-pointer list-none font-medium text-ink marker:content-none">
              {faq.q}
            </summary>
            <p className="mt-2 text-sm text-ink/70">{faq.a}</p>
          </details>
        ))}
      </div>

      <Link
        href="/login"
        className="mt-10 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas hover:bg-ink-light"
      >
        Get Help — Talk to mAItrymoon
      </Link>
    </section>
  );
}
