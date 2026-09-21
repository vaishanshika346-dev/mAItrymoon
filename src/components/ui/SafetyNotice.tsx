/**
 * Blueprint section 4.4 / 22: the product must not pretend to be a human
 * counsellor, must not promise outcomes, and must give a route to
 * safety/crisis support for serious situations. This is a visible,
 * always-available notice — copy is a starting point and should be
 * reviewed by the team (and ideally a mental-health professional) before
 * launch, per section 34.
 */
export default function SafetyNotice({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "rounded-lg bg-ink/5 px-3 py-2 text-xs text-ink/70"
          : "rounded-xl2 border border-ink/10 bg-moon-light px-5 py-4 text-sm text-ink/80"
      }
    >
      mAItrymoon is an AI-powered Relationship Counsellor, not a licensed
      human therapist, and its responses may sometimes be imperfect. It
      cannot guarantee relationship outcomes. If you or someone else is in
      immediate danger, or you are having thoughts of harming yourself,
      please contact your local emergency number or a crisis helpline right
      away rather than relying on this chat.
    </div>
  );
}
