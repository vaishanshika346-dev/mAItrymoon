/**
 * Flags content that the blueprint explicitly says must come from the real
 * team (founder bios, logo story, legal text, etc.) rather than be invented.
 * Remove this component once real, approved content replaces the placeholder.
 */
export default function PlaceholderNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl2 border border-dashed border-accent/60 bg-accent/10 px-4 py-3 text-sm text-ink/80">
      <span className="font-semibold text-ink">Needs real content: </span>
      {children}
    </div>
  );
}
