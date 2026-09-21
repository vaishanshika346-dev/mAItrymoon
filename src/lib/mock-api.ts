// ============================================================================
// MOCK LAYER — for the parts of the product NOT yet covered by the real
// backend integration spec (feedback, reviews, contact form). Login,
// consent, sessions and chat now use the real API (see src/lib/api.ts) and
// Firebase Auth (see src/lib/firebase.ts) — this file no longer mocks them.
// ============================================================================

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

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
