import { t } from '../utils/i18n.js';

export class AreaMazeSolver {
  constructor(model) {
    this.model = model;
  }

  solve() {
    const knowns = { ...this.model.clues };
    const steps = [];
    const rects = this.model.rects;
    const question = this.model.question;

    const getVal = (key) => knowns[key];
    const setVal = (key, val, stepInfo) => {
      if (knowns[key] === undefined && val !== null && val !== undefined && Number.isInteger(val) && val > 0) {
        knowns[key] = val;
        steps.push({ key, value: val, ...stepInfo });
        return true;
      }
      return false;
    };

    const getRectDesc = (r) => {
      if (question && question.targetId === r.id) {
        return t('rectWithQuestion');
      }
      const area = getVal(`${r.id}_area`);
      const w = getVal(`${r.id}_w`);
      const h = getVal(`${r.id}_h`);

      if (area !== undefined) {
        return t('rectWithArea', { area });
      }
      if (w !== undefined && h !== undefined) {
        return t('rectWithDim', { w, h });
      }
      if (w !== undefined) {
        return t('rectWithWidth', { w });
      }
      if (h !== undefined) {
        return t('rectWithHeight', { h });
      }
      return t('rectHighlighted');
    };

    // Only what is drawn may be used: two edges are "the same line" only when they lie on one
    // continuous line segment of the diagram. Lengths that merely look equal are never assumed equal.
    const lines = {
      w: new LineAxis(rects, 'x', 'w', 'y', 'h'),
      h: new LineAxis(rects, 'y', 'h', 'x', 'w')
    };
    const DIM_RULES = {
      w: { same: 'ruleSameWidth', span: 'ruleSpanWidth', sameExp: 'expSameWidth', chainExp: 'expChainWidth' },
      h: { same: 'ruleSameHeight', span: 'ruleSpanHeight', sameExp: 'expSameHeight', chainExp: 'expChainHeight' }
    };

    // A known side length fixes the distance between the rectangle's two lines
    const linkKnownSides = () => {
      for (const r of rects) {
        for (const dim of ['w', 'h']) {
          const v = getVal(`${r.id}_${dim}`);
          if (v !== undefined) lines[dim].link(r, v, r.id);
        }
      }
    };

    let changed = true;
    let maxIterations = 100;
    let iteration = 0;

    while (changed && iteration < maxIterations) {
      changed = false;
      iteration++;

      // Rule 1: Single Rectangle Formula (A = w * h)
      for (const r of rects) {
        const areaKey = `${r.id}_area`;
        const wKey = `${r.id}_w`;
        const hKey = `${r.id}_h`;

        const area = getVal(areaKey);
        const w = getVal(wKey);
        const h = getVal(hKey);

        if (w !== undefined && h !== undefined && area === undefined) {
          if (setVal(areaKey, w * h, {
            rule: t('ruleAreaCalc'),
            rectId: r.id,
            explanation: t('expAreaCalc', { desc: getRectDesc(r), w, h, area: w * h })
          })) changed = true;
        }

        if (area !== undefined && h !== undefined && w === undefined && area % h === 0) {
          if (setVal(wKey, area / h, {
            rule: t('ruleWidthCalc'),
            rectId: r.id,
            explanation: t('expWidthCalc', { desc: getRectDesc(r), area, h, w: area / h })
          })) changed = true;
        }

        if (area !== undefined && w !== undefined && h === undefined && area % w === 0) {
          if (setVal(hKey, area / w, {
            rule: t('ruleHeightCalc'),
            rectId: r.id,
            explanation: t('expHeightCalc', { desc: getRectDesc(r), area, w, h: area / w })
          })) changed = true;
        }
      }

      // Rule 2: Lengths along connected lines.
      // If the two lines bounding a rectangle are linked by sides of known length, its side is
      // their sum/difference. A rectangle sharing both lines is the simplest case (same width/height).
      linkKnownSides();
      for (const r of rects) {
        for (const dim of ['w', 'h']) {
          const key = `${r.id}_${dim}`;
          if (getVal(key) !== undefined) continue;
          const axis = lines[dim];
          const value = axis.distance(r);
          if (value === undefined) continue;

          const path = axis.path(r);
          const names = DIM_RULES[dim];
          let stepInfo;
          if (path.length === 1) {
            const other = rects.find(o => o.id === path[0].id);
            stepInfo = {
              rule: t(names.same),
              rectId: r.id,
              explanation: t(names.sameExp, { desc1: getRectDesc(other), desc2: getRectDesc(r), [dim]: value })
            };
          } else {
            const plus = path.filter(e => e.sign > 0).map(e => `${getVal(`${e.id}_${dim}`)} cm`);
            const minus = path.filter(e => e.sign < 0).map(e => `${getVal(`${e.id}_${dim}`)} cm`);
            stepInfo = {
              rule: t(names.span),
              rectId: r.id,
              explanation: t(names.chainExp, { expr: [plus.join(' + '), ...minus].join(' − '), desc: getRectDesc(r), [dim]: value })
            };
          }
          if (setVal(key, value, stepInfo)) {
            axis.link(r, value, r.id);
            changed = true;
          }
        }
      }

      // Rule 3: Area & Side Ratios (only for rectangles whose heights/widths are equal by the drawing)
      for (let i = 0; i < rects.length; i++) {
        for (let j = i + 1; j < rects.length; j++) {
          const r1 = rects[i];
          const r2 = rects[j];

          if (lines.h.sameLength(r1, r2)) {
            const a1 = getVal(`${r1.id}_area`);
            const a2 = getVal(`${r2.id}_area`);
            const w1 = getVal(`${r1.id}_w`);
            const w2 = getVal(`${r2.id}_w`);

            if (a1 !== undefined && a2 !== undefined && w1 !== undefined && w2 === undefined) {
              if ((w1 * a2) % a1 === 0) {
                const targetW = (w1 * a2) / a1;
                if (setVal(`${r2.id}_w`, targetW, {
                  rule: t('ruleAreaRatio'),
                  rectId: r2.id,
                  explanation: t('expAreaRatioW', { desc1: getRectDesc(r1), a1, a2, desc2: getRectDesc(r2), w: targetW })
                })) changed = true;
              }
            } else if (a1 !== undefined && a2 !== undefined && w2 !== undefined && w1 === undefined) {
              if ((w2 * a1) % a2 === 0) {
                const targetW = (w2 * a1) / a2;
                if (setVal(`${r1.id}_w`, targetW, {
                  rule: t('ruleAreaRatio'),
                  rectId: r1.id,
                  explanation: t('expAreaRatioW', { desc1: getRectDesc(r2), a1: a2, a2: a1, desc2: getRectDesc(r1), w: targetW })
                })) changed = true;
              }
            }
          }

          if (lines.w.sameLength(r1, r2)) {
            const a1 = getVal(`${r1.id}_area`);
            const a2 = getVal(`${r2.id}_area`);
            const h1 = getVal(`${r1.id}_h`);
            const h2 = getVal(`${r2.id}_h`);

            if (a1 !== undefined && a2 !== undefined && h1 !== undefined && h2 === undefined) {
              if ((h1 * a2) % a1 === 0) {
                const targetH = (h1 * a2) / a1;
                if (setVal(`${r2.id}_h`, targetH, {
                  rule: t('ruleAreaRatio'),
                  rectId: r2.id,
                  explanation: t('expAreaRatioH', { desc1: getRectDesc(r1), a1, a2, desc2: getRectDesc(r2), h: targetH })
                })) changed = true;
              }
            } else if (a1 !== undefined && a2 !== undefined && h2 !== undefined && h1 === undefined) {
              if ((h2 * a1) % a2 === 0) {
                const targetH = (h2 * a1) / a2;
                if (setVal(`${r1.id}_h`, targetH, {
                  rule: t('ruleAreaRatio'),
                  rectId: r1.id,
                  explanation: t('expAreaRatioH', { desc1: getRectDesc(r2), a1: a2, a2: a1, desc2: getRectDesc(r1), h: targetH })
                })) changed = true;
              }
            }
          }
        }
      }
    }

    const questionKey = `${this.model.question.targetId}_${this.model.question.type}`;
    const solvedVal = knowns[questionKey];
    const isSolved = solvedVal !== undefined;

    return {
      isSolved,
      solution: solvedVal,
      knowns,
      steps,
      difficultyRating: steps.length
    };
  }
}

/**
 * LineAxis
 * The lines of the diagram along one axis (vertical lines for widths, horizontal lines for heights).
 * Edges at the same coordinate form one line only where they touch or overlap; a gap splits them.
 * Known side lengths are recorded as distances between lines (weighted union-find), so a side is known
 * exactly when its two lines are connected through sides of known length.
 */
class LineAxis {
  constructor(rects, pos, len, crossPos, crossLen) {
    const edges = {};
    for (const r of rects) {
      for (const at of [r[pos], r[pos] + r[len]]) {
        (edges[at] = edges[at] || []).push([r[crossPos], r[crossPos] + r[crossLen]]);
      }
    }

    const segments = [];
    for (const [at, spans] of Object.entries(edges)) {
      spans.sort((a, b) => a[0] - b[0]);
      let current = null;
      for (const [from, to] of spans) {
        if (current && from <= current.to) {
          current.to = Math.max(current.to, to);
        } else {
          current = { at: Number(at), from, to };
          segments.push(current);
        }
      }
    }

    const lineOf = (at, from, to) => segments.findIndex(s => s.at === at && s.from <= from && to <= s.to);
    // Each rectangle's two lines: [start (left/top), end (right/bottom)]
    this.ends = new Map(rects.map(r => [r.id, [
      lineOf(r[pos], r[crossPos], r[crossPos] + r[crossLen]),
      lineOf(r[pos] + r[len], r[crossPos], r[crossPos] + r[crossLen])
    ]]));

    this.parent = segments.map((_, i) => i);
    this.offset = segments.map(() => 0); // position relative to parent
    this.links = []; // { a, b, length, id }: line b lies `length` after line a, by side `id`
  }

  root(i) {
    if (this.parent[i] === i) return i;
    const r = this.root(this.parent[i]);
    this.offset[i] += this.offset[this.parent[i]];
    this.parent[i] = r;
    return r;
  }

  // Distance from line a to line b, or undefined if it cannot be read from the known sides
  between(a, b) {
    if (this.root(a) !== this.root(b)) return undefined;
    return this.offset[b] - this.offset[a];
  }

  link(rect, length, id) {
    const [a, b] = this.ends.get(rect.id);
    const ra = this.root(a);
    const rb = this.root(b);
    if (ra === rb) return;
    this.parent[rb] = ra;
    this.offset[rb] = this.offset[a] + length - this.offset[b];
    this.links.push({ a, b, id });
  }

  distance(rect) {
    const [a, b] = this.ends.get(rect.id);
    const d = this.between(a, b);
    return d !== undefined && d > 0 ? d : undefined;
  }

  // Whether the drawing makes the two rectangles' sides equal (their lines are pairwise aligned)
  sameLength(r1, r2) {
    const [a1, b1] = this.ends.get(r1.id);
    const [a2, b2] = this.ends.get(r2.id);
    return this.between(a1, a2) === 0 && this.between(b1, b2) === 0;
  }

  // Shortest chain of known sides from the rectangle's start line to its end line: [{ id, sign }]
  path(rect) {
    const [start, goal] = this.ends.get(rect.id);
    const prev = new Map([[start, null]]);
    const queue = [start];
    while (queue.length > 0 && !prev.has(goal)) {
      const line = queue.shift();
      for (const l of this.links) {
        if (l.id === rect.id) continue;
        for (const [from, to, sign] of [[l.a, l.b, 1], [l.b, l.a, -1]]) {
          if (from === line && !prev.has(to)) {
            prev.set(to, { line, id: l.id, sign });
            queue.push(to);
          }
        }
      }
    }
    const steps = [];
    for (let at = goal; prev.get(at); at = prev.get(at).line) {
      const { id, sign } = prev.get(at);
      steps.unshift({ id, sign });
    }
    return steps;
  }
}
