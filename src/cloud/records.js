// Shape of a record (cleared-level record) and how records from two places are merged.
// Independent of the UI and of Firebase, so it can be exercised with plain Node.
//
// One record: { stars: number of stars (1-3), seconds: best clear time (0 if unknown) }
// One player: { [level id]: record }

// ---- Firestore layout (shared with Math Challenge and Wordlynx) ----
//
//   users/{uid}                                User document (shared by all apps). No name or email address
//   users/{uid}/apps/{appId}                   Per-app summary. This app has nothing to put in it
//   users/{uid}/apps/{appId}/progress/{itemId} One record per item. In this app: one per cleared level
//
// The appId of this app is "area-mazes".

export const SCHEMA = 1;
export const APP_ID = 'area-mazes';

const validStars = v => Number.isInteger(v) && v >= 1 && v <= 3;
const validSeconds = v => (Number.isInteger(v) && v > 0 ? v : 0);

/** Keep only the known fields. Returns null if it does not look like a record */
export function clean(record) {
  if (!record || !validStars(record.stars)) return null;
  return { stars: record.stars, seconds: validSeconds(record.seconds) };
}

/**
  * Merge two records: the higher star count and the shorter clear time win.
  * Merging is idempotent, so retrying after a failed request never corrupts a record.
 */
export function mergeRecord(a, b) {
  const x = clean(a);
  const y = clean(b);
  if (!x || !y) return x ?? y;
  const times = [x.seconds, y.seconds].filter(s => s > 0);
  return { stars: Math.max(x.stars, y.stars), seconds: times.length ? Math.min(...times) : 0 };
}

export function sameRecord(a, b) {
  return !!a && !!b && a.stars === b.stars && a.seconds === b.seconds;
}

/** Merge the records from two places (mergeRecord per level) */
export function mergeRecords(a, b) {
  const out = {};
  for (const id of [...new Set([...Object.keys(a), ...Object.keys(b)])].sort()) {
    const best = mergeRecord(a[id], b[id]);
    if (best) out[id] = best;
  }
  return out;
}

export function hasRecords(records) {
  return Object.keys(records).length > 0;
}

// ---- Settings: what the squirrel monkey wears ----
// { outfit: [item ids] | null, at: time it was chosen (0 if never) }. Kept in the app summary's `settings`.

export const emptySettings = () => ({ outfit: null, at: 0 });

/** Data read from storage or Firestore may be malformed, so validate it */
export function cleanSettings(raw) {
  const s = raw || {};
  return {
    outfit: Array.isArray(s.outfit) ? [...new Set(s.outfit.filter(id => typeof id === 'string' && /^[a-z]{1,20}$/.test(id)))].slice(0, 8) : null,
    at: typeof s.at === 'number' && s.at > 0 ? s.at : 0
  };
}

/** The newer choice wins (the same result whichever order they are merged in) */
export function mergeSettings(a, b) {
  const x = cleanSettings(a);
  const y = cleanSettings(b);
  if (x.at !== y.at) return x.at > y.at ? x : y;
  return JSON.stringify(x) <= JSON.stringify(y) ? x : y;
}

export const sameSettings = (a, b) => JSON.stringify(cleanSettings(a)) === JSON.stringify(cleanSettings(b));

/** Per-app summary. Carries the shared fields; this app only uses `settings` */
export function toAppDoc(now, settings) {
  return { schema: SCHEMA, updatedAt: now, activeDays: [], completed: [], inventory: {}, spent: {}, settings: cleanSettings(settings) };
}

export const fromAppDoc = doc => cleanSettings(doc && doc.settings);

export function toProgressDoc(record, now) {
  return { schema: SCHEMA, updatedAt: now, status: 'done', data: clean(record) };
}

/** Data read from Firestore may be malformed, so validate it on the way back */
export function fromProgressDoc(doc) {
  return clean(doc?.data);
}
