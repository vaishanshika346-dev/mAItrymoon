"use client";

import { useState, type FormEvent } from "react";
import { mockSubmitContact } from "@/lib/mock-api";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const form = new FormData(e.currentTarget);
    try {
      await mockSubmitContact(Object.fromEntries(form.entries()));
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <section className="container-page max-w-xl py-24 text-center">
        <h1 className="font-serif text-2xl font-bold text-ink">Message received.</h1>
        <p className="mt-3 text-ink/70">We'll get back to you soon.</p>
      </section>
    );
  }

  return (
    <section className="container-page max-w-xl py-16">
      <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">Contact Us</h1>
      <p className="mt-4 text-ink/70">
        This is for general support and enquiries — not emergency or crisis
        support. If you or someone else is in immediate danger, please
        contact your local emergency number.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="text-sm font-medium text-ink" htmlFor="name">Name</label>
          <input id="name" name="name" required className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium text-ink" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium text-ink" htmlFor="category">Category</label>
          <select id="category" name="category" required className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm">
            <option value="">Select one</option>
            <option value="general">General enquiry</option>
            <option value="technical">Technical support</option>
            <option value="partnerships">Partnerships</option>
            <option value="media">Media / press</option>
            <option value="feedback">Feedback</option>
            <option value="report">Report a problem</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-ink" htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={5} required className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium text-ink" htmlFor="attachment">Attachment (optional)</label>
          <input id="attachment" name="attachment" type="file" className="mt-1 w-full text-sm" />
        </div>
        <label className="flex items-start gap-2 text-sm text-ink/70">
          <input type="checkbox" name="consent" required className="mt-1 h-4 w-4" />
          I consent to mAItrymoon contacting me about this message, per the Privacy Policy.
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas hover:bg-ink-light disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Send Message"}
        </button>
      </form>
    </section>
  );
}
