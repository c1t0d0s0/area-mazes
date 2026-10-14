import { hasRecords, mergeRecord, mergeRecords, sameRecord } from './records.js';

/**
  * Saves the signed-in player's records to Firestore (same mechanism as src/cloud/sync.js in Math Challenge).
 *
  * - While signed in, records are not written to localStorage; they live in this class and in Firestore
  * - On sign-in the Firestore records are loaded and (if the player agrees) merged with the guest records on this device
  * - A new record is merged with the one in Firestore before writing (so other devices' records are not lost)
  * - If sending fails, it is retried later
 *
  * remote: talks to Firestore. Replaced by an in-memory stand-in for testing
  *   loadAll(uid)            → { exists: whether the app summary exists, records }
  *   loadRecord(uid, id)     → record | null
  *   saveApp(uid)            create the user document and the per-app summary
 *   saveRecord(uid, id, record)
  * auth: sign-in plumbing
  *   onUser(cb)  calls cb(uid | null) when the sign-in state becomes known or changes
 *   signIn() / signOut()
 * hooks:
  *   onStatus(sync)           the displayed state (signed in? saved?) changed
  *   onRecords(records, sync) the records to show changed. null after sign-out (show the guest records)
  *   askMigrate()             on sign-in there were guest records on this device: move them to the account?
  *   readGuest() → records / clearGuest()  the guest records on this device
 *
 * status:
  *   loading: checking whether the player is signed in
  *   signed-out: not signed in (records stay on this device)
  *   syncing: sending to / loading from Firestore
  *   synced: in step with Firestore
  *   offline: some records could not be sent (sent once the connection is back)
 */
export class RecordSync {
  constructor(remote, auth, hooks, opts = {}) {
    this.remote = remote;
    this.auth = auth;
    this.hooks = hooks;
    this.retryMs = opts.retryMs ?? 15000;

    this.uid = null;
    this.status = 'loading';
    /** Records of the signed-in player */
    this.records = {};
    /** Whether the Firestore records have been loaded since sign-in */
    this.loaded = false;

    this.dirty = new Set();
    this.timer = null;
    this.chain = Promise.resolve();
    this.interactive = false;
    this.needsFull = false;
    this.migrate = false;
  }

  start() {
    this.auth.onUser((uid) => {
      void this.enqueue(() => this.handleUser(uid));
    });
  }

  /** Sign-in from the button. Only sign-ins started here ask whether to move the guest records */
  async signIn() {
    this.interactive = true;
    try {
      await this.auth.signIn();
    } catch (err) {
      this.interactive = false;
      throw err;
    }
  }

  /** A new record while signed in: remember it and send it to Firestore */
  submit(id, record) {
    if (this.uid === null) return;
    const merged = mergeRecord(this.records[id], record);
    if (!merged) return;
    this.records[id] = merged;
    this.dirty.add(id);
    this.setStatus('syncing');
    void this.enqueue(() => this.push());
  }

  /** Whether some records have not reached Firestore yet */
  hasPending() {
    return this.uid !== null && (this.dirty.size > 0 || this.needsFull);
  }

  /** Send pending records right now */
  flush() {
    this.clearTimer();
    return this.enqueue(() => this.push());
  }

  /**
      * Sign out. With unsent records, refuses and returns 'unsynced' unless force is set
      * (records made while signed in are not kept on the device, so the unsent ones would be lost).
   */
  async signOut(force = false) {
    await this.flush();
    if (this.hasPending() && !force) return 'unsynced';
    await this.auth.signOut();
    return 'ok';
  }

  // ---- Internals ----

  /** Run jobs one at a time so they never overlap */
  enqueue(job) {
    this.chain = this.chain.then(job, job);
    return this.chain;
  }

  setStatus(status) {
    if (this.status === status) return;
    this.status = status;
    this.hooks.onStatus(this);
  }

  clearTimer() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
  }

  schedule(ms) {
    this.clearTimer();
    this.timer = setTimeout(() => {
      this.timer = null;
      void this.enqueue(() => this.push());
    }, ms);
  }

  async handleUser(uid) {
    if (uid === null) {
      // Signed out (or was never signed in): go back to the guest records
      this.clearTimer();
      this.dirty.clear();
      this.needsFull = false;
      this.interactive = false;
      this.migrate = false;
      this.uid = null;
      this.records = {};
      this.loaded = false;
      this.hooks.onRecords(null, this);
      this.setStatus('signed-out');
      return;
    }
    if (uid === this.uid) return;

    // If this device has guest records, ask whether to move them (only for sign-ins from the button)
    const guest = this.hooks.readGuest();
    this.migrate = this.interactive && hasRecords(guest) && (await this.hooks.askMigrate());
    this.interactive = false;

    this.uid = uid;
    this.records = this.migrate ? mergeRecords(guest, {}) : {};
    this.loaded = false;
    this.dirty.clear();
    this.needsFull = true;
    this.hooks.onRecords(this.records, this);
    await this.push();
  }

  async push() {
    const uid = this.uid;
    if (uid === null || !this.hasPending()) return;
    this.setStatus('syncing');
    const ids = [...this.dirty];
    this.dirty.clear();
    try {
      if (this.needsFull) await this.fullSync(uid);
      else await this.sendChanges(uid, ids);
      if (this.uid !== uid) return; // signed out while sending
      this.setStatus(this.hasPending() ? 'syncing' : 'synced');
    } catch {
      if (this.uid !== uid) return;
      // Remember what could not be sent so that it is sent again
      for (const id of ids) this.dirty.add(id);
      this.setStatus('offline');
      this.schedule(this.retryMs);
    }
  }

  /** Load every record from Firestore and merge with the local ones (once, right after sign-in) */
  async fullSync(uid) {
    const remote = await this.remote.loadAll(uid);
    if (this.uid !== uid) return;

    // Records made while loading are already in this.records, so they are merged too
    const merged = mergeRecords(remote.records, this.records);
    if (!remote.exists) await this.remote.saveApp(uid);
    for (const [id, record] of Object.entries(merged)) {
      if (!sameRecord(remote.records[id], record)) await this.remote.saveRecord(uid, id, record);
    }
    if (this.uid !== uid) return;

    // Clear the guest records only after they are safely in Firestore (so they are never moved twice)
    if (this.migrate) {
      this.hooks.clearGuest();
      this.migrate = false;
    }
    this.records = mergeRecords(merged, this.records);
    this.needsFull = false;
    this.loaded = true;
    this.hooks.onStatus(this);
    this.hooks.onRecords(this.records, this);
  }

  /** Send only the changed records, merged with what other devices saved */
  async sendChanges(uid, ids) {
    let changed = false;
    for (const id of ids) {
      const theirs = await this.remote.loadRecord(uid, id);
      if (this.uid !== uid) return;
      const best = mergeRecord(theirs, this.records[id]);
      if (!best) continue;
      if (!sameRecord(best, this.records[id])) {
        this.records[id] = best;
        changed = true;
      }
      if (!sameRecord(theirs, best)) await this.remote.saveRecord(uid, id, best);
    }
    if (changed && this.uid === uid) this.hooks.onRecords(this.records, this);
  }
}
