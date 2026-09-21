"use client";

// Floating "pill" navbar — a warm champagne/ivory capsule that stays fixed
// with a margin from the top edge, deliberately contrasting against the
// dark cinematic hero behind it (only the capsule is light; the page
// background it floats over stays dark) so it never blends into the hero
// or reads as a plain dark bar. Picks up a stronger shadow once scrolled.

import { useEffect, useState } from "react";
import Link from "next/link";
import AnimatedLogoVideo from "@/components/public/AnimatedLogoVideo";

const NAV_LINKS = [
  { href: "/why-maitrymoon", label: "Why mAItrymoon" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/our-story", label: "Our Story" },
  { href: "/founders", label: "Founders & Team" },
  { href: "/reviews", label: "Reviews" },
  { href: "/tutorials", label: "Help" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu automatically if the viewport grows back to desktop.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* Fixed floating header — every page gets top padding (see the
          (public)/(app) layouts) so content never sits underneath it. It's
          visible immediately everywhere, including over the homepage's
          autoplaying hero, which stays interactive throughout. */}
      <header className="nav-float-in fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">

        <div
          className={`flex w-full max-w-5xl items-center justify-between gap-3 rounded-full border border-gold/25 bg-canvas py-2 pl-4 pr-2 transition-shadow duration-300 sm:pl-5 ${
            scrolled ? "shadow-xl shadow-black/25" : "shadow-lg shadow-black/10"
          }`}
        >
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <AnimatedLogoVideo className="h-9 w-auto sm:h-11" background="light" />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-charcoal/75 transition hover:text-garnet"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#"
              title="Placeholder link — connect to your real WhatsApp entry point"
              className="btn-motion hidden rounded-full border border-garnet/45 px-4 py-2 text-sm font-medium text-garnet transition hover:bg-garnet/10 sm:inline-block"
            >
              WhatsApp
            </a>
            <Link
              href="/login"
              className="btn-motion hidden rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink-deep transition hover:bg-gold-light sm:inline-block"
            >
              Talk to mAItrymoon
            </Link>

            {/* Mobile menu toggle — the pill stays compact on small screens;
                links + CTAs live in the dropdown panel below instead. */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal/75 transition hover:bg-charcoal/10 lg:hidden"
            >
              {menuOpen ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile dropdown panel */}
      {menuOpen && (
        <div className="fixed inset-x-3 top-[4.25rem] z-40 rounded-2xl border border-gold/25 bg-canvas p-4 shadow-xl sm:inset-x-4 sm:top-[4.75rem] lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Primary, mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-charcoal/80 transition hover:bg-charcoal/5 hover:text-garnet"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2 border-t border-charcoal/10 pt-3">
            <a
              href="#"
              title="Placeholder link — connect to your real WhatsApp entry point"
              className="rounded-full border border-garnet/45 px-4 py-2.5 text-center text-sm font-medium text-garnet transition hover:bg-garnet/10"
            >
              Continue on WhatsApp
            </a>
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="rounded-full bg-gold px-4 py-2.5 text-center text-sm font-semibold text-ink-deep transition hover:bg-gold-light"
            >
              Talk to mAItrymoon
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
