import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What Makes Us Different",
  description:
    "How mAItrymoon compares to generic AI tools — relationship-focused conversations, context, Partner Session, and more.",
};

const ROWS: { dimension: string; generic: string; maitrymoon: string }[] = [
  { dimension: "Primary purpose", generic: "Broad questions and tasks.", maitrymoon: "Relationship-focused conversations." },
  { dimension: "Identity", generic: "General AI assistant.", maitrymoon: "AI-powered Relationship Counsellor." },
  { dimension: "Conversation starting point", generic: "Usually a direct question/prompt.", maitrymoon: "You can describe a relationship situation naturally." },
  { dimension: "Context", generic: "Not necessarily relationship-specific.", maitrymoon: "Relationship context is central to the experience." },
  { dimension: "Follow-up", generic: "Depends on tool and prompt.", maitrymoon: "Designed to continue the relationship conversation and explore context." },
  { dimension: "Access", generic: "Depends on platform.", maitrymoon: "Website + WhatsApp." },
  { dimension: "Partner Session", generic: "Not necessarily available.", maitrymoon: "Dedicated feature where enabled." },
  { dimension: "Brand experience", generic: "General-purpose AI environment.", maitrymoon: "Purpose-built relationship experience." },
];

export default function DifferentPage() {
  return (
    <section className="container-page py-16">
      <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">
        How mAItrymoon Is Different From Other AI Tools
      </h1>
      <p className="mt-4 max-w-2xl text-ink/70">
        This is meant to educate, not to attack other tools — every claim
        here is specific and something we can stand behind.
      </p>

      <div className="mt-8 overflow-x-auto rounded-xl2 border border-ink/10 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-moon-light text-ink">
            <tr>
              <th className="px-5 py-3 font-semibold">Dimension</th>
              <th className="px-5 py-3 font-semibold">Generic AI Tool</th>
              <th className="px-5 py-3 font-semibold">mAItrymoon</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={row.dimension} className={i % 2 ? "bg-canvas" : "bg-white"}>
                <td className="px-5 py-3 font-medium text-ink">{row.dimension}</td>
                <td className="px-5 py-3 text-ink/60">{row.generic}</td>
                <td className="px-5 py-3 text-ink/80">{row.maitrymoon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link
        href="/login"
        className="mt-10 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas hover:bg-ink-light"
      >
        Discover mAItrymoon
      </Link>
    </section>
  );
}
