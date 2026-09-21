"use client";

// ============================================================================
// Homepage hero — a two-slide, self-running cinematic carousel.
//
// Slide 1 — "Meet mAItrymoon": the living phone-interface composition (real
//   logo, user + AI avatars, a looping realistic conversation, two drifting
//   "perspective" orbs, the logo's rings turning slowly, two floating quote
//   cards) — this is new.
// Slide 2 — "The Conflict": the cinematic couple photo, with headline/sub/
//   CTA centered over the seam between the two people (matching the
//   reference layout) — background photo is the clean (no baked-in text)
//   version, so the live text overlay only ever renders once.
//
// Autoplays on load, advances automatically, loops — no click/scroll
// required. Labeled slide tabs + prev/next arrows remain available as
// manual, optional controls; picking one just restarts the autoplay clock,
// it never stops it. Crossfade + a slow Ken-Burns zoom per slide; the
// shared text/CTA overlay crossfades with a mount animation on slide change.
//
// No animation library — plain CSS transitions/keyframes driven by React
// state. prefers-reduced-motion gets a static single frame (no timers).
// ============================================================================

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SLIDE_MS = 6500;
const CONVERSATION_MS = 7000;

const EXCHANGES = [
  {
    user: "I felt like you weren't even listening to me.",
    reply: "That sounds frustrating. What do you think made it hard for them to hear you in that moment?",
  },
  {
    user: "I didn't mean it that way — she just took it the wrong way.",
    reply: "It's possible you both experienced that moment differently. Want to walk through how it may have looked from her side too?",
  },
];

// Small, positive insets only (never a negative offset past the visual's
// own box) so the full card — text included — always stays fully visible,
// and a z-index above the phone so it floats in front of it, not behind.
const FLOATING_CARDS = [
  { text: "I felt unheard.", className: "left-1 top-4 sm:left-2 sm:top-6", tone: "gold" as const, delay: "0.1s", duration: "7s" },
  { text: "Let's understand both sides.", className: "right-1 bottom-6 sm:right-2 sm:bottom-10", tone: "garnet" as const, delay: "0.6s", duration: "8.5s" },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2C6.477 2 2 6.477 2 12c0 1.995.588 3.85 1.6 5.408L2 22l4.71-1.55A9.95 9.95 0 0 0 12.004 22C17.53 22 22 17.523 22 12S17.53 2 12.004 2zm0 18.05a8.02 8.02 0 0 1-4.324-1.264l-.31-.184-2.796.92.933-2.723-.202-.314A8.03 8.03 0 1 1 20.03 12c0 4.436-3.596 8.05-8.026 8.05z" />
    </svg>
  );
}

function RingMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true">
      <circle cx="150" cy="150" r="118" fill="none" stroke="url(#heroRingA3)" strokeWidth="1.5" />
      <circle cx="250" cy="150" r="118" fill="none" stroke="url(#heroRingB3)" strokeWidth="1.5" />
      <defs>
        <linearGradient id="heroRingA3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E7C878" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#C9982E" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="heroRingB3" x1="1" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#C9982E" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#9B2C3E" stopOpacity="0.08" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ---------------------------------------------------------------------- */
/* Slide 1 building blocks — the phone conversation, reused as-is from the */
/* living-hero build, now living inside slide 1's visual layer.           */
/* ---------------------------------------------------------------------- */
function ConversationExchange({ user, reply, animate }: { user: string; reply: string; animate: boolean }) {
  const [stage, setStage] = useState<"user" | "typing" | "reply">(animate ? "user" : "reply");

  useEffect(() => {
    if (!animate) return;
    setStage("user");
    const t1 = window.setTimeout(() => setStage("typing"), 900);
    const t2 = window.setTimeout(() => setStage("reply"), 2100);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [animate, user]);

  return (
    <div className="hero-slide-in flex h-full flex-col justify-end gap-2.5">
      <div className="ml-auto flex max-w-[82%] items-end gap-1.5">
        <div className="rounded-2xl rounded-br-sm bg-ivory/10 px-3 py-2 text-[0.7rem] leading-snug text-ivory/90">
          {user}
        </div>
        <span className="mb-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-garnet/30 text-[0.55rem] font-semibold text-ivory/90">
          Y
        </span>
      </div>

      {stage === "typing" && (
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gold/20 p-0.5">
            <Image src="/logo-mark.png" alt="" width={670} height={421} className="h-full w-full object-contain" />
          </span>
          <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-gold/20 bg-gold/5 px-3 py-2">
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-gold/70" />
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-gold/70" />
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-gold/70" />
          </div>
          <span className="text-[0.55rem] italic text-gold/50">considering both sides…</span>
        </div>
      )}

      {stage === "reply" && (
        <div className="flex items-end gap-1.5">
          <span className="mb-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gold/20 p-0.5">
            <Image src="/logo-mark.png" alt="" width={670} height={421} className="h-full w-full object-contain" />
          </span>
          <div className="hero-slide-in max-w-[82%] rounded-2xl rounded-tl-sm border border-gold/25 bg-gold/10 px-3 py-2 text-[0.7rem] leading-snug text-gold-light">
            {reply}
          </div>
        </div>
      )}
    </div>
  );
}

function PhoneMockup({ animate }: { animate: boolean }) {
  const [exchangeIndex, setExchangeIndex] = useState(0);

  useEffect(() => {
    if (!animate) return;
    const id = window.setInterval(() => {
      setExchangeIndex((i) => (i + 1) % EXCHANGES.length);
    }, CONVERSATION_MS);
    return () => window.clearInterval(id);
  }, [animate]);

  const current = EXCHANGES[exchangeIndex];

  return (
    <div className="w-60 rounded-[2.2rem] border border-ivory/15 bg-charcoal/70 p-2.5 shadow-2xl shadow-black/50 backdrop-blur-sm sm:w-64">
      <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-ivory/20" />

      <div className="mb-2 flex items-center gap-2 border-b border-ivory/10 px-1 pb-2.5">
        <span className="relative flex h-7 w-7 flex-none items-center justify-center rounded-full bg-gold/15 p-1">
          <Image src="/logo-mark.png" alt="" width={670} height={421} className="h-full w-full object-contain" />
          <span className="pulse-dot absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-charcoal" />
        </span>
        <div className="leading-tight">
          <p className="text-[0.7rem] font-semibold text-ivory">mAItrymoon</p>
          <p className="text-[0.55rem] text-ivory/50">AI Relationship Referee</p>
        </div>
      </div>

      <div className="h-72 px-1 pb-1 sm:h-80">
        <ConversationExchange key={exchangeIndex} user={current.user} reply={current.reply} animate={animate} />
      </div>
    </div>
  );
}

function FloatingCard({ text, className, tone, delay, duration }: (typeof FLOATING_CARDS)[number]) {
  return (
    <div
      className={`float-slow pointer-events-none absolute z-20 max-w-[6.5rem] rounded-xl2 border px-2.5 py-1.5 text-[0.62rem] leading-snug shadow-lg backdrop-blur-sm sm:max-w-[9.5rem] sm:px-3 sm:py-2 sm:text-[0.7rem] ${className} ${
        tone === "gold" ? "border-gold/25 bg-ink-deep/80 text-gold-light" : "border-garnet/30 bg-ink-deep/80 text-garnet-light"
      }`}
      style={{ animationDelay: delay, animationDuration: duration }}
    >
      &ldquo;{text}&rdquo;
    </div>
  );
}

/* Slide 1 visual — phone + orbs + rings + floating cards, positioned to sit
   on the right-hand side of the frame (the shared text overlay covers the
   left). */
function IntroVisual({ active }: { active: boolean }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-ink-deep via-[#1A1210] to-ink-deep px-6 lg:justify-end lg:pr-[13%]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 55% at 30% 30%, rgba(201,152,46,0.08) 0%, rgba(201,152,46,0) 70%), radial-gradient(40% 50% at 75% 75%, rgba(155,44,62,0.12) 0%, rgba(155,44,62,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative flex h-[26rem] w-full max-w-md items-center justify-center sm:h-[30rem]">
        <div
          className="orb-drift pointer-events-none absolute left-4 top-6 h-40 w-40 rounded-full bg-gold/20 blur-3xl sm:h-52 sm:w-52"
          style={{ ["--orb-duration" as string]: "9s", ["--orb-dx" as string]: "22px", ["--orb-dy" as string]: "16px" }}
          aria-hidden="true"
        />
        <div
          className="orb-drift pointer-events-none absolute bottom-4 right-4 h-44 w-44 rounded-full bg-garnet/20 blur-3xl sm:h-56 sm:w-56"
          style={{ ["--orb-duration" as string]: "11s", ["--orb-dx" as string]: "-18px", ["--orb-dy" as string]: "-14px" }}
          aria-hidden="true"
        />

        <RingMotif className="ring-rotate-slow pointer-events-none absolute h-64 w-80 opacity-40 sm:h-80 sm:w-[26rem]" />

        {FLOATING_CARDS.map((card) => (
          <FloatingCard key={card.text} {...card} />
        ))}

        <div className="relative z-10">
          <PhoneMockup animate={active} />
        </div>
      </div>
    </div>
  );
}

/* Slide 2 visual — the existing cinematic photo slide. hero-couple.jpg is
   now the CLEAN photo (no text baked into the pixels) — the earlier
   "doubled/ghosted text" glitch was the real background image already
   containing a mocked-up headline, with this component's own live text
   drawn on top of it a second time. Swapping in the clean source photo
   fixes that at the root. object-center + a light zoom keeps both people
   fully in frame (no over-cropped, zoomed-into-one-face look), and a
   center vignette (rather than the old left-heavy diagonal one) darkens
   just the middle strip behind the seam so the centered text/CTA stay
   legible without hiding either side of the photo. */
function ConflictVisual({ active }: { active: boolean }) {
  return (
    <>
      <Image
        src="/hero-couple.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className={`object-cover object-center transition-transform duration-[7000ms] ease-out ${
          active ? "scale-105" : "scale-100"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/85 via-ink-deep/20 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(38% 60% at 50% 42%, rgba(18,15,13,0.6) 0%, rgba(18,15,13,0.28) 55%, rgba(18,15,13,0) 80%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}

const SLIDES = [
  {
    id: "intro",
    label: "Meet mAItrymoon",
    eyebrow: "AI-powered Relationship Referee",
    headline: "Your side matters.",
    headlineItalic: "So does understanding theirs.",
    sub: "Share what happened. mAItrymoon listens to both sides and helps you find the clarity that's easy to miss in the middle of an argument.",
    Visual: IntroVisual,
    align: "left" as "left" | "center",
    hideText: false,
  },
  {
    id: "conflict",
    label: "The Conflict",
    eyebrow: "One argument, two realities",
    headline: "Being hurt doesn't",
    headlineItalic: "make you right.",
    sub: "Understand what happened. See beyond your side of the story.",
    Visual: ConflictVisual,
    // Centered over the seam between the two people, matching the
    // reference layout — text + CTA sit in the middle of the frame, not
    // hugging the left edge.
    align: "center" as "left" | "center",
    hideText: false,
  },
];

function CtaRow({ align }: { align: "left" | "center" }) {
  return (
    <div className={`mt-8 flex flex-wrap items-center gap-4 ${align === "center" ? "justify-center" : "justify-start"}`}>
      <span className="relative">
        <span className="pointer-events-none absolute -inset-3 -z-10 rounded-full bg-gold/25 blur-xl" aria-hidden="true" />
        <Link
          href="/login"
          className="btn-motion inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink-deep transition hover:bg-gold-light"
        >
          Talk to mAItrymoon
          <span aria-hidden="true">→</span>
        </Link>
      </span>
      <a
        href="#"
        title="Placeholder link — connect to your real WhatsApp entry point"
        className="btn-motion inline-flex items-center gap-2 rounded-full border border-ivory/25 px-7 py-3.5 text-sm font-semibold text-ivory transition hover:bg-ivory/10"
      >
        <WhatsAppIcon className="h-4 w-4" />
        Continue on WhatsApp
      </a>
    </div>
  );
}

function StaticHero() {
  const slide = SLIDES[1];
  return (
    <div className="-mt-24 flex min-h-[100svh] w-full flex-col items-center justify-center bg-ink-deep px-6 py-28 text-center sm:-mt-28">
      <p className="text-xs uppercase tracking-[0.3em] text-gold/70">{slide.eyebrow}</p>
      <h1 className="mt-4 max-w-2xl font-serif text-3xl font-bold leading-[1.2] text-ivory sm:text-4xl">
        {slide.headline} <span className="italic text-gold-light">{slide.headlineItalic}</span>
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-ivory/75">{slide.sub}</p>
      <CtaRow align="center" />
    </div>
  );
}

export default function CinematicHero() {
  const [mode, setMode] = useState<"loading" | "auto" | "static">("loading");
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMode(prefersReducedMotion ? "static" : "auto");
  }, []);

  const startTimer = () => {
    window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_MS);
  };

  useEffect(() => {
    if (mode !== "auto") return;
    startTimer();
    return () => window.clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const goTo = (i: number) => {
    setIndex(i);
    if (mode === "auto") startTimer(); // manual pick restarts the clock, never stops it
  };

  if (mode === "loading") {
    return <div className="-mt-24 h-[100svh] w-full bg-ink-deep sm:-mt-28" />;
  }

  if (mode === "static") {
    return <StaticHero />;
  }

  const current = SLIDES[index];

  return (
    <div className="-mt-24 relative h-[100svh] w-full overflow-hidden bg-ink-deep sm:-mt-28">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
            i === index ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <slide.Visual active={i === index} />
        </div>
      ))}

      {/* Text overlay — shared across slides, crossfades its content via a
          React key that remounts it whenever the slide changes.

          Deliberately NOT using `container-page` here: that class centers
          a max-w-6xl box on the page, which is right for normal (narrower)
          content sections but wrong for this full-bleed hero — it was
          pushing "left-aligned" text ~20% in from the actual left edge,
          reading as sitting in the middle of the frame instead of hugging
          the left side the way slide 1 does. Plain responsive padding
          keeps it anchored to the true left edge; center-aligned slides
          (if any) still get their own centered wrapper below. */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center">
        <div
          className={`w-full ${
            current.align === "center" ? "px-6" : "px-6 sm:px-10 lg:px-20"
          }`}
        >
          <div
            key={current.id}
            className={`hero-slide-in max-w-xl ${current.align === "center" ? "mx-auto text-center" : "text-left"}`}
          >
            {!current.hideText && (
              <>
                <p className="text-xs uppercase tracking-[0.3em] text-gold/80">{current.eyebrow}</p>
                <h1 className="mt-4 font-serif text-3xl font-bold leading-[1.15] text-ivory sm:text-4xl lg:text-5xl">
                  {current.headline}
                  <br />
                  <span className="italic text-gold-light">{current.headlineItalic}</span>
                </h1>
                <p className="mt-5 text-base leading-relaxed text-ivory/80 sm:text-lg">{current.sub}</p>
              </>
            )}
            <div className="pointer-events-auto">
              <CtaRow align={current.align} />
            </div>
          </div>
        </div>
      </div>

      {/* Manual controls — optional, autoplay works independently. */}
      <button
        type="button"
        onClick={() => goTo((index - 1 + SLIDES.length) % SLIDES.length)}
        aria-label="Previous slide"
        className="group absolute left-3 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 bg-ink-deep/40 text-ivory/70 backdrop-blur-sm transition hover:border-gold/50 hover:text-gold-light sm:flex"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => goTo((index + 1) % SLIDES.length)}
        aria-label="Next slide"
        className="group absolute right-3 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 bg-ink-deep/40 text-ivory/70 backdrop-blur-sm transition hover:border-gold/50 hover:text-gold-light sm:flex"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Slide tabs — labeled, premium, not tiny anonymous dots. */}
      <div className="absolute inset-x-0 bottom-8 z-30 flex items-center justify-center gap-2 px-4 sm:gap-3">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}: ${slide.label}`}
            aria-current={i === index}
            className={`group flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-sm transition-all duration-300 sm:px-4 sm:py-2 ${
              i === index
                ? "border-gold/60 bg-ink-deep/60"
                : "border-ivory/15 bg-ink-deep/30 hover:border-ivory/30"
            }`}
          >
            <span className={`text-[0.65rem] font-semibold ${i === index ? "text-gold" : "text-ivory/50"}`}>
              0{i + 1}
            </span>
            <span
              className={`hidden text-[0.7rem] uppercase tracking-wide transition-colors sm:inline ${
                i === index ? "text-ivory" : "text-ivory/45 group-hover:text-ivory/70"
              }`}
            >
              {slide.label}
            </span>
          </button>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </div>
  );
}
