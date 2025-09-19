import { convex } from "./convexClient";
import { upsertUserProfile } from "../../convex/_generated/api";

export async function syncUserProfile(firebaseUser) {
  if (!firebaseUser || typeof firebaseUser !== 'object') {
    console.warn('syncUserProfile: Invalid firebaseUser object:', firebaseUser);
      // Convex sync removed. This file is deprecated.
    return;
  }
  const profile = {
    uid: firebaseUser.uid || null,
    displayName: firebaseUser.displayName || firebaseUser.userName || null,
    email: firebaseUser.email || null,
    bio: firebaseUser.bio || null,
    photoURL: firebaseUser.photoURL || firebaseUser.profile_image || null,
    preferences: firebaseUser.preferences || null,
    createdAt: firebaseUser.createdAt || Date.now(),
  };
  try {
      // Convex sync removed. This file is deprecated.
  } catch (err) {
    console.error('Convex user profile sync failed:', err);
  }
}
