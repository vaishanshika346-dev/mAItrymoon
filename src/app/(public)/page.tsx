import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import TangledLine from "@/components/illustrations/TangledLine";
import ConnectionLines from "@/components/illustrations/ConnectionLines";
import MoonPanel from "@/components/illustrations/MoonPanel";
import InstagramSection from "@/components/public/InstagramSection";
import CinematicHero from "@/components/public/CinematicHero";
import {
  ConversationIcon,
  HelpIcon,
  IndividualIcon,
  ListeningIcon,
  PartnerIcon,
  PlansIcon,
  PrivacyIcon,
  VoiceIcon,
} from "@/components/icons/Icons";

const SCENARIOS = [
  {
    icon: ConversationIcon,
    text: "You want to explain what hurt you, but the conversation turns into an argument.",
  },
  {
    icon: ListeningIcon,
    text: "You keep having the same fight, even when neither of you wants to.",
  },
  {
    icon: HelpIcon,
    text: "You have a lot to say, but you don't know where to begin.",
  },
  {
    icon: PartnerIcon,
    text: "Sometimes, both people feel unheard.",
  },
  {
    icon: PrivacyIcon,
    text: "You want to understand what happened before reacting.",
  },
  {
    icon: IndividualIcon,
    text: "You wish you could explain your side without being interrupted.",
  },
];

const USE_CASES = [
  "Couple arguments",
  "Communication misunderstandings",
  "Feeling unheard",
  "Recurring relationship problems",
  "Difficult conversations",
  "Before sending an emotionally charged message",
  "Trying to understand another perspective",
  "Partner Session",
];

const USPS = [
  { icon: ConversationIcon, text: "AI-powered Relationship Counsellor" },
  { icon: ListeningIcon, text: "Relationship-focused experience" },
  { icon: PrivacyIcon, text: "Website + WhatsApp access" },
  { icon: PartnerIcon, text: "Partner Session" },
  { icon: PlansIcon, text: "Referral system" },
  { icon: HelpIcon, text: "Dedicated relationship-oriented product experience" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — a two-slide, self-running carousel: Slide 1 introduces
          mAItrymoon via the living phone-conversation composition, Slide 2
          is the existing cinematic photo slide, preserved as-is. Autoplays
          on load, no click/scroll required. See CinematicHero.tsx. */}
      <CinematicHero />

      {/* The Problem — illustrated scenario cards */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gold-light/20 via-canvas to-garnet/5 py-16 sm:py-20">
        <ConnectionLines className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />
        <div className="container-page relative">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-garnet">Why mAItrymoon</p>
            <h2 className="mt-2 max-w-2xl font-serif text-2xl font-bold text-ink sm:text-3xl">
              One argument. Two different realities.
            </h2>
            <p className="mt-3 max-w-xl text-ink/70">
              Two people can live through the same disagreement and walk
              away with two different stories. Often what's missing isn't
              advice — it's a neutral space to explain what actually
              happened before reacting.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SCENARIOS.map(({ icon: Icon, text }, i) => (
              <Reveal key={text} delay={i * 80}>
                <div className="group h-full cursor-default rounded-xl2 border-2 border-ink/10 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-garnet hover:shadow-md">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-garnet/10 transition-colors duration-200 group-hover:bg-garnet">
                    <Icon className="h-5 w-5 text-garnet transition-colors duration-200 group-hover:text-canvas" />
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-ink/80">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Meet mAItrymoon — demo conversation */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 55% at 88% 15%, rgba(201,152,46,0.12) 0%, rgba(201,152,46,0) 70%), radial-gradient(40% 50% at 5% 90%, rgba(155,44,62,0.07) 0%, rgba(155,44,62,0) 70%)",
          }}
        />
        <div className="container-page relative">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gold-dark">
                <span className="relative flex h-2 w-2">
                  <span className="pulse-dot absolute h-2 w-2 rounded-full bg-gold" />
                  <span className="relative h-2 w-2 rounded-full bg-gold" />
                </span>
                Live on Website &amp; WhatsApp
              </span>

              <h2 className="mt-4 font-serif text-2xl font-bold text-ink sm:text-3xl">
                Meet mAItrymoon
              </h2>
              <p className="mt-2 max-w-md text-ink/70">
                Your AI-powered Relationship Counsellor — patient, neutral,
                and available whenever you need to think something through.
                Here's a sample of how a conversation actually feels.
              </p>

              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-garnet/10">
                    <ListeningIcon className="h-4 w-4 text-garnet" />
                  </span>
                  <span className="text-sm text-ink/75">
                    Listens first, and asks the question that actually moves
                    things forward.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-garnet/10">
                    <PrivacyIcon className="h-4 w-4 text-garnet" />
                  </span>
                  <span className="text-sm text-ink/75">
                    Private and non-judgmental, every time you open the chat.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-garnet/10">
                    <VoiceIcon className="h-4 w-4 text-garnet" />
                  </span>
                  <span className="text-sm text-ink/75">
                    Type or send a voice message — and bring your partner in
                    with a Partner Session when you're ready to hear both
                    sides.
                  </span>
                </li>
              </ul>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/login"
                  className="btn-motion inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas transition hover:bg-ink-light"
                >
                  Talk to mAItrymoon
                </Link>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative">
                <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-gold/15 via-transparent to-garnet/10 blur-2xl" />

                <div className="overflow-hidden rounded-xl2 border border-gold/25 bg-white shadow-lg">
                  <div className="flex items-center gap-3 border-b border-ink/10 bg-ink-deep px-5 py-4">
                    <span className="relative flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gold/20 p-1.5">
                      <Image
                        src="/logo-mark.png"
                        alt=""
                        width={670}
                        height={421}
                        className="h-full w-full object-contain"
                      />
                      <span className="pulse-dot absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-ink-deep" />
                    </span>
                    <div className="leading-tight">
                      <p className="text-sm font-semibold text-canvas">mAItrymoon</p>
                      <p className="text-[11px] text-canvas/60">Online now</p>
                    </div>
                    <p className="ml-auto text-[10px] font-semibold uppercase tracking-wide text-canvas/40">
                      Demo — for illustration only
                    </p>
                  </div>

                  <div className="space-y-3 p-5">
                    <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-ink px-4 py-2 text-sm text-canvas">
                      My partner and I keep having the same argument about how
                      we spend weekends and I don't know how to bring it up
                      without it turning into a fight.
                    </div>
                    <div className="mr-auto max-w-[85%] rounded-2xl rounded-bl-sm bg-gold/15 px-4 py-2 text-sm text-ink">
                      That sounds tiring to keep going through. Before we look
                      at how to raise it — what usually happens in the first
                      minute of that conversation that tips it into a fight?
                    </div>
                    <div className="mr-auto flex max-w-[85%] items-center gap-1 rounded-2xl rounded-bl-sm bg-gold/15 px-4 py-3">
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-ink/40" />
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-ink/40" />
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-ink/40" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 border-t border-ink/10 bg-canvas/60 px-5 py-3">
                    <div className="flex-1 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm text-ink/35">
                      Type how you're feeling…
                    </div>
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-ink text-canvas">
                      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                        <path d="M3 11.5L20 4l-6.5 17-3-7.5L3 11.5z" fill="currentColor" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why mAItrymoon */}
      <section className="relative overflow-hidden bg-ink-deep py-16 text-canvas sm:py-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 60% at 10% 90%, rgba(201,152,46,0.14) 0%, rgba(201,152,46,0) 70%)",
          }}
        />
        <div className="container-page relative">
          <Reveal>
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">Why mAItrymoon</h2>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "A relationship-specific AI experience.",
              "Designed around conversation and context.",
              "Helps you explore situations rather than just search for generic advice.",
              "Available directly on the website and through WhatsApp.",
            ].map((item, i) => (
              <Reveal
                key={item}
                delay={i * 80}
                as="li"
                className="rounded-xl2 border border-gold/20 bg-white/5 p-4 text-sm text-canvas/85 transition hover:border-gold/50 hover:bg-white/10"
              >
                {item}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Website + WhatsApp */}
      <Reveal as="section" className="container-page py-16 text-center sm:py-20">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
          mAItrymoon is no longer limited to WhatsApp.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-ink/70">
          You don't have to leave the website to talk to mAItrymoon anymore
          — our AI-powered Relationship Counsellor is now available here
          too.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/login"
            className="btn-motion rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-3 text-sm font-semibold text-ink-deep shadow-sm hover:shadow-md"
          >
            Talk on the website
          </Link>
          <a
            href="#"
            className="btn-motion rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink"
            title="Placeholder link — connect to your real WhatsApp entry point"
          >
            Continue on WhatsApp
          </a>
        </div>
      </Reveal>

      {/* How It Works */}
      <section className="relative overflow-hidden py-16 sm:py-20" style={{
        background: "linear-gradient(135deg, #FBF7EE 0%, #F3E6C6 55%, #FBF7EE 100%)",
      }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(40% 50% at 90% 10%, rgba(155,44,62,0.12) 0%, rgba(155,44,62,0) 70%)",
          }}
        />
        <div className="container-page relative">
          <Reveal>
            <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">How It Works</h2>
          </Reveal>

          <ol className="relative mt-10 grid gap-6 sm:grid-cols-3">
            {/* connecting path, desktop only */}
            <div
              className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px sm:block"
              style={{ background: "linear-gradient(90deg, transparent, #C9982E 15%, #C9982E 85%, transparent)" }}
            />
            {[
              { icon: ConversationIcon, title: "Share your side.", text: "Tell mAItrymoon what happened, in your own words, without interruption." },
              { icon: ListeningIcon, title: "Understand another perspective.", text: "Explore how the same moment may look from your partner's side." },
              { icon: PrivacyIcon, title: "Find a clearer way forward.", text: "Move from the argument itself towards a way to actually resolve it." },
            ].map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 120} as="li" className="group relative flex flex-col items-start">
                <span className="relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-2 border-gold bg-white font-serif text-2xl font-bold text-garnet shadow-sm">
                  0{i + 1}
                </span>
                <div className="mt-4 w-full cursor-default rounded-xl2 border-2 border-gold/25 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-garnet hover:shadow-md">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-garnet/10 transition-colors duration-200 group-hover:bg-garnet">
                    <Icon className="h-5 w-5 text-garnet transition-colors duration-200 group-hover:text-canvas" />
                  </span>
                  <p className="mt-3 font-serif text-base font-semibold text-ink">{title}</p>
                  <p className="mt-1.5 text-sm text-ink/70">{text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Link href="/how-it-works" className="mt-8 inline-block text-sm font-semibold text-garnet underline">
            See the full walkthrough →
          </Link>
        </div>
      </section>

      <div className="container-page">
        <TangledLine className="mx-auto h-16 w-full max-w-2xl py-8 text-garnet/70" />
      </div>

      {/* Use cases */}
      <Reveal as="section" className="container-page pb-16 sm:pb-20">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Use Cases</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {USE_CASES.map((uc) => (
            <span
              key={uc}
              className="rounded-full border border-gold/40 bg-gold/5 px-4 py-2 text-sm text-ink/75 transition-all duration-200 hover:-translate-y-0.5 hover:border-garnet hover:bg-garnet hover:text-canvas"
            >
              {uc}
            </span>
          ))}
        </div>
      </Reveal>

      {/* USPs */}
      <section
        className="py-16 sm:py-20"
        style={{ background: "linear-gradient(180deg, #FBF7EE 0%, #F3E9EC 100%)" }}
      >
        <div className="container-page">
          <Reveal>
            <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">What Makes Us Unique</h2>
          </Reveal>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {USPS.map(({ icon: Icon, text }, i) => (
              <Reveal
                key={text}
                delay={i * 80}
                as="li"
                className="group flex cursor-default items-start gap-4 rounded-xl2 border-2 border-transparent bg-white p-5 text-sm text-ink/80 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-garnet hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-garnet/10 transition-colors duration-200 group-hover:bg-garnet">
                  <Icon className="h-5 w-5 text-garnet transition-colors duration-200 group-hover:text-canvas" />
                </span>
                <span className="pt-2 transition-colors duration-200 group-hover:text-garnet">{text}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Founders story teaser */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
              The founders' story
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-ink sm:text-3xl">
              Some businesses begin with a market gap. mAItrymoon began with a
              marriage.
            </h2>
            <p className="mt-4 max-w-md text-ink/70">
              Rahul Sagar Sahay and Rachika Agrawal Sahay are a lawyer couple,
              married for over two decades. What they learned navigating
              their own relationship — that being heard matters, and that an
              unbiased perspective can be hard to find — became the idea
              behind mAItrymoon.
            </p>
            <Link href="/our-story" className="mt-5 inline-block text-sm font-semibold text-garnet underline">
              Read our story →
            </Link>
          </Reveal>

          <Reveal delay={150} className="relative overflow-hidden rounded-xl2 bg-ink-deep p-8">
            <MoonPanel className="float-slow pointer-events-none absolute inset-0 h-full w-full opacity-80" />
            <p className="relative font-serif text-lg italic leading-relaxed text-canvas/90">
              In a disagreement, being heard is important — but being right
              isn't always the same as feeling right.
            </p>
            <p className="relative mt-4 text-sm text-canvas/60">
              From the founders' story
            </p>
          </Reveal>
        </div>
      </section>

      <InstagramSection />

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-ink-deep py-20 text-center text-canvas">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, rgba(201,152,46,0.18) 0%, rgba(201,152,46,0) 70%)",
          }}
        />
        <Reveal className="container-page relative">
          <h2 className="font-serif text-3xl font-bold">
            Your relationship deserves understanding.
          </h2>
          <Link
            href="/login"
            className="btn-motion mt-6 inline-block rounded-full bg-gradient-to-r from-gold to-gold-dark px-8 py-3 text-sm font-semibold text-ink-deep shadow-md hover:shadow-lg"
          >
            Talk to mAItrymoon
          </Link>
        </Reveal>
      </section>
    </>
  );
}
