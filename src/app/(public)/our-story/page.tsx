import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description: "The story behind the mAItrymoon name, logo, and brand.",
};

export default function OurStoryPage() {
  return (
    <section className="container-page max-w-3xl py-16">
      <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">Our Story</h1>
      <p className="mt-4 text-ink/70">
        What mAItrymoon means, and what it's built to do.
      </p>

      <div className="mt-10 space-y-10">
        <div>
          <h2 className="font-serif text-xl font-bold text-ink">
            What does mAItrymoon mean?
          </h2>
          <p className="mt-3 text-ink/80">
            "mAItrymoon" brings together the idea of AI and a companion-like
            presence in the world of relationships. The name reflects a
            belief that technology can create a thoughtful space for people
            to express themselves, explore what they're experiencing, and
            find greater clarity — meant to feel personal and approachable,
            not like a cold, technical tool.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl font-bold text-ink">
            Why was this name selected?
          </h2>
          <p className="mt-3 text-ink/80">
            The intent was a name that felt warm, memorable, and connected to
            the emotional nature of relationships, while still reflecting
            the role AI plays in the experience — a name that makes space
            for conversations that can sometimes feel difficult to begin.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl font-bold text-ink">
            Why this logo?
          </h2>
          <p className="mt-3 text-ink/80">
            The logo gives mAItrymoon a distinctive visual identity — meant
            to feel recognizable and reassuring, expressing the brand's
            calm, thoughtful and welcoming personality, without appearing
            overly clinical or overly romantic.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl font-bold text-ink">
            What does the visual identity represent?
          </h2>
          <p className="mt-3 text-ink/80">
            The visual identity is designed to bring together two qualities:
            the clarity and structure of technology, and the warmth and
            sensitivity a relationship conversation needs. The typography,
            colours, imagery and layout are meant to feel calm, approachable
            and trustworthy — creating space to pause, reflect, and express
            what's actually going on.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl font-bold text-ink">What emotion should the brand create?</h2>
          <p className="mt-3 text-ink/80">mAItrymoon should help people feel:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-ink/80">
            <li>Heard, without being judged.</li>
            <li>Comfortable explaining their perspective.</li>
            <li>Reassured that they can take a conversation one step at a time.</li>
            <li>Encouraged to understand the situation more clearly.</li>
          </ul>
          <p className="mt-3 text-ink/80">
            Warm and supportive — never overly sentimental, and never falsely
            reassuring.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl font-bold text-ink">What does mAItrymoon promise?</h2>
          <p className="mt-3 text-ink/80">
            A relationship-focused AI counselling experience where you can
            explain your situation, respond to relevant questions, explore
            different perspectives, and work toward greater clarity — a
            calm, private, and accessible space for relationship
            conversations.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl font-bold text-ink">What does mAItrymoon deliberately not promise?</h2>
          <p className="mt-3 text-ink/80">
            mAItrymoon does not promise to fix every relationship, guarantee
            reconciliation, or tell you that you're always right. It does
            not replace professional mental-health care, emergency support,
            or qualified human counselling where those are needed. It does
            not promise a particular outcome — its purpose is to help you
            explore your situation and find greater clarity, not to decide
            for you.
          </p>
        </div>
      </div>

      <p className="mt-12 text-xs text-ink/40">
        See also{" "}
        <a href="/why-we-started" className="underline">Why We Started</a> and{" "}
        <a href="/founders" className="underline">Founders</a> for more on
        the people behind mAItrymoon.
      </p>
    </section>
  );
}
