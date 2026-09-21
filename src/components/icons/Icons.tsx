// A small, consistent set of hand-drawn line icons (24x24, stroke-based) so
// the product doesn't depend on an external icon package. Matches the
// brief's request for a clean, modern, consistent icon set used to improve
// clarity (listening, conversation, sessions, voice, privacy, plans, help).

type IconProps = { className?: string };
const base = "h-6 w-6";

export function ListeningIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.6">
      <path d="M4 12a8 8 0 0 1 16 0v4a3 3 0 0 1-3 3h-1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 12v3a2 2 0 0 0 2 2h1v-6H5a1 1 0 0 0-1 1Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 12v3a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 1Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 19a2 2 0 1 1-4 0" strokeLinecap="round" />
    </svg>
  );
}

export function ConversationIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.6">
      <path d="M4 6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H6a2 2 0 0 1-2-2V6Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 16v1a2 2 0 0 0 2 2h1l3 2v-2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IndividualIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" strokeLinecap="round" />
    </svg>
  );
}

export function PartnerIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.6">
      <circle cx="8.5" cy="8" r="2.8" />
      <circle cx="15.5" cy="8" r="2.8" />
      <path d="M3.5 19c0-2.9 2.4-5 5-5 1.1 0 2.1.36 2.9.98" strokeLinecap="round" />
      <path d="M20.5 19c0-2.9-2.4-5-5-5-1.1 0-2.1.36-2.9.98" strokeLinecap="round" />
    </svg>
  );
}

export function VoiceIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.6">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" strokeLinecap="round" />
      <path d="M12 18v3" strokeLinecap="round" />
    </svg>
  );
}

export function PrivacyIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3l7 3v5c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3Z" strokeLinejoin="round" />
      <path d="M9.5 12l1.8 1.8L14.5 10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlansIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.6">
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
      <path d="M8 9h8M8 13h8M8 17h5" strokeLinecap="round" />
    </svg>
  );
}

export function HelpIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.2a2.5 2.5 0 0 1 4.9.6c0 1.6-2.4 1.9-2.4 3.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="16.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MoonIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.6">
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
