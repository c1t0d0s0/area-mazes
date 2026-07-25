import { sounds } from '../utils/SoundManager.js';

export class HintModal {
  constructor(containerEl, { onHighlightSteps } = {}) {
    this.container = containerEl;
    this.onHighlightSteps = onHighlightSteps;
    this.steps = [];
    this.currentStepIdx = 0;
    this.boundKeyHandler = this.handleKeyDown.bind(this);
  }

  show(steps = []) {
    this.steps = steps;
    this.currentStepIdx = 0;
    this.render();
    this.container.classList.add('open');
    this.notifyHighlight();
    window.addEventListener('keydown', this.boundKeyHandler);
  }

  hide() {
    this.container.classList.remove('open');
    window.removeEventListener('keydown', this.boundKeyHandler);
    if (this.onHighlightSteps) this.onHighlightSteps([]);
  }

  handleKeyDown(e) {
    if (e.key === 'Escape') {
      sounds.playClick();
      this.hide();
    }
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
            <div class="modal-header">
              <h3>💡 ヒント</h3>
              <button class="btn-close-icon" title="閉じる" aria-label="閉じる">✕</button>
            </div>
            <p style="margin: 20px 0; color: var(--text-muted);">このパズルは既に入力されているか、ヒントが見つかりません。</p>
            <div class="modal-footer">
              <button class="btn-modal-close btn-primary" style="width: 100%;">閉じる</button>
            </div>
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
              <button class="btn-close-icon" title="閉じる" aria-label="閉じる">✕ 閉じる</button>
            </div>
            <div class="hint-body">
              <div class="hint-badge">${step.rule || '推論ステップ'}</div>
              <p class="hint-explanation">${step.explanation}</p>
            </div>
            <div class="modal-footer hint-nav">
              <button class="btn-secondary btn-prev" ${this.currentStepIdx === 0 ? 'disabled' : ''}>← 前へ</button>
              <button class="btn-secondary btn-modal-close">閉じる</button>
              <button class="btn-primary btn-next" ${this.currentStepIdx === this.steps.length - 1 ? 'disabled' : ''}>次へ →</button>
            </div>
          </div>
        </div>
      `;
    }

    // Attach Backdrop click listener (close when clicking outside card)
    const backdrop = this.container.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          sounds.playClick();
          this.hide();
        }
      });
    }

    // Attach Close buttons
    const closeBtns = this.container.querySelectorAll('.btn-modal-close, .btn-close-icon');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.playClick();
        this.hide();
      });
    });

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
