import confetti from 'canvas-confetti';
import { sounds } from '../utils/SoundManager.js';
import { monkeySvg } from '../utils/monkey.js';
import { t, translateTitle } from '../utils/i18n.js';

export class VictoryModal {
  constructor(containerEl, { onNextLevel, onLevelSelect } = {}) {
    this.container = containerEl;
    this.onNextLevel = onNextLevel;
    this.onLevelSelect = onLevelSelect;
  }

  show({ stars = 3, timeFormatted = '00:45', hintsUsed = 0, levelTitle = 'Level 1' }) {
    sounds.playSuccess();
    this.triggerConfetti();

    this.container.innerHTML = `
      <div class="modal-backdrop">
        <div class="modal-card victory-card">
          <div class="monkey victory-monkey">${monkeySvg(t('monkeyLabel'), { eyes: 'happy', mouth: 'open' })}</div>
          <div class="victory-header">
            <h2>${t('stageClear')}</h2>
            <p class="level-subtitle">${translateTitle(levelTitle)}</p>
          </div>
          <div class="stars-display">
            <span class="star ${stars >= 1 ? 'gold' : ''}">★</span>
            <span class="star ${stars >= 2 ? 'gold' : ''}">★</span>
            <span class="star ${stars >= 3 ? 'gold' : ''}">★</span>
          </div>
          <div class="victory-stats">
            <div class="stat-item">
              <span class="stat-label">${t('statClearTime')}</span>
              <span class="stat-value">${timeFormatted}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">${t('statHintsUsed')}</span>
              <span class="stat-value">${t('hintsCount', { count: hintsUsed })}</span>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-select">${t('btnLevelSelect')}</button>
            <button type="button" class="btn btn-primary btn-next-stage">${t('btnNextStage')}</button>
          </div>
        </div>
      </div>
    `;

    this.container.classList.add('open');

    const selectBtn = this.container.querySelector('.btn-select');
    if (selectBtn) {
      selectBtn.addEventListener('click', () => {
        sounds.playClick();
        this.hide();
        if (this.onLevelSelect) this.onLevelSelect();
      });
    }

    const nextBtn = this.container.querySelector('.btn-next-stage');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        sounds.playClick();
        this.hide();
        if (this.onNextLevel) this.onNextLevel();
      });
    }
  }

  hide() {
    this.container.classList.remove('open');
  }

  triggerConfetti() {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.warn('Confetti error', e);
    }
  }
}
