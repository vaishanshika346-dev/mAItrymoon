"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !user.hasCompletedConsent) {
      router.replace("/consent?redirect=/dashboard");
    }
  }, [user, router]);

  if (!user || !user.hasCompletedConsent) return null;

  return (
    <section className="container-page max-w-3xl py-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink">Your Dashboard</h1>
          <p className="mt-1 text-sm text-ink/60">Signed in as {user.identifier}</p>
        </div>
        <button onClick={logout} className="text-sm text-ink/50 underline">
          Log out
        </button>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Link
          href="/session/new?type=individual"
          className="rounded-xl2 border border-ink/10 bg-white p-6 shadow-sm transition hover:border-ink/30"
        >
          <p className="font-serif text-lg font-bold text-ink">Individual Session</p>
          <p className="mt-2 text-sm text-ink/60">
            Talk through a relationship situation one-on-one with mAItrymoon.
          </p>
        </Link>
        <Link
          href="/session/new?type=partner"
          className="rounded-xl2 border border-ink/10 bg-white p-6 shadow-sm transition hover:border-ink/30"
        >
          <p className="font-serif text-lg font-bold text-ink">Partner Session</p>
          <p className="mt-2 text-sm text-ink/60">
            Start a dedicated session designed to involve both partners.
          </p>
        </Link>
      </div>

      <div className="mt-10 rounded-xl2 border border-ink/10 bg-moon-light p-6">
        <p className="font-semibold text-ink">My Plans</p>
        <p className="mt-2 text-sm text-ink/70">
          Session/credit details will appear here once the real backend
          (v3.1.0) is connected — this is a placeholder until then.
        </p>
      </div>
    </section>
  );
}
