import { PRESET_PUZZLES } from '../engine/PresetPuzzles.js';
import { Storage } from '../utils/Storage.js';
import { sounds } from '../utils/SoundManager.js';

export class LevelSelectView {
  constructor(containerEl, { onSelectLevel, onQuickPlay, onOpenEditor }) {
    this.container = containerEl;
    this.onSelectLevel = onSelectLevel;
    this.onQuickPlay = onQuickPlay;
    this.onOpenEditor = onOpenEditor;
    this.activeFilter = 'All';
  }

  render() {
    const progress = Storage.getProgress();
    const customLevels = Storage.getCustomLevels();

    const filteredPresets = this.activeFilter === 'All' 
      ? PRESET_PUZZLES 
      : PRESET_PUZZLES.filter(p => p.difficulty === this.activeFilter);

    let html = `
      <div class="level-select-view">
        <header class="select-header">
          <div class="header-branding">
            <h1>📐 AREA MAZES</h1>
            <p>面積迷路 - ひらめきと整数の幾何学パズル</p>
          </div>
          <div class="header-actions">
            <button class="btn-action-hero btn-random">
              🎲 ランダム問題自動生成
            </button>
            <button class="btn-action-hero btn-editor">
              ✏️ パズル自作エディター
            </button>
          </div>
        </header>

        <nav class="filter-nav">
          <button class="filter-tab ${this.activeFilter === 'All' ? 'active' : ''}" data-diff="All">すべて (${PRESET_PUZZLES.length})</button>
          <button class="filter-tab ${this.activeFilter === 'Easy' ? 'active' : ''}" data-diff="Easy">入門 (Easy)</button>
          <button class="filter-tab ${this.activeFilter === 'Medium' ? 'active' : ''}" data-diff="Medium">初級 (Medium)</button>
          <button class="filter-tab ${this.activeFilter === 'Hard' ? 'active' : ''}" data-diff="Hard">中級 (Hard)</button>
          <button class="filter-tab ${this.activeFilter === 'Expert' ? 'active' : ''}" data-diff="Expert">上級 (Expert)</button>
          <button class="filter-tab ${this.activeFilter === 'Grandmaster' ? 'active' : ''}" data-diff="Grandmaster">達人 (Grandmaster)</button>
        </nav>

        <section class="levels-grid">
    `;

    filteredPresets.forEach(level => {
      const pData = progress[level.id] || {};
      const isCompleted = pData.completed;
      const stars = pData.stars || 0;

      html += `
        <div class="level-card ${isCompleted ? 'completed' : ''}" data-id="${level.id}">
          <div class="level-card-header">
            <span class="badge badge-${level.difficulty.toLowerCase()}">${level.difficulty}</span>
            ${isCompleted ? '<span class="complete-badge">✓ CLEAR</span>' : ''}
          </div>
          <h3 class="level-title">${level.title}</h3>
          <div class="level-stars">
            <span class="star ${stars >= 1 ? 'gold' : ''}">★</span>
            <span class="star ${stars >= 2 ? 'gold' : ''}">★</span>
            <span class="star ${stars >= 3 ? 'gold' : ''}">★</span>
          </div>
          <button class="btn-play-level">プレイ</button>
        </div>
      `;
    });

    html += `</section>`;

    if (customLevels.length > 0 && (this.activeFilter === 'All' || this.activeFilter === 'Custom')) {
      html += `
        <section class="custom-levels-section">
          <h2>🛠️ 自作パズルコレクション (${customLevels.length})</h2>
          <div class="levels-grid">
      `;

      customLevels.forEach(level => {
        html += `
          <div class="level-card custom-card" data-id="${level.id}">
            <div class="level-card-header">
              <span class="badge badge-custom">Custom</span>
            </div>
            <h3 class="level-title">${level.title}</h3>
            <button class="btn-play-level">プレイ</button>
          </div>
        `;
      });

      html += `</div></section>`;
    }

    html += `</div>`;

    this.container.innerHTML = html;

    // Attach Filter Tab listeners
    this.container.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        sounds.playClick();
        this.activeFilter = tab.getAttribute('data-diff');
        this.render();
      });
    });

    // Attach Level Card listeners
    this.container.querySelectorAll('.level-card').forEach(card => {
      card.addEventListener('click', () => {
        sounds.playClick();
        const id = card.getAttribute('data-id');
        if (this.onSelectLevel) this.onSelectLevel(id);
      });
    });

    // Quick Play Random button
    const randomBtn = this.container.querySelector('.btn-random');
    if (randomBtn) {
      randomBtn.addEventListener('click', () => {
        sounds.playClick();
        if (this.onQuickPlay) this.onQuickPlay(this.activeFilter === 'All' ? 'Medium' : this.activeFilter);
      });
    }

    // Editor button
    const editorBtn = this.container.querySelector('.btn-editor');
    if (editorBtn) {
      editorBtn.addEventListener('click', () => {
        sounds.playClick();
        if (this.onOpenEditor) this.onOpenEditor();
      });
    }
  }
}
