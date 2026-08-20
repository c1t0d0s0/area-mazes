import { PRESET_PUZZLES } from '../engine/PresetPuzzles.js';
import { Storage } from '../utils/Storage.js';
import { sounds } from '../utils/SoundManager.js';
import { t, translateTitle, toggleLanguage } from '../utils/i18n.js';

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
            <h1>📐 ${t('title')}</h1>
            <p>${t('subtitle')}</p>
          </div>
          <div class="header-actions">
            <button class="btn-action-hero btn-lang-toggle" title="${t('btnLangTitle')}">
              🌐 ${t('langToggle')}
            </button>
            <button class="btn-action-hero btn-random">
              ${t('btnRandom')}
            </button>
            <button class="btn-action-hero btn-editor">
              ${t('btnEditor')}
            </button>
          </div>
        </header>

        <nav class="filter-nav">
          <button class="filter-tab ${this.activeFilter === 'All' ? 'active' : ''}" data-diff="All">${t('filterAll')} (${PRESET_PUZZLES.length})</button>
          <button class="filter-tab ${this.activeFilter === 'Easy' ? 'active' : ''}" data-diff="Easy">${t('filterEasy')}</button>
          <button class="filter-tab ${this.activeFilter === 'Medium' ? 'active' : ''}" data-diff="Medium">${t('filterMedium')}</button>
          <button class="filter-tab ${this.activeFilter === 'Hard' ? 'active' : ''}" data-diff="Hard">${t('filterHard')}</button>
          <button class="filter-tab ${this.activeFilter === 'Expert' ? 'active' : ''}" data-diff="Expert">${t('filterExpert')}</button>
          <button class="filter-tab ${this.activeFilter === 'Grandmaster' ? 'active' : ''}" data-diff="Grandmaster">${t('filterGrandmaster')}</button>
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
            ${isCompleted ? `<span class="complete-badge">${t('clearBadge')}</span>` : ''}
          </div>
          <h3 class="level-title">${translateTitle(level.title)}</h3>
          <div class="level-stars">
            <span class="star ${stars >= 1 ? 'gold' : ''}">★</span>
            <span class="star ${stars >= 2 ? 'gold' : ''}">★</span>
            <span class="star ${stars >= 3 ? 'gold' : ''}">★</span>
          </div>
          <button class="btn-play-level">${t('btnPlay')}</button>
        </div>
      `;
    });

    html += `</section>`;

    if (customLevels.length > 0 && (this.activeFilter === 'All' || this.activeFilter === 'Custom')) {
      html += `
        <section class="custom-levels-section">
          <h2>${t('customLevelsTitle')} (${customLevels.length})</h2>
          <div class="levels-grid">
      `;

      customLevels.forEach(level => {
        html += `
          <div class="level-card custom-card" data-id="${level.id}">
            <div class="level-card-header">
              <span class="badge badge-custom">Custom</span>
            </div>
            <h3 class="level-title">${translateTitle(level.title)}</h3>
            <button class="btn-play-level">${t('btnPlay')}</button>
          </div>
        `;
      });

      html += `</div></section>`;
    }

    html += `</div>`;

    this.container.innerHTML = html;

    // Attach Language Toggle listener
    const langBtn = this.container.querySelector('.btn-lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        sounds.playClick();
        toggleLanguage();
        this.render();
      });
    }

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
