type AnimatedLogoVideoProps = {
  className?: string;
  /**
   * Which background this instance sits on. The primary source
   * (logo-animation.webm) has a real transparent background, so this only
   * decides the MP4 *fallback* used by browsers that can't play alpha WebM
   * (mainly older Safari) — that fallback is a pre-composited clip so it
   * still blends in instead of showing a white/boxed video.
   */
  background?: "light" | "dark";
};

/**
 * The user's own commissioned logo animation (rings interlocking + wordmark
 * reveal), used as a continuously-looping video wherever the logo appears
 * (header and footer).
 *
 * The background was keyed out with ffmpeg (colorkey on the source clip's
 * white backdrop, re-encoded as VP9/WebM with an alpha channel), so
 * logo-animation.webm plays with a genuinely transparent background on any
 * surface. Browsers that can't decode alpha WebM fall through to an MP4
 * that's already composited onto the matching page background, so it still
 * looks intentional rather than a boxed clip.
 *
 * autoPlay + muted + playsInline + loop: plays immediately without a click
 * (muted autoplay is allowed by all browsers), never shows native controls,
 * and loops seamlessly (the source clip starts and ends on the same pose).
 */
export default function AnimatedLogoVideo({
  className = "h-10 w-auto",
  background = "light",
}: AnimatedLogoVideoProps) {
  const fallbackSrc =
    background === "dark" ? "/logo-animation-dark.mp4" : "/logo-animation.mp4";

  return (
    <video
      // object-contain is the fix for the logo looking "squished" — without
      // it, a <video> stretches (object-fit: fill is the element default)
      // to whatever box the width/height attributes below describe, so any
      // mismatch between that box and the clip's real aspect ratio distorts
      // the rings/wordmark. width/height are set to the real logo artwork's
      // ratio (logo-full.png is 900x600) so the box itself is also correct.
      className={`${className} object-contain`}
      width={900}
      height={600}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/logo-full.png"
      aria-label="mAItrymoon"
      role="img"
    >
      <source src="/logo-animation.webm" type="video/webm" />
      <source src={fallbackSrc} type="video/mp4" />
    </video>
  );
}
