import type { Metadata } from "next";
import Link from "next/link";
import {
  ConversationIcon,
  IndividualIcon,
  VoiceIcon,
  HelpIcon,
  PlansIcon,
  PartnerIcon,
} from "@/components/icons/Icons";

export const metadata: Metadata = {
  title: "Why mAItrymoon — AI Relationship Counselling",
  description:
    "Why use mAItrymoon instead of a friend, a search engine, or a general-purpose AI? See what makes it a relationship-specific AI experience.",
};

const REASONS = [
  {
    icon: ConversationIcon,
    title: "Built for relationship conversations",
    text: "Not a repurposed chatbot — designed specifically around relationship conversations, from the ground up.",
  },
  {
    icon: IndividualIcon,
    title: "Focused, not general-purpose",
    text: "Focused on helping you work through relationship situations, not answering random questions or general tasks.",
  },
  {
    icon: VoiceIcon,
    title: "Talk naturally",
    text: "Explain the situation conversationally, the way you would to a person — no need to formulate the \"perfect\" question.",
  },
  {
    icon: HelpIcon,
    title: "Asks the right questions",
    text: "mAItrymoon asks follow-up questions to understand context, instead of jumping straight to generic advice.",
  },
  {
    icon: PlansIcon,
    title: "Meet you where you are",
    text: "Access it directly on the website or through WhatsApp — whichever is easier in the moment.",
  },
  {
    icon: PartnerIcon,
    title: "A dedicated path for couples",
    text: "Partner Session creates a dedicated path for couples/partners to talk it through together, where that feature is available.",
  },
];

export default function WhyMaitrymoonPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gold-light/15 via-canvas to-canvas py-16 sm:py-20">
      <div className="container-page relative">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
          Why mAItrymoon
        </p>
        <h1 className="mt-2 max-w-2xl font-serif text-3xl font-bold text-ink sm:text-4xl">
          &ldquo;Why would I use mAItrymoon when I could talk to a friend,
          search Google, or ask a general AI?&rdquo;
        </h1>
        <p className="mt-3 max-w-2xl text-ink/70">Here&rsquo;s the honest answer.</p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="group cursor-default rounded-xl2 border-2 border-ink/10 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-garnet hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-garnet/10 transition-colors duration-200 group-hover:bg-garnet">
                <Icon className="h-5 w-5 text-garnet transition-colors duration-200 group-hover:text-canvas" />
              </span>
              <p className="mt-4 font-serif text-base font-bold text-ink transition-colors duration-200 group-hover:text-garnet">
                {title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{text}</p>
            </li>
          ))}
        </ul>

        <Link
          href="/login"
          className="mt-10 inline-block rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-3 text-sm font-semibold text-ink-deep shadow-sm transition hover:shadow-md"
        >
          Talk to mAItrymoon
        </Link>
      </div>
    </section>
  );
}
