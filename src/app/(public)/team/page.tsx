import type { Metadata } from "next";
import PlaceholderNotice from "@/components/ui/PlaceholderNotice";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the mAItrymoon team.",
};

const PLACEHOLDER_TEAM = [
  { name: "[Team member name]", role: "[Role]", contribution: "[What this person is responsible for]" },
];

export default function TeamPage() {
  return (
    <section className="container-page max-w-4xl py-16">
      <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">Team</h1>

      <PlaceholderNotice>
        Team member names, roles, photos, and bios (blueprint section 12 /
        34).
      </PlaceholderNotice>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PLACEHOLDER_TEAM.map((member) => (
          <div key={member.name} className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-sm">
            <div className="mb-3 h-16 w-16 rounded-full bg-moon-light" aria-hidden />
            <p className="font-semibold text-ink">{member.name}</p>
            <p className="text-sm text-ink/60">{member.role}</p>
            <p className="mt-2 text-sm text-ink/70">{member.contribution}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
