const STORAGE_KEY_PROGRESS = 'area_mazes_progress_v1';
const STORAGE_KEY_CUSTOM = 'area_mazes_custom_levels_v1';

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
