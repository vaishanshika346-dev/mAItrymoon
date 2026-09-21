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
  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-canvas/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <AnimatedLogoVideo className="h-10 w-auto" background="light" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink/80 transition hover:text-garnet"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#"
            className="hidden rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink/80 transition hover:border-gold hover:text-ink sm:inline-block"
            title="Placeholder link — connect to your real WhatsApp entry point"
          >
            Continue on WhatsApp
          </a>
          <Link
            href="/login"
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-canvas shadow-sm transition hover:bg-ink-light hover:shadow-md"
          >
            Talk to mAItrymoon
          </Link>
        </div>
      </div>

      {/* Mobile nav — simple wrap, no JS menu needed for this scope */}
      <nav
        className="container-page flex flex-wrap gap-x-4 gap-y-2 border-t border-gold/10 py-2 text-xs text-ink/70 lg:hidden"
        aria-label="Primary, mobile"
      >
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-garnet">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
