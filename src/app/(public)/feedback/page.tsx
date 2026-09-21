"use client";

import { useState, type FormEvent } from "react";
import { mockSubmitFeedback } from "@/lib/mock-api";

export default function FeedbackPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const form = new FormData(e.currentTarget);
    try {
      await mockSubmitFeedback(Object.fromEntries(form.entries()));
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <section className="container-page max-w-xl py-24 text-center">
        <h1 className="font-serif text-2xl font-bold text-ink">Thank you.</h1>
        <p className="mt-3 text-ink/70">
          Your feedback helps us improve mAItrymoon. (This was submitted to a
          mock endpoint — wire up the real API to store this for real.)
        </p>
      </section>
    );
  }

  return (
    <section className="container-page max-w-xl py-16">
      <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">Feedback</h1>
      <p className="mt-4 text-ink/70">
        Feedback is how mAItrymoon actually improves — not just a place to
        collect compliments.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="text-sm font-medium text-ink" htmlFor="overall">Overall experience</label>
          <select id="overall" name="overall" required className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm">
            <option value="">Select one</option>
            <option value="great">Great</option>
            <option value="good">Good</option>
            <option value="mixed">Mixed</option>
            <option value="poor">Poor</option>
          </select>
        </div>
        <Field label="What was your situation? (optional, kept private)" name="situation" textarea />
        <div>
          <label className="text-sm font-medium text-ink" htmlFor="helped">Did mAItrymoon help?</label>
          <select id="helped" name="helped" required className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm">
            <option value="">Select one</option>
            <option value="yes">Yes</option>
            <option value="somewhat">Somewhat</option>
            <option value="no">No</option>
          </select>
        </div>
        <Field label="What was useful?" name="useful" textarea />
        <Field label="What was missing?" name="missing" textarea />
        <div>
          <label className="text-sm font-medium text-ink" htmlFor="again">Would you use it again?</label>
          <select id="again" name="again" required className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm">
            <option value="">Select one</option>
            <option value="yes">Yes</option>
            <option value="maybe">Maybe</option>
            <option value="no">No</option>
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm text-ink/70">
          <input type="checkbox" name="contactPermission" className="h-4 w-4" />
          You may contact me about this feedback.
        </label>
        <label className="flex items-center gap-2 text-sm text-ink/70">
          <input type="checkbox" name="testimonialPermission" className="h-4 w-4" />
          You may use this as a public testimonial (separate from the above).
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas hover:bg-ink-light disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Give Feedback"}
        </button>
      </form>
    </section>
  );
}

function Field({ label, name, textarea }: { label: string; name: string; textarea?: boolean }) {
  return (
    <div>
      <label className="text-sm font-medium text-ink" htmlFor={name}>{label}</label>
      {textarea ? (
        <textarea id={name} name={name} rows={3} className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm" />
      ) : (
        <input id={name} name={name} className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm" />
      )}
    </div>
  );
}
