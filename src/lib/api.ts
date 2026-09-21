// ============================================================================
// REAL BACKEND API CLIENT — wired to the mAItrymoon Python backend (v3.1.0),
// per "MaitryMoon Web Application: Frontend Technical Integration
// Specification" (v1.0.0).
//
// Base URL comes from NEXT_PUBLIC_API_BASE_URL (see .env.local.example):
//   Production: https://api.maitrimoon.com
//   Staging:    http://155.248.243.31
//
// Every call needs a Firebase idToken (see src/lib/firebase.ts + auth-context)
// forwarded as `Authorization: Bearer <idToken>`, per section 2.3 of the spec.
// ============================================================================

import type {
  AuthUser,
  ConsentPayload,
  CounsellingSession,
  PartnerInvite,
  SendMessageResult,
  SendVoiceResult,
  SessionType,
  SessionVerdict,
  UserProfile,
} from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.maitrimoon.com";

/** Machine-readable error keys from section 6 of the spec ("Error Codes & Handling Guide"). */
export type ApiErrorKey =
  | "unauthorized"
  | "invalid_token"
  | "consent_required"
  | "payment_required"
  | "session_not_found"
  | "transcription_failed"
  | "unknown_error";

export class ApiError extends Error {
  status: number;
  errorKey: ApiErrorKey;

  constructor(status: number, errorKey: ApiErrorKey, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errorKey = errorKey;
  }
}

function errorKeyForStatus(status: number, bodyKey?: string): ApiErrorKey {
  if (bodyKey === "invalid_token") return "invalid_token";
  switch (status) {
    case 401:
      return "unauthorized";
    case 402:
      return "payment_required";
    case 403:
      return "consent_required";
    case 404:
      return "session_not_found";
    case 422:
      return "transcription_failed";
    default:
      return "unknown_error";
  }
}

interface RequestOptions {
  idToken: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  /** Pass a FormData body (voice upload) — skips JSON stringify + Content-Type. */
  formData?: FormData;
}

async function apiFetch<T>(path: string, opts: RequestOptions): Promise<T> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${opts.idToken}`,
    "X-Client-Channel": "web",
  };

  let body: BodyInit | undefined;
  if (opts.formData) {
    body = opts.formData; // browser sets multipart Content-Type + boundary itself
  } else if (opts.body !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(opts.body);
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method: opts.method || "GET",
      headers,
      body,
    });
  } catch {
    throw new ApiError(0, "unknown_error", "Couldn't reach the server. Check your connection and try again.");
  }

  let json: any = null;
  try {
    json = await res.json();
  } catch {
    // some endpoints may return an empty body on success
  }

  if (!res.ok) {
    const bodyKey = json?.error_key || json?.error;
    const message =
      json?.message ||
      json?.error ||
      "Something went wrong talking to the server. Please try again.";
    throw new ApiError(res.status, errorKeyForStatus(res.status, bodyKey), message);
  }

  return json as T;
}

// ---- 5.1 Auth sync ----------------------------------------------------------

export async function authSync(idToken: string, identifier: string): Promise<AuthUser> {
  const data = await apiFetch<any>("/api/v1/auth/sync", {
    idToken,
    method: "POST",
    body: { identifier },
  });
  return {
    userId: data.user_id,
    uid: data.uid,
    email: data.email ?? null,
    phoneNumber: data.phone_number ?? null,
    isOnboarded: Boolean(data.is_onboarded),
    availableSessions: data.available_sessions ?? 0,
    linkedWhatsapp: Boolean(data.linked_whatsapp),
  };
}

// ---- 5.2 User profile ("My Plans") ------------------------------------------

export async function getUserProfile(idToken: string): Promise<UserProfile> {
  const data = await apiFetch<any>("/api/v1/user/profile", { idToken });
  return {
    userId: data.user_id,
    uid: data.uid,
    isOnboarded: Boolean(data.is_onboarded),
    availableSessions: data.available_sessions ?? 0,
    subscriptionPlanId: data.subscription_plan_id,
    subscriptionExpiry: data.subscription_expiry ?? null,
    activeIndividualSessionId: data.active_individual_session_id ?? null,
    activePartnerSessionId: data.active_partner_session_id ?? null,
  };
}

// ---- 5.3 Submit consent -------------------------------------------------------

export async function submitConsent(
  idToken: string,
  payload: ConsentPayload
): Promise<{ isOnboarded: boolean; availableSessions: number }> {
  const data = await apiFetch<any>("/api/v1/user/consent", {
    idToken,
    method: "POST",
    body: {
      privacy_consent: payload.privacyConsent,
      age_consent: payload.ageConsent,
      marketing_consent: payload.marketingConsent,
      referral_code: payload.referralCode || "",
    },
  });
  return {
    isOnboarded: Boolean(data.is_onboarded),
    availableSessions: data.available_sessions ?? 0,
  };
}

// ---- 5.4 Start / resume session -----------------------------------------------

export async function createSession(
  idToken: string,
  mode: SessionType
): Promise<CounsellingSession> {
  const data = await apiFetch<any>("/api/v1/sessions", {
    idToken,
    method: "POST",
    body: { mode },
  });
  return {
    id: data.session_id,
    type: data.mode,
    status: data.status,
    welcomeMessage: data.welcome_message,
    availableSessions: data.available_sessions,
  };
}

// ---- 5.5 Send text message ------------------------------------------------------

export async function sendMessage(
  idToken: string,
  sessionId: string,
  message: string
): Promise<SendMessageResult> {
  const data = await apiFetch<any>(`/api/v1/sessions/${sessionId}/messages`, {
    idToken,
    method: "POST",
    body: { message },
  });
  return {
    reply: data.reply,
    turnCount: data.turn_count,
    maxTurns: data.max_turns,
  };
}

// ---- 5.6 Send voice note -----------------------------------------------------

export async function sendVoiceMessage(
  idToken: string,
  sessionId: string,
  audio: Blob
): Promise<SendVoiceResult> {
  const formData = new FormData();
  const ext = audio.type.includes("mp4") ? "mp4" : "webm";
  formData.append("audio", audio, `voice-note.${ext}`);

  const data = await apiFetch<any>(`/api/v1/sessions/${sessionId}/messages/audio`, {
    idToken,
    method: "POST",
    formData,
  });
  return {
    transcription: data.transcription,
    reply: data.reply,
    turnCount: data.turn_count,
    maxTurns: data.max_turns,
  };
}

// ---- 5.7 Partner invite ------------------------------------------------------

export async function partnerInvite(idToken: string, sessionId: string): Promise<PartnerInvite> {
  const data = await apiFetch<any>(`/api/v1/sessions/${sessionId}/partner/invite`, {
    idToken,
    method: "POST",
  });
  return {
    sessionId: data.session_id,
    joinCode: data.join_code,
    inviteUrl: data.invite_url,
  };
}

// ---- 5.8 Partner join ---------------------------------------------------------

export async function partnerJoin(
  idToken: string,
  joinCode: string
): Promise<{ sessionId: string; mode: SessionType }> {
  const data = await apiFetch<any>("/api/v1/sessions/partner/join", {
    idToken,
    method: "POST",
    body: { join_code: joinCode },
  });
  return { sessionId: data.session_id, mode: data.mode };
}

// ---- 5.9 Verdict --------------------------------------------------------------

export async function getVerdict(idToken: string, sessionId: string): Promise<SessionVerdict> {
  const data = await apiFetch<any>(`/api/v1/sessions/${sessionId}/verdict`, { idToken });
  return {
    verdictReady: Boolean(data.verdict_ready),
    summary: data.summary,
    recommendations: data.recommendations,
    verdictPercentage: data.verdict_percentage,
  };
}
