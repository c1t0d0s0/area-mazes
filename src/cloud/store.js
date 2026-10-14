import { PRESET_PUZZLES } from '../engine/PresetPuzzles.js';
import { Storage } from '../utils/Storage.js';
import { t } from '../utils/i18n.js';
import { cloudAvailable, startCloud } from './index.js';
import { clean, mergeRecord } from './records.js';

// Reading and writing level progress.
// Signed out: progress is kept in this browser's localStorage (src/utils/Storage.js).
// Signed in with Google: nothing is written to localStorage; progress goes to Firestore (src/cloud/sync.js).
//
// Only progress on the preset levels is saved to the account.
// Custom and random puzzles exist only on this device, so their progress stays on this device too.

const PRESET_IDS = new Set(PRESET_PUZZLES.map(p => p.id));

/** State shown in the account box. See src/cloud/sync.js for the meaning of status */
export const account = {
  available: cloudAvailable,
  status: cloudAvailable ? 'loading' : 'signed-out',
  signedIn: false,
  // The signed-in player's progress has not been loaded yet (shown as "Loading…" meanwhile)
  loading: cloudAvailable && Storage.wasSignedIn(),
};

let sync = null;
// Progress made before the sign-in state was known. Stored in the right place once it is known
let early = {};
const listeners = new Set();

/** Called when progress or the account state changes. Call the returned function to unsubscribe */
export function onProgressChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

const emit = () => listeners.forEach(fn => fn());

/** Convert a local entry (Storage shape) to the record shape saved in the account */
const toRecord = entry => (entry?.completed ? clean({ stars: entry.stars, seconds: entry.bestTime }) : null);

function readGuest() {
  const records = {};
  for (const [id, entry] of Object.entries(Storage.getProgress())) {
    const record = PRESET_IDS.has(id) ? toRecord(entry) : null;
    if (record) records[id] = record;
  }
  return records;
}

/** Progress to show on screen: { [level id]: { completed, stars, bestTime } } */
export function getProgress() {
  if (account.loading) return {};
  if (!sync?.uid) return Storage.getProgress();
  const progress = {};
  for (const [id, record] of Object.entries(sync.records)) {
    progress[id] = { completed: true, stars: record.stars, bestTime: record.seconds };
  }
  return progress;
}

/** Still checking the sign-in state (the player was signed in last time) */
const undecided = () => account.status === 'loading' && account.loading;

export function saveLevelProgress(levelId, result) {
  const record = clean({ stars: result.stars, seconds: result.timeSeconds });
  if (!PRESET_IDS.has(levelId) || !record) {
    Storage.saveLevelProgress(levelId, result);
  } else if (sync?.uid) {
    sync.submit(levelId, record);
  } else if (undecided()) {
    early[levelId] = { result, record: mergeRecord(early[levelId]?.record, record) };
  } else {
    Storage.saveLevelProgress(levelId, result);
  }
  emit();
}

function flushEarly() {
  const pending = early;
  early = {};
  for (const [levelId, { result, record }] of Object.entries(pending)) {
    saveLevelProgress(levelId, { ...result, stars: record.stars, timeSeconds: record.seconds });
  }
}

function refreshAccount(current) {
  // May be called before startCloud() returns, so remember the instance passed in
  sync = current;
  account.status = sync.status;
  account.signedIn = sync.uid !== null;
  account.loading = sync.status === 'loading' ? account.loading : sync.uid !== null && !sync.loaded;
}

/** Call after the first screen is shown. Does nothing in builds without a Firebase config */
export async function startProgressSync() {
  await startCloud({
    onStatus(current) {
      refreshAccount(current);
      emit();
    },
    onRecords(records, current) {
      Storage.rememberSignedIn(records !== null);
      refreshAccount(current);
      // Store any progress made before the sign-in state was known
      flushEarly();
      emit();
    },
    askMigrate: () => window.confirm(t('askMigrate')),
    readGuest,
    clearGuest: () => Storage.clearLevelProgress([...PRESET_IDS]),
  });
}

export const signIn = () => sync.signIn();
export const signOut = force => sync.signOut(force);
