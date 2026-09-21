import Link from "next/link";
import AnimatedLogoVideo from "@/components/public/AnimatedLogoVideo";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/why-maitrymoon", label: "Why mAItrymoon" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/different", label: "What Makes Us Different" },
      { href: "/referral", label: "Referral Code" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/our-story", label: "Our Story" },
      { href: "/why-we-started", label: "Why We Started" },
      { href: "/founders", label: "Founders" },
      { href: "/team", label: "Team" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/tutorials", label: "Tutorials / Help" },
      { href: "/reviews", label: "Reviews" },
      { href: "/feedback", label: "Feedback" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-ink-deep text-canvas/80">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <AnimatedLogoVideo className="h-12 w-auto" background="dark" />
          <p className="mt-3 font-serif italic text-gold-light">From honeymoon to companionship</p>
          <p className="mt-2 max-w-xs text-sm text-canvas/70">
            An AI-powered Relationship Counsellor — a private space to talk
            through relationship situations, understand different
            perspectives, and find greater clarity. Available on the website
            and WhatsApp.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="rounded-full bg-gradient-to-r from-gold to-gold-dark px-4 py-2 text-sm font-semibold text-ink-deep shadow-sm transition hover:shadow-md"
            >
              Talk to mAItrymoon
            </Link>
            <a
              href="#"
              className="rounded-full border border-canvas/30 px-4 py-2 text-sm font-medium text-canvas/90"
              title="Placeholder link — connect to your real WhatsApp entry point"
            >
              Continue on WhatsApp
            </a>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold text-gold-light">{col.title}</p>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-canvas/70 hover:text-canvas">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-canvas/10 py-6">
        <p className="container-page text-xs text-canvas/50">
          © {new Date().getFullYear()} mAItrymoon. mAItrymoon is an AI-powered
          service and is not a substitute for a licensed human counsellor or
          emergency support.
        </p>
      </div>
    </footer>
  );
}
