"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import Header from "@/components/public/Header";

// Routes inside the (app) group that do NOT require authentication.
const PUBLIC_WITHIN_APP = ["/login"];

/**
 * Gate for the authenticated product zone (login, consent, dashboard,
 * session creation, chat). Enforces the blueprint's "no login, no chat"
 * rule: any of these routes redirects to /login if there's no mock session,
 * and remembers where the visitor was headed so we can send them back
 * after they log in.
 *
 * NOTE: this is CLIENT-SIDE gating against mock, localStorage-based auth —
 * fine for building/reviewing the product, but not a real security
 * boundary. Once the real backend is wired up, protect these routes with
 * real server-validated sessions (e.g. Next.js middleware reading a
 * backend-issued cookie) instead of trusting the browser.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const needsAuth = !PUBLIC_WITHIN_APP.includes(pathname);

  useEffect(() => {
    if (isLoading) return;
    if (needsAuth && !isAuthenticated) {
      const redirectTo = encodeURIComponent(pathname);
      router.replace(`/login?redirect=${redirectTo}`);
    }
  }, [isLoading, needsAuth, isAuthenticated, pathname, router]);

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      {/* Same site-wide header as every public page, so navigation doesn't
          change once you're logged in — per the "keep the header the same
          in all sections" requirement. (The old "My Dashboard" shortcut is
          still reachable from the dashboard/chat pages themselves — e.g.
          chat's "Exit to Dashboard" link — so nothing is lost.) */}
      <Header />

      {/* pt-24/28 clears the fixed floating pill navbar (see Header.tsx) */}
      <main className="flex flex-1 flex-col pt-24 sm:pt-28">
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center py-24 text-sm text-ink/50">
            Loading…
          </div>
        ) : needsAuth && !isAuthenticated ? (
          <div className="flex flex-1 items-center justify-center py-24 text-sm text-ink/50">
            Redirecting to login…
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
}
