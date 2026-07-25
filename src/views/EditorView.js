import { AreaMazeModel } from '../engine/AreaMazeModel.js';
import { AreaMazeSolver } from '../engine/AreaMazeSolver.js';
import { Storage } from '../utils/Storage.js';
import { sounds } from '../utils/SoundManager.js';

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
    this.title = 'マイカスタムパズル';
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
        <header class="editor-header">
          <button class="btn-back">← 一覧に戻る</button>
          <h2>✏️ パズル自作エディター</h2>
          <div class="header-status">
            ${result.isSolved 
              ? `<span class="badge badge-success">✓ 解答可能 (解: ${result.solution})</span>` 
              : `<span class="badge badge-warning">⚠️ 解答不可 (情報不足)</span>`}
          </div>
        </header>

        <div class="editor-layout">
          <div class="editor-sidebar">
            <div class="form-group">
              <label>パズルタイトル</label>
              <input type="text" class="input-title" value="${this.title}">
            </div>
            <div class="form-group">
              <label>難易度</label>
              <select class="select-diff">
                <option value="Easy" ${this.difficulty === 'Easy' ? 'selected' : ''}>Easy (入門)</option>
                <option value="Medium" ${this.difficulty === 'Medium' ? 'selected' : ''}>Medium (初級)</option>
                <option value="Hard" ${this.difficulty === 'Hard' ? 'selected' : ''}>Hard (中級)</option>
                <option value="Expert" ${this.difficulty === 'Expert' ? 'selected' : ''}>Expert (上級)</option>
              </select>
            </div>

            <div class="editor-section">
              <h3>長方形リスト</h3>
              <div class="rect-list">
                ${this.rects.map((r, i) => `
                  <div class="rect-editor-item" data-id="${r.id}">
                    <strong>${r.id}</strong> (w:${r.w}, h:${r.h}, area:${r.w * r.h})
                    <button class="btn-sm btn-del-rect" data-idx="${i}">削除</button>
                  </div>
                `).join('')}
              </div>
              <button class="btn-secondary btn-add-rect">+ 長方形を追加</button>
            </div>

            <div class="editor-actions">
              <button class="btn-primary btn-save-custom" ${result.isSolved ? '' : 'disabled'}>
                💾 保存して保存済みに追加
              </button>
            </div>
          </div>

          <div class="editor-preview">
            <h3>図面プレビュー</h3>
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

    const scaleX = (drawW - margin * 2) / totalW;
    const scaleY = (drawH - margin * 2) / totalH;

    let svgHtml = `<svg viewBox="0 0 ${drawW} ${drawH}" class="editor-svg" xmlns="http://www.w3.org/2000/svg">`;
    this.rects.forEach(r => {
      const sx = margin + r.x * scaleX;
      const sy = margin + r.y * scaleY;
      const sw = r.w * scaleX;
      const sh = r.h * scaleY;

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
          alert('長方形は最低2つ必要です。');
        }
      });
    });

    const saveBtn = this.container.querySelector('.btn-save-custom');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        sounds.playSuccess();
        const model = this.getModel();
        Storage.saveCustomLevel(model);
        alert('カスタムパズルを保存しました！ステージ一覧からプレイできます。');
        if (this.onNavigate) this.onNavigate('level_select');
      });
    }
  }
}
