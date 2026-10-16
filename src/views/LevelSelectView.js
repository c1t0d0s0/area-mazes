import { PRESET_PUZZLES } from '../engine/PresetPuzzles.js';
import { AccountBox } from '../components/AccountBox.js';
import { account, getProgress } from '../cloud/store.js';
import { Storage } from '../utils/Storage.js';
import { sounds } from '../utils/SoundManager.js';
import { monkeySvg } from '../utils/monkey.js';
import { t, translateTitle, toggleLanguage } from '../utils/i18n.js';

const FILTERS = [
  { id: 'All', key: 'filterAll' },
  { id: 'Easy', key: 'filterEasy' },
  { id: 'Medium', key: 'filterMedium' },
  { id: 'Hard', key: 'filterHard' },
  { id: 'Expert', key: 'filterExpert' },
  { id: 'Grandmaster', key: 'filterGrandmaster' }
];

function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function getFilterFromSearch(search = typeof window !== 'undefined' ? window.location.search : '') {
  const params = new URLSearchParams(search);
  const rawGrade = params.get('grade');
  if (rawGrade === null || rawGrade.trim() === '') return 'All';
  const grade = Number(rawGrade);
  if (!Number.isInteger(grade) || grade < 1) return 'All';
  if (grade <= 2) return 'Easy';
  if (grade === 3) return 'Medium';
  if (grade === 4) return 'Hard';
  if (grade === 5) return 'Expert';
  return 'Grandmaster';
}

export class LevelSelectView {
  constructor(containerEl, { initialFilter, onFilterChange, onSelectLevel, onQuickPlay, onOpenEditor } = {}) {
    this.container = containerEl;
    this.onFilterChange = onFilterChange;
    this.onSelectLevel = onSelectLevel;
    this.onQuickPlay = onQuickPlay;
    this.onOpenEditor = onOpenEditor;
    this.activeFilter = initialFilter || getFilterFromSearch();
    this.accountBox = new AccountBox();
  }

  renderRecord(pData) {
    if (account.loading) return t('loadingRecords');
    if (!pData.completed) return t('notCleared');

    const stars = pData.stars || 0;
    const starsHtml = [1, 2, 3].map(n => `<span class="star ${stars >= n ? 'gold' : ''}">★</span>`).join('');
    const time = pData.bestTime > 0 ? `<span class="tile-time">${t('bestTime', { time: formatTime(pData.bestTime) })}</span>` : '';
    return `<span class="level-stars" aria-label="${stars} / 3">${starsHtml}</span>${time}`;
  }

  render() {
    const progress = getProgress();
    const customLevels = Storage.getCustomLevels();

    const filteredPresets = this.activeFilter === 'All' 
      ? PRESET_PUZZLES 
      : PRESET_PUZZLES.filter(p => p.difficulty === this.activeFilter);
    const clearedCount = PRESET_PUZZLES.filter(p => (progress[p.id] || {}).completed).length;

    let html = `
      <main class="level-select-view home">
        <div class="home-side">
          <header class="hero">
            <div class="crest" aria-hidden="true">
              <span class="crest-cell">3</span>
              <span class="crest-cell">4</span>
              <span class="crest-cell">12</span>
              <span class="crest-cell crest-mark">?</span>
            </div>
            <div class="hero-text">
              <h1 class="brand">${t('title')}</h1>
              <p class="lead">${t('subtitle')}</p>
            </div>
            <div class="monkey">${monkeySvg(t('monkeyLabel'))}</div>
          </header>

          <div class="mode filter-nav" role="group" aria-label="${t('filterLabel')}">
            ${FILTERS.map(f => `
              <button type="button" class="mode-option filter-tab" data-diff="${f.id}" aria-pressed="${this.activeFilter === f.id}">
                <span class="mode-label">${t(f.key)}</span>
              </button>
            `).join('')}
          </div>

          <nav class="home-actions">
            <button type="button" class="btn btn-primary btn-random">${t('btnRandom')}</button>
            <button type="button" class="btn btn-editor">${t('btnEditor')}</button>
            <button type="button" class="btn btn-quiet btn-lang-toggle" title="${t('btnLangTitle')}">${t('langToggle')}</button>
          </nav>

          <div class="account-slot"></div>
        </div>

        <div class="home-main">
          <section aria-labelledby="preset-levels-title">
            <h2 id="preset-levels-title">${t('presetLevelsTitle')}</h2>
            <p class="section-note">${account.loading ? t('loadingRecords') : t('clearedCount', { done: clearedCount, total: PRESET_PUZZLES.length })}</p>
            <div class="tiles levels-grid">
    `;

    filteredPresets.forEach(level => {
      const pData = progress[level.id] || {};

      html += `
        <button type="button" class="tile level-card diff-${level.difficulty.toLowerCase()} ${pData.completed ? 'completed' : ''}" data-id="${level.id}">
          <span class="tile-badge">${level.difficulty}</span>
          <span class="tile-title level-title">${translateTitle(level.title)}</span>
          <span class="tile-record">${this.renderRecord(pData)}</span>
        </button>
      `;
    });

    html += `</div></section>`;

    if (customLevels.length > 0 && this.activeFilter === 'All') {
      html += `
        <section class="custom-levels-section" aria-labelledby="custom-levels-title">
          <h2 id="custom-levels-title">${t('customLevelsTitle')} (${customLevels.length})</h2>
          <div class="tiles levels-grid">
      `;

      customLevels.forEach(level => {
        html += `
          <button type="button" class="tile level-card diff-custom custom-card" data-id="${level.id}">
            <span class="tile-badge">Custom</span>
            <span class="tile-title level-title">${translateTitle(level.title)}</span>
          </button>
        `;
      });

      html += `</div></section>`;
    }

    html += `</div></main>`;

    this.container.innerHTML = html;

    this.accountBox.mount(this.container.querySelector('.account-slot'));

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
        if (this.onFilterChange) this.onFilterChange(this.activeFilter);
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
