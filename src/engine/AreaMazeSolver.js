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

    // Group rects by y-level and x-level
    const yLevels = [...new Set(rects.map(r => r.y))];
    const xLevels = [...new Set(rects.map(r => r.x))];

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

      // Rule 2: Shared Edges / Alignments
      for (let i = 0; i < rects.length; i++) {
        for (let j = i + 1; j < rects.length; j++) {
          const r1 = rects[i];
          const r2 = rects[j];

          // Same height rectangle alignment
          if (r1.h === r2.h) {
            const h1 = getVal(`${r1.id}_h`);
            const h2 = getVal(`${r2.id}_h`);
            if (h1 !== undefined && h2 === undefined) {
              if (setVal(`${r2.id}_h`, h1, {
                rule: t('ruleSameHeight'),
                rectId: r2.id,
                explanation: t('expSameHeight', { desc1: getRectDesc(r1), desc2: getRectDesc(r2), h: h1 })
              })) changed = true;
            } else if (h2 !== undefined && h1 === undefined) {
              if (setVal(`${r1.id}_h`, h2, {
                rule: t('ruleSameHeight'),
                rectId: r1.id,
                explanation: t('expSameHeight', { desc1: getRectDesc(r2), desc2: getRectDesc(r1), h: h2 })
              })) changed = true;
            }
          }

          // Same width rectangle alignment
          if (r1.w === r2.w) {
            const w1 = getVal(`${r1.id}_w`);
            const w2 = getVal(`${r2.id}_w`);
            if (w1 !== undefined && w2 === undefined) {
              if (setVal(`${r2.id}_w`, w1, {
                rule: t('ruleSameWidth'),
                rectId: r2.id,
                explanation: t('expSameWidth', { desc1: getRectDesc(r1), desc2: getRectDesc(r2), w: w1 })
              })) changed = true;
            } else if (w2 !== undefined && w1 === undefined) {
              if (setVal(`${r1.id}_w`, w2, {
                rule: t('ruleSameWidth'),
                rectId: r1.id,
                explanation: t('expSameWidth', { desc1: getRectDesc(r2), desc2: getRectDesc(r1), w: w2 })
              })) changed = true;
            }
          }
        }
      }

      // Rule 3: Row & Column Total Span Addition / Subtraction
      for (const y of yLevels) {
        const rowRects = rects.filter(r => r.y === y);
        for (const otherY of yLevels) {
          if (otherY === y) continue;
          const otherRowRects = rects.filter(r => r.y === otherY);

          const minX1 = Math.min(...rowRects.map(r => r.x));
          const maxX1 = Math.max(...rowRects.map(r => r.x + r.w));
          const minX2 = Math.min(...otherRowRects.map(r => r.x));
          const maxX2 = Math.max(...otherRowRects.map(r => r.x + r.w));

          if (minX1 === minX2 && maxX1 === maxX2) {
            const row1Vals = rowRects.map(r => getVal(`${r.id}_w`));
            const row2Vals = otherRowRects.map(r => getVal(`${r.id}_w`));

            const row1Known = row1Vals.every(v => v !== undefined);
            if (row1Known) {
              const totalW = row1Vals.reduce((sum, v) => sum + v, 0);
              const unknownInRow2 = otherRowRects.filter((r, idx) => row2Vals[idx] === undefined);

              if (unknownInRow2.length === 1) {
                const targetR = unknownInRow2[0];
                const knownSum2 = row2Vals.filter(v => v !== undefined).reduce((sum, v) => sum + v, 0);
                const missingW = totalW - knownSum2;
                if (setVal(`${targetR.id}_w`, missingW, {
                  rule: t('ruleSpanWidth'),
                  rectId: targetR.id,
                  explanation: t('expSpanWidth', { totalW, desc: getRectDesc(targetR), w: missingW })
                })) changed = true;
              }
            }
          }
        }
      }

      for (const x of xLevels) {
        const colRects = rects.filter(r => r.x === x);
        for (const otherX of xLevels) {
          if (otherX === x) continue;
          const otherColRects = rects.filter(r => r.x === otherX);

          const minY1 = Math.min(...colRects.map(r => r.y));
          const maxY1 = Math.max(...colRects.map(r => r.y + r.h));
          const minY2 = Math.min(...otherColRects.map(r => r.y));
          const maxY2 = Math.max(...otherColRects.map(r => r.y + r.h));

          if (minY1 === minY2 && maxY1 === maxY2) {
            const col1Vals = colRects.map(r => getVal(`${r.id}_h`));
            const col2Vals = otherColRects.map(r => getVal(`${r.id}_h`));

            const col1Known = col1Vals.every(v => v !== undefined);
            if (col1Known) {
              const totalH = col1Vals.reduce((sum, v) => sum + v, 0);
              const unknownInCol2 = otherColRects.filter((r, idx) => col2Vals[idx] === undefined);

              if (unknownInCol2.length === 1) {
                const targetR = unknownInCol2[0];
                const knownSum2 = col2Vals.filter(v => v !== undefined).reduce((sum, v) => sum + v, 0);
                const missingH = totalH - knownSum2;
                if (setVal(`${targetR.id}_h`, missingH, {
                  rule: t('ruleSpanHeight'),
                  rectId: targetR.id,
                  explanation: t('expSpanHeight', { totalH, desc: getRectDesc(targetR), h: missingH })
                })) changed = true;
              }
            }
          }
        }
      }

      // Rule 4: Area & Side Ratios
      for (let i = 0; i < rects.length; i++) {
        for (let j = i + 1; j < rects.length; j++) {
          const r1 = rects[i];
          const r2 = rects[j];

          if (r1.h === r2.h) {
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

          if (r1.w === r2.w) {
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
