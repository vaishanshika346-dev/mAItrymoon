import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why We Started mAItrymoon",
  description: "The founders' own reasons for building mAItrymoon.",
};

export default function WhyWeStartedPage() {
  return (
    <section className="container-page max-w-3xl py-16">
      <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">
        Why We Started mAItrymoon
      </h1>

      <div className="prose-neutral mt-8 space-y-5 text-ink/80">
        <p className="font-serif text-xl italic text-ink">
          Some businesses begin with a market gap. mAItrymoon began with a
          marriage.
        </p>
        <p>
          Rahul Sagar Sahay and Rachika Agrawal Sahay are a lawyer couple who
          have been married for over two decades. They married while
          pursuing their master's degrees, built their careers while raising
          two daughters, and lived with both sides of their extended family
          — all before the pandemic added an entirely new set of pressures
          to an already complicated household.
        </p>
        <p>
          Any one of these can test a relationship. Put them all together,
          and you have a fairly convincing argument for giving up. They
          didn't. Instead, over more than twenty years, they learned
          something that textbooks, courtrooms and well-meaning relatives
          don't always teach you: in a disagreement, being heard is
          important, but being right is not always the same as feeling
          right.
        </p>
        <p>
          And when you're surrounded by people who love you, finding an
          unbiased perspective can be surprisingly difficult. Your parents
          may take your side. Your friends may take your side. Everyone has
          an opinion, but very few people have the complete picture.
        </p>
        <p>
          As lawyers, Rahul and Rachika had spent years understanding
          disputes and the importance of hearing both sides before reaching
          a conclusion. As a couple, they had spent even longer learning how
          complicated relationships can become. So they asked a simple
          question: <em>what if there was someone you could talk to who had
          no reason to take either side?</em>
        </p>
        <p>
          That question became mAItrymoon — an AI-powered Relationship
          Counsellor designed to help each partner talk through a situation,
          ask thoughtful follow-up questions, and offer a calmer, clearer
          perspective. Not to declare a winner, but to help two people find
          a better way to understand each other.
        </p>
      </div>
    </section>
  );
}
