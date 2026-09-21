/**
 * Delicate line art used as background texture for the "Problem" section —
 * two flowing lines that drift apart and gently curve back toward each
 * other, echoing "two perspectives, finding their way to understanding."
 * Deliberately faint so it enhances the section without competing with
 * the scenario cards on top of it.
 */
export default function ConnectionLines({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 500"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M-50 380C150 320 250 420 400 360S650 200 820 260 1050 380 1250 320"
        stroke="#C9982E"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M-50 120C150 180 300 60 470 110S720 280 900 220 1100 100 1250 150"
        stroke="#9B2C3E"
        strokeOpacity="0.22"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="1080" cy="90" r="26" stroke="#C9982E" strokeOpacity="0.25" strokeWidth="1.2" />
      <circle cx="1080" cy="90" r="10" fill="#E7C878" fillOpacity="0.5" />
    </svg>
  );
}
