"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import ChatWindow from "@/components/chat/ChatWindow";
import SafetyNotice from "@/components/ui/SafetyNotice";

export default function ChatPage() {
  const { user, activeSession } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !user.hasCompletedConsent) {
      router.replace("/consent?redirect=/chat");
      return;
    }
    if (user && !activeSession) {
      router.replace("/dashboard");
    }
  }, [user, activeSession, router]);

  if (!user || !user.hasCompletedConsent || !activeSession) return null;

  return (
    <div className="flex flex-1 flex-col bg-moon-light">
      <div className="border-b border-ink/10 bg-white">
        <div className="container-page flex flex-wrap items-center justify-between gap-2 py-3">
          <div>
            <p className="font-serif text-base font-bold text-ink">
              {activeSession.type === "partner" ? "Partner Session" : "Individual Session"}
            </p>
            <p className="text-xs text-ink/50">
              Session status: <span className="font-medium text-ink/70">{activeSession.status}</span>
              {activeSession.partnerCode && (
                <>
                  {" "}
                  · Partner code: <span className="font-mono font-medium text-ink/70">{activeSession.partnerCode}</span>
                </>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/tutorials" className="text-ink/60 underline">
              Help
            </Link>
            <Link href="/dashboard" className="text-ink/60 underline">
              Exit to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="container-page flex flex-1 flex-col py-4">
        <div className="flex flex-1 flex-col overflow-hidden rounded-xl2 border border-ink/10 bg-moon-light">
          <ChatWindow sessionId={activeSession.id} />
        </div>
        <div className="mt-4">
          <SafetyNotice compact />
        </div>
      </div>
    </div>
  );
}
