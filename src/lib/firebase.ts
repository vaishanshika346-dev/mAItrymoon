// ============================================================================
// Firebase client setup — used for the real login flow (Google Sign-In +
// Phone OTP), per the "MaitryMoon Frontend Integration Specification" v1.0.0.
//
// The actual project values (apiKey, authDomain, etc.) come from your
// Firebase project settings — DevOps / whoever owns the `maitrimoon-prod`
// Firebase project can hand you these. Put them in a `.env.local` file at
// the project root (see `.env.local.example`), NOT directly in this file,
// so real keys never get committed to git.
//
// Note: Firebase web API keys are meant to be public (they identify your
// project, not a secret credential) — actual security comes from Firebase
// Auth + your backend verifying the idToken — but keeping them in env vars
// still makes it easy to use different Firebase projects for dev/staging/
// prod without editing code.
// ============================================================================

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** True once real Firebase config values have been supplied via env vars. */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

let app: FirebaseApp | undefined;
let auth: Auth | undefined;

// Only initialize in the browser, and only once (Next.js can re-run this
// module during hot reload / multiple imports).
if (typeof window !== "undefined" && isFirebaseConfigured) {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  auth = getAuth(app);
}

export { app as firebaseApp, auth as firebaseAuth };
