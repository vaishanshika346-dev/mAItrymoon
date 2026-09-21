// Shared types for the mock product layer.
// These shapes are OUR BEST GUESS for the UI only — once the real v3.1.0
// backend contract is shared, these should be replaced/reconciled with the
// actual API's request/response types. See Task 5 "Wire real Python API
// backend" for where this gets swapped out.

export type AuthMethod = "phone" | "email";

export interface MockUser {
  id: string;
  identifier: string; // phone number or email used to log in
  method: AuthMethod;
  hasCompletedConsent: boolean;
  createdAt: string;
}

export type SessionType = "individual" | "partner";

export interface CounsellingSession {
  id: string;
  type: SessionType;
  status: "active" | "completed" | "expired";
  createdAt: string;
  partnerCode?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  sentAt: string;
}
