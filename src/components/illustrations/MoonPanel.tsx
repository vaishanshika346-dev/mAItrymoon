/**
 * Refined moon/orbit illustration for the login screen's brand panel
 * (design brief section 2, Option C). Soft light, gentle gradients, a
 * premium and calm atmosphere — pairs with the rings-and-wordmark logo
 * without competing with it or adding more literal romantic imagery.
 */
export default function MoonPanel({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      className={className}
      role="img"
      aria-label="A soft illustration of a moon with gentle orbiting rings and light"
    >
      <defs>
        <radialGradient id="moonGlow" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#E7C878" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#C9982E" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#C9982E" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="200" cy="170" r="150" fill="url(#moonGlow)" />

      {/* orbit rings, echoing the logo's interlocking circles without repeating it literally */}
      <ellipse cx="200" cy="200" rx="150" ry="60" stroke="#E7C878" strokeOpacity="0.3" strokeWidth="1.2" />
      <ellipse cx="200" cy="200" rx="110" ry="150" stroke="#9B2C3E" strokeOpacity="0.18" strokeWidth="1.2" />

      {/* the moon itself */}
      <circle cx="190" cy="150" r="62" fill="#FBF7EE" fillOpacity="0.95" />
      <circle cx="212" cy="132" r="9" fill="#C9982E" fillOpacity="0.25" />
      <circle cx="170" cy="170" r="5" fill="#C9982E" fillOpacity="0.2" />
      <circle cx="205" cy="175" r="4" fill="#9B2C3E" fillOpacity="0.15" />

      {/* small stars */}
      <path d="M300 90l4 10 10 4-10 4-4 10-4-10-10-4 10-4 4-10Z" fill="#E7C878" fillOpacity="0.8" />
      <path d="M90 260l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z" fill="#E7C878" fillOpacity="0.6" />
    </svg>
  );
}
