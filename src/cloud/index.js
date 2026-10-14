import { firebaseConfig, useEmulator } from './config.js';
import { RecordSync } from './sync.js';

/** Whether this build has a Firebase config. Without one, the sign-in entry is not shown */
export const cloudAvailable = firebaseConfig !== null;

/** Call after the first screen is shown. Loads the Firebase code as a separate chunk and starts checking the sign-in state */
export async function startCloud(hooks) {
  if (!firebaseConfig) return null;
  const { createFirebase } = await import('./firebase.js');
  const { remote, auth } = createFirebase(firebaseConfig, useEmulator);
  const sync = new RecordSync(remote, auth, hooks);
  sync.start();
  // Send pending records before the page is hidden and when the connection comes back
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') void sync.flush();
  });
  window.addEventListener('online', () => void sync.flush());
  return sync;
}
