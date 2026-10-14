// Configuration template for local development
// Copy this file to config.js and set your Google Analytics (GA4) or GTM measurement ID:
window.GTM_ID = 'G-XXXXXXXXXX';

// Firebase web app config. Set all four to enable Google sign-in and saving progress to Firestore.
// Leave them empty to hide the sign-in entry and keep progress in the browser (localStorage) only.
// These values are read at build time, so restart `npm run dev` / re-run `npm run build` after changing them.
// They are safe to expose publicly (progress is protected by firestore.rules).
window.FIREBASE_API_KEY = '';
window.FIREBASE_AUTH_DOMAIN = '';
window.FIREBASE_PROJECT_ID = '';
window.FIREBASE_APP_ID = '';
