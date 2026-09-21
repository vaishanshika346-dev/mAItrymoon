"use client";

import { useEffect, useState } from "react";
import type { InstagramPost } from "@/app/api/instagram/route";

type FeedState =
  | { status: "loading" }
  | { status: "not-configured" }
  | { status: "error" }
  | { status: "empty" }
  | { status: "ready"; posts: InstagramPost[] };

const PROFILE_URL = "https://www.instagram.com/maitrymoon/";
const REELS_TO_SHOW = 6;

export default function InstagramSection() {
  const [state, setState] = useState<FeedState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    fetch("/api/instagram")
      .then((res) => res.json())
      .then((data: { configured: boolean; posts: InstagramPost[]; error: string | null }) => {
        if (cancelled) return;
        if (!data.configured) return setState({ status: "not-configured" });
        if (data.error) return setState({ status: "error" });
        if (data.posts.length === 0) return setState({ status: "empty" });
        setState({ status: "ready", posts: data.posts.slice(0, REELS_TO_SHOW) });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const needsFallback =
    state.status === "loading" ? false : state.status !== "ready";

  return (
    <section className="bg-gradient-to-b from-canvas to-gold-light/15 py-16 sm:py-20">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
              @maitrymoon
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-ink sm:text-3xl">
              A Little More mAItrymoon
            </h2>
            <p className="mt-2 max-w-md text-sm text-ink/60">
              Relationship conversations, gentle reminders, and moments that
              help us understand each other better.
            </p>
          </div>
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-ink/20 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-garnet hover:text-garnet"
          >
            Follow @maitrymoon on Instagram
          </a>
        </div>

        {state.status === "loading" && (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: REELS_TO_SHOW }).map((_, i) => (
              <div key={i} className="aspect-[9/16] animate-pulse rounded-xl2 bg-gold-light/25" />
            ))}
          </div>
        )}

        {state.status === "ready" && (
          <>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {state.posts.map((post) => (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-[9/16] overflow-hidden rounded-xl2 bg-gold-light/20 shadow-sm transition hover:shadow-md"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.thumbnailUrl ?? post.mediaUrl}
                    alt={post.caption ?? "mAItrymoon Instagram reel"}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 ease-out group-hover:scale-105"
                  />
                  {/* play indicator, since every tile here is a Reel */}
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-deep/60 backdrop-blur-sm transition group-hover:bg-ink-deep/75">
                      <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-canvas">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-6 text-center">
              <a
                href={PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-garnet underline"
              >
                View more Reels on Instagram →
              </a>
            </div>
          </>
        )}

        {needsFallback && (
          <div className="mt-8 flex flex-col items-center gap-4 rounded-xl2 border border-gold/20 bg-white px-6 py-10 text-center shadow-sm">
            <p className="max-w-sm text-sm text-ink/60">
              {state.status === "not-configured" &&
                "Our latest Reels will appear here once the Instagram feed is connected."}
              {state.status === "empty" &&
                "No recent Reels to show just yet — check back soon, or follow along on Instagram."}
              {state.status === "error" &&
                "We couldn't load recent Reels just now. You can still see them directly on Instagram."}
            </p>
            <a
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-3 text-sm font-semibold text-ink-deep shadow-sm transition hover:shadow-md"
            >
              Follow @maitrymoon on Instagram
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
