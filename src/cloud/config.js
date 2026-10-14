/* global __FIREBASE_CONFIG__, __FIREBASE_EMULATOR__ */

/**
  * Firebase config, injected at build time from config.js or environment variables (vite.config.js).
  * null when not configured: the sign-in entry is hidden and no Firebase code is loaded.
 */
export const firebaseConfig = typeof __FIREBASE_CONFIG__ !== 'undefined' && __FIREBASE_CONFIG__ ? __FIREBASE_CONFIG__ : null;

/** Whether to connect to the local Firebase emulators (development and testing) */
export const useEmulator = typeof __FIREBASE_EMULATOR__ !== 'undefined' && __FIREBASE_EMULATOR__ === true;
