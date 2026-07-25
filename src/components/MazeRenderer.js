/**
 * MazeRenderer
 * SVG-based interactive renderer for Area Maze diagrams.
 */

export class MazeRenderer {
  constructor(containerEl, { onSelectCell, userInputs = {}, notes = {} } = {}) {
    this.container = containerEl;
    this.onSelectCell = onSelectCell;
    this.userInputs = userInputs; // Map of user entered values
    this.notes = notes; // User pencil notes
    this.model = null;
    this.activeCellId = null;
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

  setActiveCell(cellId) {
    this.activeCellId = cellId;
    this.updateHighlights();
  }

  setHighlights(rectIdArray = []) {
    this.highlightedRects = new Set(rectIdArray);
    this.updateHighlights();
  }

  render() {
    if (!this.model || !this.container) return;

    const { rects, clues, question, minX, minY, maxX, maxY, totalWidth, totalHeight } = this.model;

    const margin = 50;
    const svgWidth = 620;
    const svgHeight = 520;

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
          <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="rgba(99, 102, 241, 0.3)"/>
            <stop offset="100%" stop-color="rgba(139, 92, 246, 0.15)"/>
          </linearGradient>
        </defs>
        <g class="grid-background">
    `;

    // Render Rectangles
    rects.forEach((r) => {
      const sx = toSvgX(r.x);
      const sy = toSvgY(r.y);
      const sw = toSvgW(r.w);
      const sh = toSvgH(r.h);

      const isQuestionTarget = question && question.targetId === r.id && question.type === 'area';
      const isSelected = this.activeCellId === r.id;
      const isHighlighted = this.highlightedRects.has(r.id);

      let rectClass = 'maze-rect';
      if (isQuestionTarget) rectClass += ' question-rect';
      if (isSelected) rectClass += ' active-rect';
      if (isHighlighted) rectClass += ' highlighted-rect';

      // Area Clue or User Input
      const areaClue = clues[`${r.id}_area`];
      const userInputArea = this.userInputs[`${r.id}_area`];
      const noteArea = this.notes[r.id] || this.notes[`${r.id}_area`] || this.notes[`${r.id}_w`] || this.notes[`${r.id}_h`];

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
          <rect 
            x="${sx}" y="${sy}" width="${sw}" height="${sh}" 
            class="${rectClass}" 
            data-id="${r.id}"
            rx="4" ry="4"
          />
      `;

      // Area label inside rectangle
      if (areaText !== '') {
        const textClass = isQuestion ? 'area-label question-label' : 'area-label';
        svgHtml += `
          <text 
            x="${sx + sw / 2}" y="${sy + sh / 2}" 
            class="${textClass}"
            text-anchor="middle" dominant-baseline="central"
          >${areaText}</text>
        `;
      }
      
      // Render pencil note if present
      if (noteArea) {
        const noteY = areaText !== '' ? (sy + sh / 2 + 18) : (sy + sh / 2);
        svgHtml += `
          <text 
            x="${sx + sw / 2}" y="${noteY}" 
            class="note-label"
            text-anchor="middle" dominant-baseline="central"
          >✎ ${noteArea}</text>
        `;
      }

      // Render Edge Clues (Width on top, Height on left)
      const wClue = clues[`${r.id}_w`];
      const hClue = clues[`${r.id}_h`];

      const isWQuestion = question && question.targetId === r.id && question.type === 'w';
      const isHQuestion = question && question.targetId === r.id && question.type === 'h';

      // Width Clue (Top edge)
      if (wClue !== undefined || isWQuestion) {
        const wVal = isWQuestion ? (this.userInputs[`${r.id}_w`] || '?') : `${wClue} cm`;
        const wClass = isWQuestion ? 'edge-label question-label' : 'edge-label';
        const strLen = String(wVal).length;
        const badgeW = Math.max(52, strLen * 10 + 16);

        svgHtml += `
          <rect x="${sx + sw/2 - badgeW/2}" y="${sy - 24}" width="${badgeW}" height="22" class="edge-bg" rx="11"/>
          <text x="${sx + sw/2}" y="${sy - 13}" class="${wClass}" text-anchor="middle" dominant-baseline="central">${wVal}</text>
        `;
      }

      // Height Clue (Left edge)
      if (hClue !== undefined || isHQuestion) {
        const hVal = isHQuestion ? (this.userInputs[`${r.id}_h`] || '?') : `${hClue} cm`;
        const hClass = isHQuestion ? 'edge-label question-label' : 'edge-label';
        const strLen = String(hVal).length;
        const badgeW = Math.max(52, strLen * 10 + 16);
        const centerX = sx - 32;

        svgHtml += `
          <rect x="${centerX - badgeW/2}" y="${sy + sh/2 - 11}" width="${badgeW}" height="22" class="edge-bg" rx="11"/>
          <text x="${centerX}" y="${sy + sh/2}" class="${hClass}" text-anchor="middle" dominant-baseline="central">${hVal}</text>
        `;
      }

      svgHtml += `</g>`;
    });

    svgHtml += `</g></svg>`;

    this.container.innerHTML = svgHtml;

    // Attach click listeners
    const rectGroups = this.container.querySelectorAll('.rect-group');
    rectGroups.forEach(el => {
      el.addEventListener('click', () => {
        const cellId = el.getAttribute('data-id');
        this.activeCellId = cellId;
        this.updateHighlights();
        if (this.onSelectCell) this.onSelectCell(cellId);
      });
    });
  }

  updateHighlights() {
    if (!this.container) return;
    const rects = this.container.querySelectorAll('.maze-rect');
    rects.forEach(r => {
      const id = r.getAttribute('data-id');
      if (id === this.activeCellId) {
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
  }
}
