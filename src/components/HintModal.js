import { sounds } from '../utils/SoundManager.js';

export class HintModal {
  constructor(containerEl, { onHighlightSteps } = {}) {
    this.container = containerEl;
    this.onHighlightSteps = onHighlightSteps;
    this.steps = [];
    this.currentStepIdx = 0;
  }

  show(steps = []) {
    this.steps = steps;
    this.currentStepIdx = 0;
    this.render();
    this.container.classList.add('open');
    this.notifyHighlight();
  }

  hide() {
    this.container.classList.remove('open');
    if (this.onHighlightSteps) this.onHighlightSteps([]);
  }

  notifyHighlight() {
    if (this.steps.length > 0 && this.onHighlightSteps) {
      const step = this.steps[this.currentStepIdx];
      if (step && step.rectId) {
        this.onHighlightSteps([step.rectId]);
      }
    }
  }

  render() {
    if (this.steps.length === 0) {
      this.container.innerHTML = `
        <div class="modal-backdrop">
          <div class="modal-card">
            <h3>💡 ヒント</h3>
            <p>このパズルは既に入力されているか、ヒントが見つかりません。</p>
            <button class="btn-modal-close">閉じる</button>
          </div>
        </div>
      `;
    } else {
      const step = this.steps[this.currentStepIdx];
      this.container.innerHTML = `
        <div class="modal-backdrop">
          <div class="modal-card hint-card">
            <div class="modal-header">
              <h3>💡 解法ヒント (${this.currentStepIdx + 1} / ${this.steps.length})</h3>
              <button class="btn-close-icon">&times;</button>
            </div>
            <div class="hint-body">
              <div class="hint-badge">${step.rule || '推論ステップ'}</div>
              <p class="hint-explanation">${step.explanation}</p>
            </div>
            <div class="modal-footer hint-nav">
              <button class="btn-secondary btn-prev" ${this.currentStepIdx === 0 ? 'disabled' : ''}>← 前のステップ</button>
              <button class="btn-primary btn-next" ${this.currentStepIdx === this.steps.length - 1 ? 'disabled' : ''}>次のステップ →</button>
            </div>
          </div>
        </div>
      `;
    }

    const closeBtn = this.container.querySelector('.btn-modal-close') || this.container.querySelector('.btn-close-icon');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        sounds.playClick();
        this.hide();
      });
    }

    const prevBtn = this.container.querySelector('.btn-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentStepIdx > 0) {
          sounds.playClick();
          this.currentStepIdx--;
          this.render();
          this.notifyHighlight();
        }
      });
    }

    const nextBtn = this.container.querySelector('.btn-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentStepIdx < this.steps.length - 1) {
          sounds.playClick();
          this.currentStepIdx++;
          this.render();
          this.notifyHighlight();
        }
      });
    }
  }
}
