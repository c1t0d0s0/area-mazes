const STORAGE_KEY_PROGRESS = 'area_mazes_progress_v1';
const STORAGE_KEY_CUSTOM = 'area_mazes_custom_levels_v1';
// Whether the user was signed in last time. Used right after page load, before the sign-in check
// finishes, so that guest progress is not flashed to a signed-in user (holds no progress itself).
const STORAGE_KEY_SIGNED_IN = 'area_mazes_signed_in';
// What the monkey wears while signed out: { outfit: [item ids], at: time it was chosen }
const STORAGE_KEY_OUTFIT = 'area_mazes_outfit_v1';

export class Storage {
  static getProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_PROGRESS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.warn('Failed to load progress from localStorage', e);
      return {};
    }
  }

  static saveLevelProgress(levelId, { stars = 3, timeSeconds = 0, hintsUsed = 0 }) {
    const progress = this.getProgress();
    const existing = progress[levelId] || { stars: 0, timeSeconds: Infinity, hintsUsed: 0 };

    progress[levelId] = {
      completed: true,
      stars: Math.max(existing.stars, stars),
      bestTime: Math.min(existing.bestTime || Infinity, timeSeconds),
      hintsUsed,
      updatedAt: Date.now()
    };

    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.warn('Failed to save progress to localStorage', e);
    }
  }

  // Remove the given levels from local progress (after they were moved to the signed-in account)
  static clearLevelProgress(levelIds) {
    const progress = this.getProgress();
    levelIds.forEach(id => delete progress[id]);
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.warn('Failed to clear progress in localStorage', e);
    }
  }

  static getOutfit() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_OUTFIT);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  static saveOutfit(settings) {
    try {
      if (settings) localStorage.setItem(STORAGE_KEY_OUTFIT, JSON.stringify(settings));
      else localStorage.removeItem(STORAGE_KEY_OUTFIT);
    } catch (e) {
      console.warn('Failed to save outfit to localStorage', e);
    }
  }

  static wasSignedIn() {
    try {
      return localStorage.getItem(STORAGE_KEY_SIGNED_IN) === '1';
    } catch (e) {
      return false;
    }
  }

  static rememberSignedIn(signedIn) {
    try {
      if (signedIn) localStorage.setItem(STORAGE_KEY_SIGNED_IN, '1');
      else localStorage.removeItem(STORAGE_KEY_SIGNED_IN);
    } catch (e) {}
  }

  static getCustomLevels() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_CUSTOM);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  static saveCustomLevel(levelModel) {
    const custom = this.getCustomLevels();
    const json = levelModel.toJSON();
    const index = custom.findIndex(l => l.id === json.id);
    if (index >= 0) {
      custom[index] = json;
    } else {
      custom.push(json);
    }
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM, JSON.stringify(custom));
    } catch (e) {
      console.warn('Failed to save custom level', e);
    }
  }

  static deleteCustomLevel(id) {
    let custom = this.getCustomLevels();
    custom = custom.filter(l => l.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM, JSON.stringify(custom));
    } catch (e) {}
  }
}
