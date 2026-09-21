// Shared types for the mAItrymoon product layer, matching the real backend
// contract in "MaitryMoon Web Application: Frontend Technical Integration
// Specification" (v1.0.0, backend API v3.1.0).

export type SessionType = "individual" | "partner";

/** Response shape of POST /api/v1/auth/sync and the user fields we keep in AuthContext. */
export interface AuthUser {
  userId: string;
  uid: string;
  email: string | null;
  phoneNumber: string | null;
  isOnboarded: boolean;
  availableSessions: number;
  linkedWhatsapp: boolean;
}

/** Response shape of GET /api/v1/user/profile ("My Plans"). */
export interface UserProfile {
  userId: string;
  uid: string;
  isOnboarded: boolean;
  availableSessions: number;
  subscriptionPlanId: string;
  subscriptionExpiry: string | null;
  activeIndividualSessionId: string | null;
  activePartnerSessionId: string | null;
}

export interface ConsentPayload {
  privacyConsent: "yes";
  ageConsent: "18+";
  marketingConsent: "yes" | "no";
  referralCode?: string;
}

export interface CounsellingSession {
  id: string;
  type: SessionType;
  status: "created" | "resumed" | "active";
  welcomeMessage?: string;
  availableSessions?: number;
  partnerCode?: string;
  partnerInviteUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  sentAt: string;
}

export interface SendMessageResult {
  reply: string;
  turnCount: number;
  maxTurns: number;
}

export interface SendVoiceResult extends SendMessageResult {
  transcription: string;
}

export interface PartnerInvite {
  sessionId: string;
  joinCode: string;
  inviteUrl: string;
}

export interface SessionVerdict {
  verdictReady: boolean;
  summary?: string;
  recommendations?: string[];
  verdictPercentage?: number;
}
