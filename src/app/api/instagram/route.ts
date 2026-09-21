import { NextResponse } from "next/server";

// ============================================================================
// Instagram feed — server-side only, so the access token never reaches the
// browser. Uses the official Instagram Graph API (the supported successor to
// the now-retired Basic Display API), reading a Business/Creator account's
// own published media.
//
// REQUIRES (all read from environment variables, never hardcoded):
//   INSTAGRAM_ACCESS_TOKEN        — a long-lived Page/User access token with
//                                    instagram_basic permission
//   INSTAGRAM_BUSINESS_ACCOUNT_ID — the numeric Instagram Business Account ID
//                                    (NOT the @handle)
//
// See README.md → "Connecting Instagram" for the full one-time setup this
// needs on Meta's side before these env vars exist. Until both are set,
// this route responds with configured:false and an empty post list, so the
// frontend can show an honest "not connected yet" state instead of an error
// or (worse) fake posts.
// ============================================================================

export const revalidate = 3600; // re-fetch from Instagram at most once an hour

export type InstagramPost = {
  id: string;
  caption: string | null;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaProductType: string | null;
  mediaUrl: string;
  thumbnailUrl: string | null;
  permalink: string;
  timestamp: string;
};

// The site shows Reels only (per product decision), not regular photo
// posts. The Graph API has no server-side "reels only" filter on the
// /media list endpoint, so we over-fetch a batch of recent media and
// filter for Reels here. `media_product_type: "REELS"` is the reliable
// signal; on API versions/accounts where it's missing, a VIDEO post is
// treated as a Reel too, since regular feed videos are rare in practice.
const FETCH_BATCH_SIZE = 30;
const REELS_TO_SHOW = 6;

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const businessAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

  if (!accessToken || !businessAccountId) {
    return NextResponse.json({
      configured: false,
      posts: [] as InstagramPost[],
      error: null,
    });
  }

  const fields =
    "id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp";
  const url = `https://graph.facebook.com/v21.0/${businessAccountId}/media?fields=${fields}&limit=${FETCH_BATCH_SIZE}&access_token=${accessToken}`;

  try {
    const res = await fetch(url, { next: { revalidate } });

    if (!res.ok) {
      const body = await res.text();
      console.error("Instagram Graph API error:", res.status, body);
      return NextResponse.json({
        configured: true,
        posts: [] as InstagramPost[],
        error: "Instagram couldn't be reached right now.",
      });
    }

    const data = await res.json();
    const posts: InstagramPost[] = (data.data ?? [])
      .map((item: any) => ({
        id: item.id,
        caption: item.caption ?? null,
        mediaType: item.media_type,
        mediaProductType: item.media_product_type ?? null,
        mediaUrl: item.media_url,
        thumbnailUrl: item.thumbnail_url ?? null,
        permalink: item.permalink,
        timestamp: item.timestamp,
      }))
      .filter(
        (post: InstagramPost) =>
          post.mediaProductType === "REELS" ||
          (post.mediaProductType === null && post.mediaType === "VIDEO"),
      )
      .slice(0, REELS_TO_SHOW);

    return NextResponse.json({ configured: true, posts, error: null });
  } catch (err) {
    console.error("Instagram fetch failed:", err);
    return NextResponse.json({
      configured: true,
      posts: [] as InstagramPost[],
      error: "Instagram couldn't be reached right now.",
    });
  }
}
