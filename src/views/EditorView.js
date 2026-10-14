import { AreaMazeModel } from '../engine/AreaMazeModel.js';
import { AreaMazeSolver } from '../engine/AreaMazeSolver.js';
import { Storage } from '../utils/Storage.js';
import { sounds } from '../utils/SoundManager.js';
import { t, toggleLanguage } from '../utils/i18n.js';

export class EditorView {
  constructor(containerEl, { onNavigate }) {
    this.container = containerEl;
    this.onNavigate = onNavigate;

    // Default template model for editing
    this.rects = [
      { id: 'A1', x: 0, y: 0, w: 4, h: 3 },
      { id: 'A2', x: 4, y: 0, w: 6, h: 3 },
      { id: 'A3', x: 0, y: 3, w: 10, h: 4 }
    ];
    this.clues = {
      'A1_area': 12,
      'A1_h': 3,
      'A2_area': 18
    };
    this.question = { targetId: 'A3', type: 'h' };
    this.title = t('editorTitle');
    this.difficulty = 'Medium';
  }

  getModel() {
    const rCopy = JSON.parse(JSON.stringify(this.rects));
    let targetRect = rCopy.find(r => r.id === this.question.targetId) || rCopy[0];

    let solution = 0;
    if (this.question.type === 'area') solution = targetRect.w * targetRect.h;
    else if (this.question.type === 'w') solution = targetRect.w;
    else if (this.question.type === 'h') solution = targetRect.h;

    return new AreaMazeModel({
      id: `custom_${Date.now()}`,
      title: this.title,
      difficulty: this.difficulty,
      rects: rCopy,
      clues: { ...this.clues },
      question: { ...this.question },
      solution
    });
  }

  render() {
    const currentModel = this.getModel();
    const solver = new AreaMazeSolver(currentModel);
    const result = solver.solve();

    this.container.innerHTML = `
      <div class="editor-view">
        <header class="editor-header bar">
          <button type="button" class="btn-back home-btn">${t('btnEditorBack')}</button>
          <h1>${t('editorHeader')}</h1>
          <div class="header-status">
            <button type="button" class="btn btn-quiet btn-lang-toggle" title="${t('btnLangTitle')}">${t('langToggle')}</button>
          </div>
        </header>

        <div class="editor-layout">
          <div class="editor-sidebar">
            <p class="editor-status">
              ${result.isSolved 
                ? `<span class="badge badge-success">${t('solvable', { solution: result.solution })}</span>` 
                : `<span class="badge badge-warning">${t('unsolvable')}</span>`}
            </p>
            <div class="form-group">
              <label>${t('labelTitle')}</label>
              <input type="text" class="input-title" value="${this.title}">
            </div>
            <div class="form-group">
              <label>${t('labelDiff')}</label>
              <select class="select-diff">
                <option value="Easy" ${this.difficulty === 'Easy' ? 'selected' : ''}>${t('diffEasy')}</option>
                <option value="Medium" ${this.difficulty === 'Medium' ? 'selected' : ''}>${t('diffMedium')}</option>
                <option value="Hard" ${this.difficulty === 'Hard' ? 'selected' : ''}>${t('diffHard')}</option>
                <option value="Expert" ${this.difficulty === 'Expert' ? 'selected' : ''}>${t('diffExpert')}</option>
              </select>
            </div>

            <div class="editor-section">
              <h3>${t('rectsList')}</h3>
              <div class="rect-list">
                ${this.rects.map((r, i) => `
                  <div class="rect-editor-item" data-id="${r.id}">
                    <strong>${r.id}</strong> (w:${r.w}, h:${r.h}, area:${r.w * r.h})
                    <button type="button" class="btn btn-sm btn-del-rect" data-idx="${i}">${t('btnDelete')}</button>
                  </div>
                `).join('')}
              </div>
              <button type="button" class="btn btn-add-rect">${t('btnAddRect')}</button>
            </div>

            <div class="editor-actions">
              <button type="button" class="btn btn-primary btn-save-custom" ${result.isSolved ? '' : 'disabled'}>
                ${t('btnSaveCustom')}
              </button>
            </div>
          </div>

          <div class="editor-preview">
            <h3>${t('previewTitle')}</h3>
            <div id="editor-svg-box"></div>
          </div>
        </div>
      </div>
    `;

    // Render Preview SVG
    const svgBox = this.container.querySelector('#editor-svg-box');
    const drawW = 500;
    const drawH = 400;
    const margin = 40;
    const totalW = currentModel.totalWidth || 10;
    const totalH = currentModel.totalHeight || 10;

    const scale = Math.min((drawW - margin * 2) / totalW, (drawH - margin * 2) / totalH);
    const offsetX = margin + ((drawW - margin * 2) - totalW * scale) / 2;
    const offsetY = margin + ((drawH - margin * 2) - totalH * scale) / 2;

    let svgHtml = `<svg viewBox="0 0 ${drawW} ${drawH}" class="editor-svg" xmlns="http://www.w3.org/2000/svg">`;
    this.rects.forEach(r => {
      const sx = offsetX + r.x * scale;
      const sy = offsetY + r.y * scale;
      const sw = r.w * scale;
      const sh = r.h * scale;

      const isTarget = this.question.targetId === r.id;

      svgHtml += `
        <rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" class="maze-rect ${isTarget ? 'question-rect' : ''}" rx="4"/>
        <text x="${sx + sw/2}" y="${sy + sh/2}" class="area-label" text-anchor="middle" dominant-baseline="central">
          ${isTarget ? '?' : `${r.w * r.h} cm²`}
        </text>
      `;
    });
    svgHtml += `</svg>`;
    svgBox.innerHTML = svgHtml;

    // Attach Event Listeners
    this.container.querySelector('.btn-back').addEventListener('click', () => {
      sounds.playClick();
      if (this.onNavigate) this.onNavigate('level_select');
    });

    const langBtn = this.container.querySelector('.btn-lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        sounds.playClick();
        toggleLanguage();
        this.render();
      });
    }

    this.container.querySelector('.input-title').addEventListener('change', (e) => {
      this.title = e.target.value;
    });

    this.container.querySelector('.select-diff').addEventListener('change', (e) => {
      this.difficulty = e.target.value;
    });

    const addBtn = this.container.querySelector('.btn-add-rect');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        sounds.playClick();
        const nextId = `A${this.rects.length + 1}`;
        this.rects.push({ id: nextId, x: 0, y: (this.rects.length * 3) % 9, w: 5, h: 3 });
        this.render();
      });
    }

    this.container.querySelectorAll('.btn-del-rect').forEach(btn => {
      btn.addEventListener('click', (e) => {
        sounds.playClick();
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        if (this.rects.length > 2) {
          this.rects.splice(idx, 1);
          this.render();
        } else {
          alert(t('alertMinRects'));
        }
      });
    });

    const saveBtn = this.container.querySelector('.btn-save-custom');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        sounds.playSuccess();
        const model = this.getModel();
        Storage.saveCustomLevel(model);
        alert(t('alertSavedCustom'));
        if (this.onNavigate) this.onNavigate('level_select');
      });
    }
  }
}
