export default function QuietReflection({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 220"
      fill="none"
      className={className}
      role="img"
      aria-label="A person sitting quietly with a phone nearby, a gentle flowing line connecting two soft shapes to suggest two perspectives coming together."
    >
      {/* soft crescent, upper right — a quiet nod to the brand mark */}
      <circle cx="266" cy="46" r="26" stroke="#E7C878" strokeOpacity="0.35" strokeWidth="1.4" />
      <path
        d="M273 32a16 16 0 1 0 0 26 13 13 0 1 1 0-26Z"
        fill="#E7C878"
      />

      {/* seated, reflective figure — light fill so it reads clearly on the dark panel */}
      <g transform="translate(18 60)">
        <path
          d="M4 140c0-34 20-58 52-58s52 24 52 58"
          fill="#39456B"
        />
        <circle cx="56" cy="62" r="30" fill="#39456B" />
        <path d="M42 54c6-7 22-8 28 0" stroke="#FBF7EE" strokeOpacity="0.4" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* phone glow resting nearby — suggests an online conversation */}
      <g transform="translate(150 122)">
        <rect x="0" y="0" width="72" height="50" rx="9" fill="#E7C878" fillOpacity="0.18" />
        <rect x="8" y="8" width="56" height="34" rx="5" fill="#FBF7EE" />
        <rect x="15" y="16" width="28" height="5" rx="2.5" fill="#10172B" fillOpacity="0.4" />
        <rect x="15" y="26" width="38" height="5" rx="2.5" fill="#10172B" fillOpacity="0.22" />
      </g>

      {/* two soft points connected by a gentle line — two perspectives, one conversation */}
      <g opacity="0.9">
        <circle cx="238" cy="90" r="6" fill="#C9982E" />
        <path
          d="M238 90c-8 14 8 24 0 38"
          stroke="#E7C878"
          strokeOpacity="0.6"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="1 7"
        />
        <circle cx="238" cy="128" r="4.5" fill="#9B2C3E" />
      </g>
    </svg>
  );
}
