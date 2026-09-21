"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { ApiError, getUserProfile } from "@/lib/api";
import type { UserProfile } from "@/lib/types";
import { ConversationIcon, PartnerIcon, PlansIcon } from "@/components/icons/Icons";

function planLabel(planId: string) {
  return planId
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatExpiry(iso: string | null) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function DashboardPage() {
  const { user, getIdToken, logout } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileStatus, setProfileStatus] = useState<"idle" | "loading" | "error">("idle");
  const [plansOpen, setPlansOpen] = useState(false);

  useEffect(() => {
    if (user && !user.isOnboarded) {
      router.replace("/consent?redirect=/dashboard");
    }
  }, [user, router]);

  useEffect(() => {
    if (!user || !user.isOnboarded) return;
    let cancelled = false;
    (async () => {
      setProfileStatus("loading");
      try {
        const idToken = await getIdToken();
        if (!idToken) throw new Error("no token");
        const data = await getUserProfile(idToken);
        if (!cancelled) {
          setProfile(data);
          setProfileStatus("idle");
        }
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError && err.errorKey === "unauthorized") {
          router.replace("/login?redirect=/dashboard");
          return;
        }
        setProfileStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, getIdToken, router]);

  if (!user || !user.isOnboarded) return null;

  const sessionHref = (type: "individual" | "partner") => `/session/new?type=${type}`;

  return (
    <section className="container-page max-w-3xl py-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink">Your Dashboard</h1>
          <p className="mt-1 text-sm text-ink/60">
            Signed in as {user.phoneNumber || user.email}
          </p>
        </div>
        <button onClick={logout} className="text-sm text-ink/50 underline">
          Log out
        </button>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <button
          onClick={() => setPlansOpen(true)}
          className="rounded-xl2 border border-ink/10 bg-white p-6 text-left shadow-sm transition hover:border-ink/30"
        >
          <PlansIcon className="h-6 w-6 text-garnet" />
          <p className="mt-3 font-serif text-lg font-bold text-ink">My Plans</p>
          <p className="mt-1 text-sm text-ink/60">
            {profileStatus === "loading"
              ? "Loading…"
              : profile
              ? `${profile.availableSessions} credit${profile.availableSessions === 1 ? "" : "s"} available`
              : "View your active plan and credits."}
          </p>
        </button>

        <Link
          href={sessionHref("individual")}
          className="rounded-xl2 border border-ink/10 bg-white p-6 shadow-sm transition hover:border-ink/30"
        >
          <ConversationIcon className="h-6 w-6 text-garnet" />
          <p className="mt-3 font-serif text-lg font-bold text-ink">Individual Session</p>
          <p className="mt-1 text-sm text-ink/60">
            Private 1-on-1 with AI Mitr Counsellor.
          </p>
        </Link>

        <Link
          href={sessionHref("partner")}
          className="rounded-xl2 border border-ink/10 bg-white p-6 shadow-sm transition hover:border-ink/30"
        >
          <PartnerIcon className="h-6 w-6 text-garnet" />
          <p className="mt-3 font-serif text-lg font-bold text-ink">Partner Session</p>
          <p className="mt-1 text-sm text-ink/60">
            Joint mediation & couple resolution.
          </p>
        </Link>
      </div>

      {plansOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4"
          onClick={() => setPlansOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl2 border border-ink/10 bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h2 className="font-serif text-xl font-bold text-ink">My Plans</h2>
              <button
                onClick={() => setPlansOpen(false)}
                className="text-ink/40 hover:text-ink"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {profileStatus === "error" && (
              <p className="mt-4 text-sm text-red-600">
                Couldn't load your plan details. Please try again shortly.
              </p>
            )}

            {profile && (
              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                    Current plan
                  </p>
                  <p className="mt-1 text-base font-semibold text-ink">
                    {planLabel(profile.subscriptionPlanId)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                    Available credits
                  </p>
                  <p className="mt-1 text-base font-semibold text-ink">
                    {profile.availableSessions} session{profile.availableSessions === 1 ? "" : "s"} remaining
                  </p>
                </div>
                {formatExpiry(profile.subscriptionExpiry) && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                      Valid until
                    </p>
                    <p className="mt-1 text-base font-semibold text-ink">
                      {formatExpiry(profile.subscriptionExpiry)}
                    </p>
                  </div>
                )}
                <button
                  type="button"
                  disabled
                  title="Payments aren't wired up yet"
                  className="mt-2 w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas opacity-40"
                >
                  Upgrade / Top up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
