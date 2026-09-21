/**
 * A single line that starts tangled and resolves into a calm, clear curve —
 * visual metaphor for "a little clarity can change the way you handle a
 * relationship." Used as a section divider/accent.
 */
export default function TangledLine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 120"
      fill="none"
      className={className}
      role="img"
      aria-label="A tangled line gradually resolving into a smooth, clear curve"
    >
      <path
        d="M10 60c10-30 30 30 40 0s10-45 35-20 5 45 30 30-5-50 25-45 15 40 40 45 30-30 55-20 10 35 40 30 25-25 50-15c20 8 20 20 40 20s30-15 55-15 40 12 60 12 45-8 80-8"
        stroke="#9B2C3E"
        strokeOpacity="0.9"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
