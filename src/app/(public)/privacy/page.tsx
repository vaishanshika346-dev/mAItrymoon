import type { Metadata } from "next";
import PlaceholderNotice from "@/components/ui/PlaceholderNotice";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How mAItrymoon collects, uses, and protects your data.",
};

const SECTIONS = [
  "Who operates mAItrymoon.",
  "What information is collected.",
  "How relationship/chat content is handled.",
  "Why information is collected and processed.",
  "Cookies and analytics.",
  "Third-party services/processors.",
  "Data retention.",
  "Security practices and limitations.",
  "User rights and request procedures.",
  "Children/minors.",
  "International transfers, if applicable.",
  "Policy changes.",
  "Privacy contact.",
];

export default function PrivacyPage() {
  return (
    <section className="container-page max-w-3xl py-16">
      <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">Privacy Policy</h1>

      <PlaceholderNotice>
        This page's final text must be prepared or reviewed by qualified
        legal counsel, based on your actual jurisdictions, data flows, and
        technology stack (blueprint section 20). The outline below is the
        structure it should cover — none of this is legal advice.
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
