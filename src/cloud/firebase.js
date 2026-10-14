// Everything that touches Firebase lives in this file.
// It is loaded after the first screen is shown, so players who never sign in do not pay for it.
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  collection,
  connectFirestoreEmulator,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore/lite';
import { APP_ID, SCHEMA, fromProgressDoc, toAppDoc, toProgressDoc } from './records.js';

export function createFirebase(config, emulator) {
  const app = initializeApp(config);
  const auth = getAuth(app);
  const db = getFirestore(app);
  if (emulator) {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
  }

  // users/{uid}/apps/{appId} and, below it, progress/{level id}
  const userRef = uid => doc(db, 'users', uid);
  const appRef = uid => doc(db, 'users', uid, 'apps', APP_ID);
  const progressCol = uid => collection(db, 'users', uid, 'apps', APP_ID, 'progress');
  const progressRef = (uid, id) => doc(db, 'users', uid, 'apps', APP_ID, 'progress', id);

  const remote = {
    async loadAll(uid) {
      const [summary, docs] = await Promise.all([getDoc(appRef(uid)), getDocs(progressCol(uid))]);
      const records = {};
      docs.forEach((d) => {
        const record = fromProgressDoc(d.data());
        if (record) records[d.id] = record;
      });
      return { exists: summary.exists(), records };
    },
    async loadRecord(uid, id) {
      const snap = await getDoc(progressRef(uid, id));
      return snap.exists() ? fromProgressDoc(snap.data()) : null;
    },
    /** Create the user document and the per-app summary (once, on the first sign-in) */
    async saveApp(uid) {
      const now = Date.now();
      // User document (shared by all apps). No name or email address is stored
      const user = await getDoc(userRef(uid));
      await setDoc(userRef(uid), { schema: SCHEMA, updatedAt: now, ...(user.exists() ? {} : { createdAt: now }) }, { merge: true });
      await setDoc(appRef(uid), toAppDoc(now));
    },
    async saveRecord(uid, id, record) {
      await setDoc(progressRef(uid, id), toProgressDoc(record, Date.now()));
    },
  };

  const authPort = {
    onUser(cb) {
      onAuthStateChanged(auth, user => cb(user ? user.uid : null));
    },
    async signIn() {
      // The emulator has no real Google sign-in screen, so tests can choose who to sign in as
      // (window.__testUser). Never used in production builds, where emulator is false
      if (emulator && window.__testUser) {
        const sub = window.__testUser;
        const token = JSON.stringify({ sub, email: `${sub}@example.com`, email_verified: true });
        await signInWithCredential(auth, GoogleAuthProvider.credential(token));
        return;
      }
      await signInWithPopup(auth, new GoogleAuthProvider());
    },
    async signOut() {
      await signOut(auth);
    },
  };

  return { remote, auth: authPort };
}
