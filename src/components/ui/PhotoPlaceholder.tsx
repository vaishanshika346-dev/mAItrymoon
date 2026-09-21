/**
 * Reserves space for real photography per the design brief's "mix of
 * illustration and photography" direction. We can't license stock photos
 * on your behalf, so this holds the spot with the right aspect ratio and
 * a tasteful gradient (never a broken-image look) until you drop in a
 * real, rights-cleared photo — swap the <div> for a Next.js <Image>
 * pointing at your file once you have it.
 */
export default function PhotoPlaceholder({
  label,
  aspect = "aspect-[4/3]",
  className = "",
}: {
  label: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl2 ${aspect} ${className}`}
      style={{
        background:
          "linear-gradient(135deg, #10172B 0%, #1E2A47 45%, #9B2C3E 78%, #C9982E 100%)",
      }}
    >
      <div className="absolute inset-0 flex items-end p-4">
        <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-canvas/90 backdrop-blur-sm">
          Photo placeholder — {label}
        </span>
      </div>
    </div>
  );
}
