"use client";

// ============================================================================
// REAL AUTH CONTEXT — Firebase Authentication (client) + mAItrymoon backend
// sync (v3.1.0), per the Frontend Integration Specification.
//
// Flow: Firebase handles identity (Google Sign-In / Phone OTP) and hands us
// a short-lived idToken. Every backend call forwards that idToken as a
// Bearer header; the backend is the source of truth for onboarding status,
// plan and session credits (`AuthUser` below), not anything stored locally.
// ============================================================================

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { onAuthStateChanged, signOut, type User as FirebaseUser } from "firebase/auth";
import { firebaseAuth, isFirebaseConfigured } from "./firebase";
import { authSync } from "./api";
import type { AuthUser, CounsellingSession } from "./types";

interface AuthContextValue {
  /** The raw Firebase user (null if signed out). */
  firebaseUser: FirebaseUser | null;
  /** The backend's view of this user (onboarding status, plan, credits). */
  user: AuthUser | null;
  activeSession: CounsellingSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  /** True once real Firebase env vars are configured (see .env.local.example). */
  isConfigured: boolean;
  /** Fresh Firebase idToken for an API call — refreshes automatically if stale. */
  getIdToken: () => Promise<string | null>;
  /** Re-runs /auth/sync to refresh is_onboarded / available_sessions from the backend. */
  refreshUser: () => Promise<AuthUser | null>;
  /** Locally patch fields we already know changed (e.g. right after consent), no refetch. */
  patchUser: (patch: Partial<AuthUser>) => void;
  setActiveSession: (session: CounsellingSession | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [activeSession, setActiveSession] = useState<CounsellingSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const syncingRef = useRef(false);

  const getIdToken = useCallback(async () => {
    if (!firebaseAuth?.currentUser) return null;
    try {
      return await firebaseAuth.currentUser.getIdToken();
    } catch {
      return null;
    }
  }, []);

  const syncWithBackend = useCallback(async (fbUser: FirebaseUser) => {
    if (syncingRef.current) return null;
    syncingRef.current = true;
    try {
      const idToken = await fbUser.getIdToken();
      const identifier = fbUser.phoneNumber || fbUser.email || fbUser.uid;
      const authUser = await authSync(idToken, identifier);
      setUser(authUser);
      return authUser;
    } catch {
      // Backend unreachable / rejected the token — leave `user` as-is so the
      // UI can show a retry rather than silently signing the person out.
      return null;
    } finally {
      syncingRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigured || !firebaseAuth) {
      setIsLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        await syncWithBackend(fbUser);
      } else {
        setUser(null);
        setActiveSession(null);
      }
      setIsLoading(false);
    });
    return unsubscribe;
  }, [syncWithBackend]);

  const refreshUser = useCallback(async () => {
    if (!firebaseUser) return null;
    return syncWithBackend(firebaseUser);
  }, [firebaseUser, syncWithBackend]);

  const patchUser = useCallback((patch: Partial<AuthUser>) => {
    setUser((u) => (u ? { ...u, ...patch } : u));
  }, []);

  const logout = useCallback(async () => {
    if (firebaseAuth) {
      try {
        await signOut(firebaseAuth);
      } catch {
        // ignore — we clear local state regardless
      }
    }
    setFirebaseUser(null);
    setUser(null);
    setActiveSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      firebaseUser,
      user,
      activeSession,
      isAuthenticated: !!firebaseUser && !!user,
      isLoading,
      isConfigured: isFirebaseConfigured,
      getIdToken,
      refreshUser,
      patchUser,
      setActiveSession,
      logout,
    }),
    [firebaseUser, user, activeSession, isLoading, getIdToken, refreshUser, patchUser, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
