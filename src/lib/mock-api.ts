// ============================================================================
// MOCK BACKEND LAYER — NOT CONNECTED TO THE REAL mAItrymoon API (v3.1.0).
// ----------------------------------------------------------------------------
// Every function here simulates a network call with a short delay and
// returns fake data so the full product experience can be built, clicked
// through, and reviewed before the real backend contract is available.
//
// When the real API spec is provided, replace the bodies of these functions
// with real `fetch()` calls to https://api.maitrimoon.com — keep the same
// function names/signatures where possible so the UI code barely has to
// change. Nothing here should ever be treated as real user data.
// ============================================================================

import type { ChatMessage, CounsellingSession, SessionType } from "./types";

const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

// ---- Auth (mock) ----------------------------------------------------------

/** Simulates requesting an OTP for a phone number. Always "succeeds". */
export async function mockRequestPhoneOtp(phone: string) {
  await delay();
  if (!phone || phone.replace(/\D/g, "").length < 8) {
    throw new Error("Enter a valid phone number.");
  }
  return { sent: true };
}

/** Simulates verifying an OTP. Code "000000" simulates an invalid code, "111111" an expired one. */
export async function mockVerifyPhoneOtp(phone: string, code: string) {
  await delay();
  if (code === "000000") throw new Error("That code isn't right. Please try again.");
  if (code === "111111") throw new Error("This code has expired. Request a new one.");
  if (code.length !== 6) throw new Error("Enter the 6-digit code sent to your phone.");
  return {
    id: `user_${btoa(phone).slice(0, 10)}`,
    identifier: phone,
    method: "phone" as const,
  };
}

/** Simulates an email magic-link / OTP style login. */
export async function mockRequestEmailLogin(email: string) {
  await delay();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Enter a valid email address.");
  }
  return { sent: true };
}

export async function mockVerifyEmailCode(email: string, code: string) {
  await delay();
  if (code === "000000") throw new Error("That code isn't right. Please try again.");
  if (code.length !== 6) throw new Error("Enter the 6-digit code sent to your email.");
  return {
    id: `user_${btoa(email).slice(0, 10)}`,
    identifier: email,
    method: "email" as const,
  };
}

// ---- Consent / onboarding --------------------------------------------------

export async function mockSubmitConsent(_userId: string) {
  await delay(400);
  return { hasCompletedConsent: true };
}

// ---- Sessions ---------------------------------------------------------------

export async function mockCreateSession(
  type: SessionType,
  referralCode?: string
): Promise<CounsellingSession> {
  await delay(700);
  if (referralCode && referralCode.trim() && referralCode.trim().toUpperCase() !== "MAITRY5") {
    throw new Error("That referral code isn't valid or has expired.");
  }
  return {
    id: `sess_${Math.random().toString(36).slice(2, 10)}`,
    type,
    status: "active",
    createdAt: new Date().toISOString(),
    partnerCode:
      type === "partner" ? Math.random().toString(36).slice(2, 8).toUpperCase() : undefined,
  };
}

// ---- Chat ---------------------------------------------------------------

const MOCK_REPLIES = [
  "Thank you for sharing that. Can you tell me a little more about what happened right before this started?",
  "That sounds difficult to sit with. When your partner said that, what do you think they were feeling in that moment?",
  "It's understandable to feel that way. What would it look like if this conversation had gone the way you needed it to?",
  "I hear two things here — what was said, and how it landed. Which one feels more important to work through right now?",
  "That's a really honest reflection. Is this a pattern you've noticed before, or does this feel different?",
];

export async function mockSendMessage(
  _sessionId: string,
  _text: string
): Promise<ChatMessage> {
  await delay(900);
  const reply = MOCK_REPLIES[Math.floor(Math.random() * MOCK_REPLIES.length)];
  return {
    id: `msg_${Math.random().toString(36).slice(2, 10)}`,
    sender: "ai",
    text: reply,
    sentAt: new Date().toISOString(),
  };
}

// ---- Feedback / Reviews ---------------------------------------------------

export async function mockSubmitFeedback(_payload: Record<string, unknown>) {
  await delay(500);
  return { received: true };
}

export async function mockSubmitReview(_payload: Record<string, unknown>) {
  await delay(500);
  return { received: true, pendingModeration: true };
}

export async function mockSubmitContact(_payload: Record<string, unknown>) {
  await delay(500);
  return { received: true };
}
