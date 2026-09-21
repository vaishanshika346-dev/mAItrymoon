import type { Metadata } from "next";
import PlaceholderNotice from "@/components/ui/PlaceholderNotice";

export const metadata: Metadata = {
  title: "Founders",
  description: "Meet the founders of mAItrymoon.",
};

const FOUNDERS = [
  {
    name: "Rahul Sagar Sahay",
    role: "Co-Founder",
    bio: "A lawyer with more than two decades of legal experience, and an Oxford alumnus. Rahul brings a career spent understanding disputes and hearing both sides of an argument to mAItrymoon's approach.",
  },
  {
    name: "Rachika Agrawal Sahay",
    role: "Co-Founder",
    bio: "A lawyer who studied at the London School of Economics. Rachika has spent over two decades building her career alongside Rahul, while navigating the everyday complexity of a large joint family.",
  },
];

export default function FoundersPage() {
  return (
    <section className="container-page max-w-3xl py-16">
      <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">Founders</h1>
      <p className="mt-4 text-ink/70">
        Rahul and Rachika are a lawyer couple, married for over two decades —
        mAItrymoon grew directly out of what they learned navigating their
        own relationship.
      </p>

      <PlaceholderNotice>
        Founder photographs and an optional public professional link still
        need to be added (blueprint section 34).
      </PlaceholderNotice>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {FOUNDERS.map((f) => (
          <div key={f.name} className="rounded-xl2 border border-gold/20 bg-white p-6 shadow-sm">
            <div className="mb-4 h-24 w-24 rounded-full bg-moon-light" aria-hidden />
            <p className="font-semibold text-ink">{f.name}</p>
            <p className="text-sm text-ink/60">{f.role}</p>
            <p className="mt-3 text-sm text-ink/70">{f.bio}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="font-serif text-xl font-bold text-ink">How mAItrymoon started</h2>
        <p className="mt-3 text-sm text-ink/70">
          As lawyers, Rahul and Rachika spent years understanding disputes
          and the value of hearing both sides before reaching a conclusion.
          As a couple, they spent even longer learning how complicated
          relationships can become — married while pursuing their master's
          degrees, raising two daughters, and living with extended family
          through the pressures of the pandemic. mAItrymoon grew out of a
          simple question they kept coming back to: what if there was
          someone you could talk to who had no reason to take either side?
        </p>
      </div>
    </section>
  );
}
