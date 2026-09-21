"use client";

// ============================================================================
// MOCK AUTH CONTEXT — client-side only, persisted to localStorage.
// ----------------------------------------------------------------------------
// This stands in for real session/auth state that should come from the
// Python backend (v3.1.0). Once that's wired up (Task 5), this should be
// replaced by real session cookies/tokens issued by the backend, validated
// server-side (e.g. in Next.js middleware) rather than trusted from the
// browser. Do NOT treat this as secure — it is a UI convenience only.
// ============================================================================

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CounsellingSession, MockUser } from "./types";

const STORAGE_KEY = "maitrymoon_mock_auth_v1";

interface AuthState {
  user: MockUser | null;
  activeSession: CounsellingSession | null;
}

interface AuthContextValue extends AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  loginAs: (user: MockUser) => void;
  completeConsent: () => void;
  setActiveSession: (session: CounsellingSession | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, activeSession: null });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persist = useCallback((next: AuthState) => {
    setState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // best-effort only
    }
  }, []);

  const loginAs = useCallback(
    (user: MockUser) => persist({ ...state, user }),
    [state, persist]
  );

  const completeConsent = useCallback(() => {
    if (!state.user) return;
    persist({ ...state, user: { ...state.user, hasCompletedConsent: true } });
  }, [state, persist]);

  const setActiveSession = useCallback(
    (session: CounsellingSession | null) => persist({ ...state, activeSession: session }),
    [state, persist]
  );

  const logout = useCallback(() => {
    persist({ user: null, activeSession: null });
  }, [persist]);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      isAuthenticated: !!state.user,
      isLoading,
      loginAs,
      completeConsent,
      setActiveSession,
      logout,
    }),
    [state, isLoading, loginAs, completeConsent, setActiveSession, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
