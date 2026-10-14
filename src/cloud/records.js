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

/** Per-app summary. Carries the shared fields (this app does not use their contents) */
export function toAppDoc(now) {
  return { schema: SCHEMA, updatedAt: now, activeDays: [], completed: [], inventory: {}, spent: {}, settings: {} };
}

export function toProgressDoc(record, now) {
  return { schema: SCHEMA, updatedAt: now, status: 'done', data: clean(record) };
}

/** Data read from Firestore may be malformed, so validate it on the way back */
export function fromProgressDoc(doc) {
  return clean(doc?.data);
}
