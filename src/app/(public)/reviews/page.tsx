"use client";

import { useState, type FormEvent } from "react";
import { mockSubmitReview } from "@/lib/mock-api";
import PlaceholderNotice from "@/components/ui/PlaceholderNotice";

// PLACEHOLDER reviews — do not publish until real, permissioned user
// stories are collected (blueprint section 18). Anonymous/initial-based
// display is fine; never exaggerate a user's statement.
const PLACEHOLDER_REVIEWS = [
  { initials: "—", quote: "[Authentic, permissioned review will go here.]" },
];

export default function ReviewsPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const form = new FormData(e.currentTarget);
    try {
      await mockSubmitReview(Object.fromEntries(form.entries()));
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <section className="container-page max-w-3xl py-16">
      <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">Reviews</h1>
      <p className="mt-4 text-ink/70">
        Only authentic, permissioned reviews are shown here — clearly
        labelled, never exaggerated.
      </p>

      <PlaceholderNotice>
        Replace with real reviews once permission has been collected
        (blueprint section 17–18).
      </PlaceholderNotice>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {PLACEHOLDER_REVIEWS.map((r, i) => (
          <blockquote key={i} className="rounded-xl2 border border-ink/10 bg-white p-5 text-sm text-ink/80 shadow-sm">
            "{r.quote}"
            <footer className="mt-3 text-xs font-semibold text-ink/50">— {r.initials}</footer>
          </blockquote>
        ))}
      </div>

      <div className="mt-12">
        {status === "done" ? (
          <p className="rounded-xl2 border border-ink/10 bg-moon-light p-5 text-sm text-ink/80">
            Thank you — your review has been submitted for review before
            publishing. (Mock submission; wire up the real API to store
            this.)
          </p>
        ) : (
          <>
            <h2 className="font-serif text-xl font-bold text-ink">Share Your Experience</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <textarea
                name="review"
                required
                rows={4}
                placeholder="Tell us about your experience with mAItrymoon…"
                className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
              />
              <label className="flex items-center gap-2 text-sm text-ink/70">
                <input type="checkbox" name="displayName" className="h-4 w-4" />
                Display my initials only (recommended)
              </label>
              <label className="flex items-center gap-2 text-sm text-ink/70">
                <input type="checkbox" name="consent" required className="h-4 w-4" />
                I consent to mAItrymoon publishing this review publicly.
              </label>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas hover:bg-ink-light disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : "Share Your Experience"}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
