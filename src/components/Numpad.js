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
    this.activeTarget = null;

    this.render();
  }

  setNoteMode(isNote, activeTarget = null) {
    this.isNoteMode = isNote;
    if (activeTarget) this.activeTarget = activeTarget;

    const btn = this.container.querySelector('.btn-note');
    const banner = this.container.querySelector('.numpad-status-banner');
    
    if (btn) {
      if (this.isNoteMode) {
        btn.classList.add('active');
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
          メモモード (ON)
        `;
      } else {
        btn.classList.remove('active');
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
          メモモード (OFF)
        `;
      }
    }

    if (banner) {
      if (this.isNoteMode) {
        banner.className = 'numpad-status-banner memo-active';
        let targetText = '図面の長方形や辺';
        if (this.activeTarget && this.activeTarget.rectId) {
          const typeLabel = this.activeTarget.type === 'w' ? '幅メモ (上辺)' : (this.activeTarget.type === 'h' ? '高さメモ (左辺)' : '面積メモ');
          targetText = `長方形 ${this.activeTarget.rectId} の${typeLabel}`;
        }
        banner.innerHTML = `✏️ <strong>メモモードON</strong>: ${targetText} を入力中`;
      } else {
        banner.className = 'numpad-status-banner answer-active';
        banner.innerHTML = `🎯 <strong>回答モード</strong>: 「 ? 」に入る本番の数値を入力してください`;
      }
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="numpad-status-banner ${this.isNoteMode ? 'memo-active' : 'answer-active'}">
        ${this.isNoteMode 
          ? `✏️ <strong>メモモードON</strong>: 図面の長方形や辺を選んで仮数字（メモ）を書き込めます`
          : `🎯 <strong>回答モード</strong>: 「 ? 」に入る本番の数値を入力してください`}
      </div>

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
        <button class="numpad-btn btn-action btn-submit" data-action="submit" title="回答判定">✓ 判定</button>
      </div>

      <div class="numpad-toolbar">
        <button class="tool-btn btn-note ${this.isNoteMode ? 'active' : ''}" data-action="note" title="メモ機能のオン/オフ切替">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
          メモモード ${this.isNoteMode ? '(ON)' : '(OFF)'}
        </button>
        <button class="tool-btn btn-hint" data-action="hint" title="ヒントを見る">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
          ヒント
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
        this.setNoteMode(this.isNoteMode, this.activeTarget);
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
