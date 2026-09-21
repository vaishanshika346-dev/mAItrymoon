/**
 * Hero illustration — two speech bubbles that don't quite connect, gradually
 * aligning, with a small moon/orbit detail. Original, on-brand SVG (no
 * stock imagery, no licensing dependency). Colors pull from the logo-driven
 * palette: gold for one voice, garnet for the other, navy line work.
 */
export default function SpeechBubblesAlign({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 420"
      fill="none"
      className={className}
      role="img"
      aria-label="Two speech bubbles gradually coming into alignment, with a small moon and orbit detail"
    >
      {/* orbit / moon detail */}
      <circle cx="392" cy="72" r="34" stroke="#C9982E" strokeOpacity="0.35" strokeWidth="1.4" />
      <circle cx="392" cy="72" r="15" fill="#E7C878" fillOpacity="0.9" />
      <path
        d="M120 30c60-24 220-24 300 18"
        stroke="#C9982E"
        strokeOpacity="0.25"
        strokeWidth="1.4"
        strokeDasharray="2 8"
        strokeLinecap="round"
      />

      {/* left bubble — slightly rotated, not quite meeting the right one */}
      <g transform="translate(30 120) rotate(-4)">
        <rect x="0" y="0" width="230" height="140" rx="28" fill="#10172B" />
        <path d="M40 140 L30 172 L74 140 Z" fill="#10172B" />
        <rect x="28" y="34" width="150" height="12" rx="6" fill="#FBF7EE" fillOpacity="0.85" />
        <rect x="28" y="60" width="174" height="12" rx="6" fill="#FBF7EE" fillOpacity="0.6" />
        <rect x="28" y="86" width="110" height="12" rx="6" fill="#FBF7EE" fillOpacity="0.4" />
      </g>

      {/* right bubble — slightly offset, warm gold, reaching toward the first */}
      <g transform="translate(210 190) rotate(3)">
        <rect x="0" y="0" width="240" height="150" rx="30" fill="#C9982E" />
        <path d="M60 150 L74 182 L112 150 Z" fill="#C9982E" />
        <rect x="30" y="36" width="160" height="13" rx="6.5" fill="#10172B" fillOpacity="0.75" />
        <rect x="30" y="64" width="184" height="13" rx="6.5" fill="#10172B" fillOpacity="0.5" />
        <rect x="30" y="92" width="120" height="13" rx="6.5" fill="#10172B" fillOpacity="0.35" />
      </g>

      {/* garnet accent spark where the two conversations start to meet */}
      <path
        d="M216 178l6 16 16 6-16 6-6 16-6-16-16-6 16-6 6-16Z"
        fill="#9B2C3E"
      />
    </svg>
  );
}
