# mAItrymoon website — beginner setup guide

This is a Next.js (React + TypeScript + Tailwind CSS) website for mAItrymoon,
built from the full website blueprint. It currently runs on **mock data** —
the login, sessions, and chat all work end-to-end in the browser, but
nothing is saved to a real server yet. That's the last step (see "Connecting
the real backend" below).

## 1. Install Node.js

You need Node.js 18 or newer. Check with:

```
node -v
```

If that fails or shows an old version, install Node.js from
https://nodejs.org (choose the "LTS" version) and re-open your terminal.

## 2. Install the project's dependencies

From inside this folder (`maitrymoon-web`), run:

```
npm install
```

This downloads all the packages the project needs (Next.js, React,
Tailwind, etc.) into a `node_modules` folder. It can take a minute or two
the first time.

## 3. Run it locally

```
npm run dev
```

Then open **http://localhost:3000** in your browser. Changes you make to
the code will show up automatically.

## 4. What you can click through right now

- The public pages (Home, Why mAItrymoon, How It Works, etc.) via the top
  navigation.
- Click **"Talk to mAItrymoon"** anywhere → you'll land on `/login`.
- Log in with any phone number or email. On the code screen, **any 6
  digits work** except `000000` (simulates an invalid code) and `111111`
  (simulates an expired code, phone only).
- You'll see a one-time consent screen, then your dashboard.
- Choose Individual or Partner Session (try entering `MAITRY5` as a
  referral code — anything else is rejected, matching the mock rules).
- You'll land in the chat screen and can talk to a (fake, canned-response)
  mAItrymoon.

If you visit `/chat` or `/dashboard` directly while logged out, you'll be
redirected to `/login` — that's the "no login, no chat" rule from the
blueprint working as intended.

## 5. Where things live

```
src/app/(public)/    → all public marketing pages (Home, Founders, Privacy, ...)
src/app/(app)/        → the authenticated product (login, consent, dashboard, session, chat)
src/components/       → shared UI (Header, Footer, chat bubbles, notices)
src/lib/mock-api.ts   → every fake "backend call" — READ THIS FIRST when connecting the real API
src/lib/auth-context.tsx → fake login/session state, stored in the browser only
src/lib/types.ts      → shared TypeScript types for users/sessions/messages
```

## 6. Content that still needs to be filled in

Search the codebase for `PlaceholderNotice` (or just look for the dashed
gold boxes on the Founders, Team, Our Story, Why We Started, Privacy, and
Terms pages) — those mark every place the blueprint said not to invent
content (founder bios, the name/logo story, legally reviewed Privacy
Policy and Terms text, etc.).

## 7. Connecting the real backend (v3.1.0)

Right now, `src/lib/mock-api.ts` fakes every backend call (login, OTP
verification, session creation, sending a chat message, feedback, reviews,
contact). Once you share the actual API contract for
`https://api.maitrimoon.com` (endpoints, request/response shapes, and the
auth headers it expects for phone OTP / email login), each function in that
file gets replaced with a real `fetch()` call — the rest of the app calls
these functions by name and mostly won't need to change.

Two things worth deciding before that step:
- Whether the website and WhatsApp should share one account/conversation
  history (blueprint section 15) — this affects how login should work.
- Where secrets/API keys will live — never put them directly in frontend
  code; they belong in server-side environment variables (e.g. Next.js
  [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
  acting as a secure proxy to your Python API).

## 8. Connecting Instagram (@maitrymoon)

The homepage has an Instagram section (`src/components/public/InstagramSection.tsx`)
that's built and ready, but **not connected yet**. Until it is, the section
still appears — with a "Follow @maitrymoon on Instagram" card instead of a
real grid, never fake or sample posts. It's built to show your latest
**Reels only** (not regular photo posts) — the API route filters for
`media_product_type: "REELS"` server-side. Instagram doesn't allow pulling
another account's posts without official setup, so here's exactly what's
needed:

**Option A — do it yourself with Meta's official Graph API (free, more setup):**

1. `@maitrymoon` must be an Instagram **Professional** account (Business or
   Creator) — Settings → Account type in the Instagram app.
2. It must be linked to a **Facebook Page** (Instagram Settings → Linked
   Accounts).
3. Create a Meta App at [developers.facebook.com](https://developers.facebook.com/apps),
   add the "Instagram Graph API" product.
4. Generate a long-lived access token with the `instagram_basic` permission
   for that Page (Meta's Graph API Explorer is the easiest way to start).
5. Find your Instagram **Business Account ID** (a number, not `@maitrymoon`)
   — the Graph API Explorer can look this up from the linked Page.
6. Create a file named `.env.local` in this project (copy `.env.example`)
   and fill in:
   ```
   INSTAGRAM_ACCESS_TOKEN=your_long_lived_token
   INSTAGRAM_BUSINESS_ACCOUNT_ID=your_numeric_id
   ```
7. Restart `npm run dev` — the section will appear automatically once both
   values are set and valid.

**Important:** long-lived tokens expire after ~60 days and need refreshing.
For a "set it and forget it" feed, you'd want a small scheduled job
refreshing the token before it expires — ask me and I can build that once
you're at this step.

**Option B — a reputable feed widget (simpler, usually free tier + paid tiers):**
Services like Behold.so, SnapWidget, or LightWidget handle the Instagram
connection and token refresh for you, and give you a small embeddable
widget or JSON endpoint. If you'd rather not manage Meta API tokens
yourself, tell me which provider you'd like to use and I'll wire
`InstagramSection.tsx` to pull from it instead — usually less setup than
Option A.

Until either is configured, the section shows the "Follow @maitrymoon on
Instagram" fallback card — it will never show fake or sample posts.

## 9. Deploying to your Oracle VPS

On the VPS, with Node.js installed:

```
npm install
npm run build
npm run start
```

`npm run start` serves the production build (by default on port 3000).
You'll typically put a reverse proxy (e.g. Nginx) in front of it to handle
your domain and HTTPS certificate — happy to walk through that setup once
you're ready for it.
