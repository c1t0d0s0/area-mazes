/**
 * MazeRenderer
 * SVG-based interactive renderer for Area Maze diagrams.
 * Supports selecting & writing notes for areas, top width edges, and left height edges.
 */

export class MazeRenderer {
  constructor(containerEl, { onSelectTarget, userInputs = {}, notes = {} } = {}) {
    this.container = containerEl;
    this.onSelectTarget = onSelectTarget;
    this.userInputs = userInputs;
    this.notes = notes;
    this.model = null;
    this.activeTarget = { rectId: null, type: 'area' }; // { rectId, type: 'area'|'w'|'h' }
    this.highlightedRects = new Set();
  }

  setModel(model) {
    this.model = model;
    this.render();
  }

  setUserInputs(userInputs) {
    this.userInputs = userInputs;
    this.render();
  }

  setNotes(notes) {
    this.notes = notes;
    this.render();
  }

  setActiveTarget(target) {
    if (typeof target === 'string') {
      this.activeTarget = { rectId: target, type: 'area' };
    } else if (target) {
      this.activeTarget = target;
    }
    this.updateHighlights();
  }

  setHighlights(rectIdArray = []) {
    this.highlightedRects = new Set(rectIdArray);
    this.updateHighlights();
  }

  render() {
    if (!this.model || !this.container) return;

    const { rects, clues, question, minX, minY, maxX, maxY, totalWidth, totalHeight } = this.model;

    const margin = 55;
    const svgWidth = 640;
    const svgHeight = 540;

    const drawW = svgWidth - margin * 2;
    const drawH = svgHeight - margin * 2;

    const scaleX = drawW / totalWidth;
    const scaleY = drawH / totalHeight;

    const toSvgX = (x) => margin + (x - minX) * scaleX;
    const toSvgY = (y) => margin + (y - minY) * scaleY;
    const toSvgW = (w) => w * scaleX;
    const toSvgH = (h) => h * scaleY;

    let svgHtml = `
      <svg id="area-maze-svg" viewBox="0 0 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg" class="maze-svg">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="questionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="rgba(255, 215, 0, 0.25)"/>
            <stop offset="100%" stop-color="rgba(255, 165, 0, 0.1)"/>
          </linearGradient>
        </defs>
        <g class="grid-background">
    `;

    rects.forEach((r) => {
      const sx = toSvgX(r.x);
      const sy = toSvgY(r.y);
      const sw = toSvgW(r.w);
      const sh = toSvgH(r.h);

      const isQuestionTarget = question && question.targetId === r.id && question.type === 'area';
      const isSelected = this.activeTarget.rectId === r.id && this.activeTarget.type === 'area';
      const isHighlighted = this.highlightedRects.has(r.id);

      let rectClass = 'maze-rect';
      if (isQuestionTarget) rectClass += ' question-rect';
      if (isSelected) rectClass += ' active-rect';
      if (isHighlighted) rectClass += ' highlighted-rect';

      // Area Clue, User Input, or Pencil Note
      const areaClue = clues[`${r.id}_area`];
      const userInputArea = this.userInputs[`${r.id}_area`];
      const noteArea = this.notes[`${r.id}_area`] || this.notes[r.id];

      let areaText = '';
      let isQuestion = false;

      if (isQuestionTarget) {
        areaText = userInputArea !== undefined ? userInputArea : '?';
        isQuestion = true;
      } else if (areaClue !== undefined) {
        areaText = `${areaClue} cm²`;
      } else if (userInputArea !== undefined) {
        areaText = `${userInputArea} cm²`;
      }

      svgHtml += `
        <g class="rect-group" data-id="${r.id}">
          <!-- Main Rectangle Body -->
          <rect 
            x="${sx}" y="${sy}" width="${sw}" height="${sh}" 
            class="${rectClass}" 
            data-id="${r.id}" data-type="area"
            rx="4" ry="4"
          />
      `;

      // Area label inside rectangle
      if (areaText !== '') {
        const textClass = isQuestion ? 'area-label question-label' : 'area-label';
        svgHtml += `
          <text 
            x="${sx + sw / 2}" y="${sy + sh / 2}" 
            class="${textClass}" data-id="${r.id}" data-type="area"
            text-anchor="middle" dominant-baseline="central"
          >${areaText}</text>
        `;
      }
      
      // Render pencil note inside area if present
      if (noteArea) {
        const noteY = areaText !== '' ? (sy + sh / 2 + 18) : (sy + sh / 2);
        svgHtml += `
          <text 
            x="${sx + sw / 2}" y="${noteY}" 
            class="note-label" data-id="${r.id}" data-type="area"
            text-anchor="middle" dominant-baseline="central"
          >✎ ${noteArea}</text>
        `;
      }

      // Render Edge Clues & Edge Notes
      const wClue = clues[`${r.id}_w`];
      const hClue = clues[`${r.id}_h`];

      const isWQuestion = question && question.targetId === r.id && question.type === 'w';
      const isHQuestion = question && question.targetId === r.id && question.type === 'h';
      const wNote = this.notes[`${r.id}_w`];
      const hNote = this.notes[`${r.id}_h`];

      const isWActive = this.activeTarget.rectId === r.id && this.activeTarget.type === 'w';
      const isHActive = this.activeTarget.rectId === r.id && this.activeTarget.type === 'h';

      // Width Clue / Note (Top Edge)
      let wVal = null;
      let wClass = 'edge-label';
      let isWNote = false;

      if (isWQuestion) {
        wVal = this.userInputs[`${r.id}_w`] !== undefined ? this.userInputs[`${r.id}_w`] : '?';
        wClass = 'edge-label question-label';
      } else if (wClue !== undefined) {
        wVal = `${wClue} cm`;
      } else if (wNote) {
        wVal = `✎ ${wNote}`;
        wClass = 'edge-label note-edge-label';
        isWNote = true;
      }

      // Render Top Edge Zone if clue/question/note exists OR if rect is on top
      if (wVal || isWActive || r.y === minX) {
        const displayVal = wVal || (isWActive ? '?' : '');
        if (displayVal !== '') {
          const strLen = String(displayVal).length;
          const badgeW = Math.max(54, strLen * 10 + 16);
          const bgClass = isWActive ? 'edge-bg active-edge-bg' : (isWNote ? 'edge-bg note-edge-bg' : 'edge-bg');

          svgHtml += `
            <g class="edge-group" data-id="${r.id}" data-type="w">
              <rect x="${sx + sw/2 - badgeW/2}" y="${sy - 26}" width="${badgeW}" height="24" class="${bgClass}" rx="12"/>
              <text x="${sx + sw/2}" y="${sy - 14}" class="${wClass}" text-anchor="middle" dominant-baseline="central">${displayVal}</text>
            </g>
          `;
        }
      }

      // Height Clue / Note (Left Edge)
      let hVal = null;
      let hClass = 'edge-label';
      let isHNote = false;

      if (isHQuestion) {
        hVal = this.userInputs[`${r.id}_h`] !== undefined ? this.userInputs[`${r.id}_h`] : '?';
        hClass = 'edge-label question-label';
      } else if (hClue !== undefined) {
        hVal = `${hClue} cm`;
      } else if (hNote) {
        hVal = `✎ ${hNote}`;
        hClass = 'edge-label note-edge-label';
        isHNote = true;
      }

      // Render Left Edge Zone if clue/question/note exists OR if rect is on left
      if (hVal || isHActive || r.x === minX) {
        const displayVal = hVal || (isHActive ? '?' : '');
        if (displayVal !== '') {
          const strLen = String(displayVal).length;
          const badgeW = Math.max(54, strLen * 10 + 16);
          const centerX = sx - 34;
          const bgClass = isHActive ? 'edge-bg active-edge-bg' : (isHNote ? 'edge-bg note-edge-bg' : 'edge-bg');

          svgHtml += `
            <g class="edge-group" data-id="${r.id}" data-type="h">
              <rect x="${centerX - badgeW/2}" y="${sy + sh/2 - 12}" width="${badgeW}" height="24" class="${bgClass}" rx="12"/>
              <text x="${centerX}" y="${sy + sh/2}" class="${hClass}" text-anchor="middle" dominant-baseline="central">${displayVal}</text>
            </g>
          `;
        }
      }

      svgHtml += `</g>`;
    });

    svgHtml += `</g></svg>`;

    this.container.innerHTML = svgHtml;

    // Attach click listeners for area and edges
    this.container.querySelectorAll('[data-id]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const rectId = el.getAttribute('data-id');
        const type = el.getAttribute('data-type') || 'area';
        this.activeTarget = { rectId, type };
        this.updateHighlights();
        if (this.onSelectTarget) this.onSelectTarget(this.activeTarget);
      });
    });
  }

  updateHighlights() {
    if (!this.container) return;
    const rects = this.container.querySelectorAll('.maze-rect');
    rects.forEach(r => {
      const id = r.getAttribute('data-id');
      if (id === this.activeTarget.rectId && this.activeTarget.type === 'area') {
        r.classList.add('active-rect');
      } else {
        r.classList.remove('active-rect');
      }
      if (this.highlightedRects.has(id)) {
        r.classList.add('highlighted-rect');
      } else {
        r.classList.remove('highlighted-rect');
      }
    });

    const edgeBgs = this.container.querySelectorAll('.edge-bg');
    edgeBgs.forEach(bg => {
      const parent = bg.closest('[data-id][data-type]');
      if (parent) {
        const id = parent.getAttribute('data-id');
        const type = parent.getAttribute('data-type');
        if (id === this.activeTarget.rectId && type === this.activeTarget.type) {
          bg.classList.add('active-edge-bg');
        } else {
          bg.classList.remove('active-edge-bg');
        }
      }
    });
  }
}
