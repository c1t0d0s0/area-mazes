import confetti from 'canvas-confetti';
import { sounds } from '../utils/SoundManager.js';

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
          <div class="victory-header">
            <h2>🎉 STAGE CLEAR!</h2>
            <p class="level-subtitle">${levelTitle}</p>
          </div>
          <div class="stars-display">
            <span class="star ${stars >= 1 ? 'gold' : ''}">★</span>
            <span class="star ${stars >= 2 ? 'gold' : ''}">★</span>
            <span class="star ${stars >= 3 ? 'gold' : ''}">★</span>
          </div>
          <div class="victory-stats">
            <div class="stat-item">
              <span class="stat-label">クリアタイム</span>
              <span class="stat-value">${timeFormatted}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">ヒント使用</span>
              <span class="stat-value">${hintsUsed} 回</span>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-secondary btn-select">ステージ一覧</button>
            <button class="btn-primary btn-next-stage">次のステージ →</button>
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
