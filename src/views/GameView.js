import { MazeRenderer } from '../components/MazeRenderer.js';
import { Numpad } from '../components/Numpad.js';
import { HintModal } from '../components/HintModal.js';
import { VictoryModal } from '../components/VictoryModal.js';
import { AreaMazeSolver } from '../engine/AreaMazeSolver.js';
import { Storage } from '../utils/Storage.js';
import { PrintExporter } from '../utils/PrintExporter.js';
import { sounds } from '../utils/SoundManager.js';

export class GameView {
  constructor(containerEl, { onNavigate }) {
    this.container = containerEl;
    this.onNavigate = onNavigate;
    this.model = null;
    this.userInputs = {};
    this.notes = {};
    this.activeCellId = null;
    this.hintsUsed = 0;
    this.secondsElapsed = 0;
    this.timerInterval = null;

    this.renderer = null;
    this.numpad = null;
    this.hintModal = null;
    this.victoryModal = null;

    this.boundKeyHandler = this.handlePhysicalKeyboard.bind(this);
  }

  loadLevel(model) {
    this.model = model;
    this.userInputs = {};
    this.notes = {};
    this.activeCellId = this.model.question ? this.model.question.targetId : (this.model.rects[0] ? this.model.rects[0].id : null);
    this.hintsUsed = 0;
    this.secondsElapsed = 0;

    this.startTimer();
    this.render();
    window.addEventListener('keydown', this.boundKeyHandler);
  }

  startTimer() {
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      this.secondsElapsed++;
      const timerEl = this.container.querySelector('.timer-value');
      if (timerEl) {
        timerEl.textContent = this.formatTime(this.secondsElapsed);
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  formatTime(secs) {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  handlePhysicalKeyboard(e) {
    // Ignore keydown if a modal is open or user is typing in an input element
    if (document.querySelector('.modal-card') || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key >= '0' && e.key <= '9') {
      sounds.playClick();
      this.handleInputDigit(parseInt(e.key, 10));
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      sounds.playPencil();
      this.handleDeleteDigit();
    } else if (e.key === 'Enter') {
      this.checkSolution();
    }
  }

  handleInputDigit(val) {
    if (!this.activeCellId) return;

    const isNote = this.numpad ? this.numpad.isNoteMode : false;
    const q = this.model.question;
    const isTarget = q && q.targetId === this.activeCellId;
    const key = isTarget ? `${this.activeCellId}_${q.type}` : `${this.activeCellId}_area`;

    if (isNote) {
      const current = (this.notes[this.activeCellId] || '').toString();
      this.notes[this.activeCellId] = current.length < 3 ? current + val : val.toString();
      this.renderer.setNotes(this.notes);
    } else {
      const current = (this.userInputs[key] || '').toString();
      const newVal = parseInt(current + val, 10);
      this.userInputs[key] = newVal;
      this.renderer.setUserInputs(this.userInputs);
    }
  }

  handleDeleteDigit() {
    if (!this.activeCellId) return;

    const isNote = this.numpad ? this.numpad.isNoteMode : false;
    const q = this.model.question;
    const isTarget = q && q.targetId === this.activeCellId;
    const key = isTarget ? `${this.activeCellId}_${q.type}` : `${this.activeCellId}_area`;

    if (isNote) {
      delete this.notes[this.activeCellId];
      this.renderer.setNotes(this.notes);
    } else {
      const current = (this.userInputs[key] || '').toString();
      if (current.length > 1) {
        this.userInputs[key] = parseInt(current.slice(0, -1), 10);
      } else {
        delete this.userInputs[key];
      }
      this.renderer.setUserInputs(this.userInputs);
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="game-view">
        <header class="game-header">
          <button class="btn-back" title="ステージ選択に戻る">
            ← 一覧
          </button>
          <div class="game-title-box">
            <h2>${this.model.title}</h2>
            <span class="badge badge-${this.model.difficulty.toLowerCase()}">${this.model.difficulty}</span>
          </div>
          <div class="game-actions">
            <div class="timer-box">
              ⏱️ <span class="timer-value">${this.formatTime(this.secondsElapsed)}</span>
            </div>
            <button class="btn-icon btn-sound" title="音切替">🔊</button>
            <button class="btn-icon btn-print" title="印刷">🖨️</button>
          </div>
        </header>

        <main class="game-main">
          <div class="diagram-section">
            <div id="svg-container" class="svg-container"></div>
          </div>
          <div class="control-section">
            <div id="numpad-container"></div>
          </div>
        </main>

        <div id="hint-modal-container"></div>
        <div id="victory-modal-container"></div>
      </div>
    `;

    // Setup Renderer
    const svgBox = this.container.querySelector('#svg-container');
    this.renderer = new MazeRenderer(svgBox, {
      onSelectCell: (cellId) => {
        this.activeCellId = cellId;
      },
      userInputs: this.userInputs,
      notes: this.notes
    });
    this.renderer.setModel(this.model);
    if (this.activeCellId) this.renderer.setActiveCell(this.activeCellId);

    // Setup Numpad
    const numpadBox = this.container.querySelector('#numpad-container');
    this.numpad = new Numpad(numpadBox, {
      onKeyPress: (val, isNote) => this.handleInputDigit(val),
      onDelete: (isNote) => this.handleDeleteDigit(),
      onSubmit: () => this.checkSolution(),
      onGetHint: () => this.showHint()
    });

    // Setup Modals
    const hintBox = this.container.querySelector('#hint-modal-container');
    this.hintModal = new HintModal(hintBox, {
      onHighlightSteps: (rectIds) => {
        this.renderer.setHighlights(rectIds);
      }
    });

    const victoryBox = this.container.querySelector('#victory-modal-container');
    this.victoryModal = new VictoryModal(victoryBox, {
      onNextLevel: () => {
        window.removeEventListener('keydown', this.boundKeyHandler);
        if (this.onNavigate) this.onNavigate('next_level', this.model.id);
      },
      onLevelSelect: () => {
        this.stopTimer();
        window.removeEventListener('keydown', this.boundKeyHandler);
        if (this.onNavigate) this.onNavigate('level_select');
      }
    });

    // Event Listeners
    this.container.querySelector('.btn-back').addEventListener('click', () => {
      sounds.playClick();
      this.stopTimer();
      window.removeEventListener('keydown', this.boundKeyHandler);
      if (this.onNavigate) this.onNavigate('level_select');
    });

    this.container.querySelector('.btn-sound').addEventListener('click', (e) => {
      const isMuted = sounds.toggleMute();
      e.target.textContent = isMuted ? '🔇' : '🔊';
    });

    this.container.querySelector('.btn-print').addEventListener('click', () => {
      const svg = svgBox.querySelector('svg');
      PrintExporter.printPuzzle(this.model, svg);
    });
  }

  checkSolution() {
    const q = this.model.question;
    const userVal = this.userInputs[`${q.targetId}_${q.type}`];

    if (userVal === undefined) {
      sounds.playError();
      alert('「 ? 」に入る数値を入力してください。');
      return;
    }

    if (parseInt(userVal, 10) === this.model.solution) {
      this.stopTimer();

      let stars = 3;
      if (this.hintsUsed > 3) stars = 1;
      else if (this.hintsUsed > 1) stars = 2;

      Storage.saveLevelProgress(this.model.id, {
        stars,
        timeSeconds: this.secondsElapsed,
        hintsUsed: this.hintsUsed
      });

      this.victoryModal.show({
        stars,
        timeFormatted: this.formatTime(this.secondsElapsed),
        hintsUsed: this.hintsUsed,
        levelTitle: this.model.title
      });
    } else {
      sounds.playError();
      alert('残念！数値が違います。もう一度考えてみましょう。');
    }
  }

  showHint() {
    this.hintsUsed++;
    const solver = new AreaMazeSolver(this.model);
    const result = solver.solve();
    this.hintModal.show(result.steps);
  }
}
