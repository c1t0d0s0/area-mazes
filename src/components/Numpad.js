import { sounds } from '../utils/SoundManager.js';

export class Numpad {
  constructor(containerEl, { onKeyPress, onDelete, onSubmit, onToggleNoteMode, onGetHint } = {}) {
    this.container = containerEl;
    this.onKeyPress = onKeyPress;
    this.onDelete = onDelete;
    this.onSubmit = onSubmit;
    this.onToggleNoteMode = onToggleNoteMode;
    this.onGetHint = onGetHint;
    this.isNoteMode = false;

    this.render();
  }

  setNoteMode(isNote) {
    this.isNoteMode = isNote;
    const btn = this.container.querySelector('.btn-note');
    if (btn) {
      if (this.isNoteMode) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="numpad-grid">
        <button class="numpad-btn btn-num" data-val="1">1</button>
        <button class="numpad-btn btn-num" data-val="2">2</button>
        <button class="numpad-btn btn-num" data-val="3">3</button>
        <button class="numpad-btn btn-num" data-val="4">4</button>
        <button class="numpad-btn btn-num" data-val="5">5</button>
        <button class="numpad-btn btn-num" data-val="6">6</button>
        <button class="numpad-btn btn-num" data-val="7">7</button>
        <button class="numpad-btn btn-num" data-val="8">8</button>
        <button class="numpad-btn btn-num" data-val="9">9</button>
        <button class="numpad-btn btn-action btn-del" data-action="delete" title="1文字消去">⌫</button>
        <button class="numpad-btn btn-num" data-val="0">0</button>
        <button class="numpad-btn btn-action btn-submit" data-action="submit" title="回答判定">✓</button>
      </div>
      <div class="numpad-toolbar">
        <button class="tool-btn btn-note ${this.isNoteMode ? 'active' : ''}" data-action="note">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
          メモモード
        </button>
        <button class="tool-btn btn-hint" data-action="hint">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
          ヒントを見る
        </button>
      </div>
    `;

    this.container.querySelectorAll('.btn-num').forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.playClick();
        const val = parseInt(btn.getAttribute('data-val'), 10);
        if (this.onKeyPress) this.onKeyPress(val, this.isNoteMode);
      });
    });

    const delBtn = this.container.querySelector('.btn-del');
    if (delBtn) {
      delBtn.addEventListener('click', () => {
        sounds.playPencil();
        if (this.onDelete) this.onDelete(this.isNoteMode);
      });
    }

    const submitBtn = this.container.querySelector('.btn-submit');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        if (this.onSubmit) this.onSubmit();
      });
    }

    const noteBtn = this.container.querySelector('.btn-note');
    if (noteBtn) {
      noteBtn.addEventListener('click', () => {
        sounds.playClick();
        this.isNoteMode = !this.isNoteMode;
        this.setNoteMode(this.isNoteMode);
        if (this.onToggleNoteMode) this.onToggleNoteMode(this.isNoteMode);
      });
    }

    const hintBtn = this.container.querySelector('.btn-hint');
    if (hintBtn) {
      hintBtn.addEventListener('click', () => {
        sounds.playHint();
        if (this.onGetHint) this.onGetHint();
      });
    }
  }
}
