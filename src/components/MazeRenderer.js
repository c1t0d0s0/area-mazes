/**
 * MazeRenderer
 * SVG-based interactive renderer for Area Maze diagrams.
 * Uses uniform 1:1 aspect ratio scaling so rectangles render in their true geometric proportions.
 */

export class MazeRenderer {
  constructor(containerEl, { onSelectTarget, userInputs = {}, notes = {}, isNoteMode = false } = {}) {
    this.container = containerEl;
    this.onSelectTarget = onSelectTarget;
    this.userInputs = userInputs;
    this.notes = notes;
    this.isNoteMode = isNoteMode;
    this.model = null;
    this.activeTarget = { rectId: null, type: 'area' };
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

  setNoteMode(isNoteMode) {
    this.isNoteMode = isNoteMode;
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

    // Use uniform scale to preserve true geometric aspect ratio (no artificial square stretching)
    const scale = Math.min(drawW / (totalWidth || 1), drawH / (totalHeight || 1));
    const offsetX = margin + (drawW - totalWidth * scale) / 2;
    const offsetY = margin + (drawH - totalHeight * scale) / 2;

    const toSvgX = (x) => offsetX + (x - minX) * scale;
    const toSvgY = (y) => offsetY + (y - minY) * scale;
    const toSvgW = (w) => w * scale;
    const toSvgH = (h) => h * scale;

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

      // Render hint focus badge if highlighted
      if (isHighlighted) {
        svgHtml += `
          <rect x="${sx + sw/2 - 36}" y="${sy + 6}" width="72" height="18" class="hint-focus-bg" rx="9"/>
          <text x="${sx + sw/2}" y="${sy + 14}" class="hint-focus-label" text-anchor="middle" dominant-baseline="central">💡 ここに着目</text>
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

      const displayWVal = wVal || (isWActive ? '?' : (this.isNoteMode ? '+幅' : null));
      const isPlaceholderW = !wVal && !isWActive;

      if (displayWVal !== null) {
        const strLenW = String(displayWVal).length;
        const badgeW = Math.max(48, strLenW * 9 + 14);
        let bgClassW = 'edge-bg';
        if (isWActive) bgClassW += ' active-edge-bg';
        if (isWNote) bgClassW += ' note-edge-bg';
        if (isPlaceholderW) bgClassW += ' placeholder-edge-bg';

        svgHtml += `
          <g class="edge-group" data-id="${r.id}" data-type="w">
            <rect x="${sx + sw/2 - badgeW/2}" y="${sy - 24}" width="${badgeW}" height="22" class="${bgClassW}" rx="11"/>
            <text x="${sx + sw/2}" y="${sy - 13}" class="${wClass} ${isPlaceholderW ? 'placeholder-label' : ''}" text-anchor="middle" dominant-baseline="central">${displayWVal}</text>
          </g>
        `;
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

      const displayHVal = hVal || (isHActive ? '?' : (this.isNoteMode ? '+高' : null));
      const isPlaceholderH = !hVal && !isHActive;

      if (displayHVal !== null) {
        const strLenH = String(displayHVal).length;
        const badgeH = Math.max(48, strLenH * 9 + 14);
        const centerX = sx - 32;
        let bgClassH = 'edge-bg';
        if (isHActive) bgClassH += ' active-edge-bg';
        if (isHNote) bgClassH += ' note-edge-bg';
        if (isPlaceholderH) bgClassH += ' placeholder-edge-bg';

        svgHtml += `
          <g class="edge-group" data-id="${r.id}" data-type="h">
            <rect x="${centerX - badgeH/2}" y="${sy + sh/2 - 11}" width="${badgeH}" height="22" class="${bgClassH}" rx="11"/>
            <text x="${centerX}" y="${sy + sh/2}" class="${hClass} ${isPlaceholderH ? 'placeholder-label' : ''}" text-anchor="middle" dominant-baseline="central">${displayHVal}</text>
          </g>
        `;
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

    // Update main rect body highlight
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

    // Update edge group highlights
    const edgeGroups = this.container.querySelectorAll('.edge-group');
    edgeGroups.forEach(grp => {
      const id = grp.getAttribute('data-id');
      const type = grp.getAttribute('data-type');
      const bg = grp.querySelector('.edge-bg');

      if (bg) {
        if (id === this.activeTarget.rectId && type === this.activeTarget.type) {
          bg.classList.add('active-edge-bg');
        } else {
          bg.classList.remove('active-edge-bg');
        }
      }
    });
  }
}
