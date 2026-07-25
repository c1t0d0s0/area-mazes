/**
 * AreaMazeSolver
 * Step-by-step constraint solver for Area Maze diagrams.
 * Generates user-friendly explanations with visual indicators.
 */

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
        return '【「 ? 」のある長方形】';
      }
      const area = getVal(`${r.id}_area`);
      const w = getVal(`${r.id}_w`);
      const h = getVal(`${r.id}_h`);

      if (area !== undefined) {
        return `【面積 ${area} cm² の長方形】`;
      }
      if (w !== undefined && h !== undefined) {
        return `【幅 ${w} cm・高さ ${h} cm の長方形】`;
      }
      if (w !== undefined) {
        return `【幅 ${w} cm の長方形】`;
      }
      if (h !== undefined) {
        return `【高さ ${h} cm の長方形】`;
      }
      return '【ハイライト中の長方形】';
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
            rule: '面積の計算',
            rectId: r.id,
            explanation: `光っている${getRectDesc(r)} の 幅 (${w} cm) × 高さ (${h} cm) から、面積 = ${w * h} cm²`
          })) changed = true;
        }

        if (area !== undefined && h !== undefined && w === undefined && area % h === 0) {
          if (setVal(wKey, area / h, {
            rule: '幅の計算',
            rectId: r.id,
            explanation: `光っている${getRectDesc(r)} の 面積 (${area} cm²) ÷ 高さ (${h} cm) から、幅 = ${area / h} cm`
          })) changed = true;
        }

        if (area !== undefined && w !== undefined && h === undefined && area % w === 0) {
          if (setVal(hKey, area / w, {
            rule: '高さの計算',
            rectId: r.id,
            explanation: `光っている${getRectDesc(r)} の 面積 (${area} cm²) ÷ 幅 (${w} cm) から、高さ = ${area / w} cm`
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
                rule: '高さを揃える',
                rectId: r2.id,
                explanation: `${getRectDesc(r1)} と高さが共通しているため、光っている${getRectDesc(r2)} の高さ = ${h1} cm`
              })) changed = true;
            } else if (h2 !== undefined && h1 === undefined) {
              if (setVal(`${r1.id}_h`, h2, {
                rule: '高さを揃える',
                rectId: r1.id,
                explanation: `${getRectDesc(r2)} と高さが共通しているため、光っている${getRectDesc(r1)} の高さ = ${h2} cm`
              })) changed = true;
            }
          }

          // Same width rectangle alignment
          if (r1.w === r2.w) {
            const w1 = getVal(`${r1.id}_w`);
            const w2 = getVal(`${r2.id}_w`);
            if (w1 !== undefined && w2 === undefined) {
              if (setVal(`${r2.id}_w`, w1, {
                rule: '幅を揃える',
                rectId: r2.id,
                explanation: `${getRectDesc(r1)} と幅が共通しているため、光っている${getRectDesc(r2)} の幅 = ${w1} cm`
              })) changed = true;
            } else if (w2 !== undefined && w1 === undefined) {
              if (setVal(`${r1.id}_w`, w2, {
                rule: '幅を揃える',
                rectId: r1.id,
                explanation: `${getRectDesc(r2)} と幅が共通しているため、光っている${getRectDesc(r1)} の幅 = ${w2} cm`
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
                  rule: '全体の幅の引き算',
                  rectId: targetR.id,
                  explanation: `全体の横幅 (${totalW} cm) から並んだ幅を引いて、光っている${getRectDesc(targetR)} の幅 = ${missingW} cm`
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
                  rule: '全体の高さの引き算',
                  rectId: targetR.id,
                  explanation: `全体の縦の高さ (${totalH} cm) から並んだ高さを引いて、光っている${getRectDesc(targetR)} の高さ = ${missingH} cm`
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
                  rule: '面積比の計算',
                  rectId: r2.id,
                  explanation: `同高の${getRectDesc(r1)} との面積比 (${a1}:${a2}) から、光っている${getRectDesc(r2)} の幅 = ${targetW} cm`
                })) changed = true;
              }
            } else if (a1 !== undefined && a2 !== undefined && w2 !== undefined && w1 === undefined) {
              if ((w2 * a1) % a2 === 0) {
                const targetW = (w2 * a1) / a2;
                if (setVal(`${r1.id}_w`, targetW, {
                  rule: '面積比の計算',
                  rectId: r1.id,
                  explanation: `同高の${getRectDesc(r2)} との面積比 (${a2}:${a1}) から、光っている${getRectDesc(r1)} の幅 = ${targetW} cm`
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
                  rule: '面積比の計算',
                  rectId: r2.id,
                  explanation: `同幅の${getRectDesc(r1)} との面積比 (${a1}:${a2}) から、光っている${getRectDesc(r2)} の高さ = ${targetH} cm`
                })) changed = true;
              }
            } else if (a1 !== undefined && a2 !== undefined && h2 !== undefined && h1 === undefined) {
              if ((h2 * a1) % a2 === 0) {
                const targetH = (h2 * a1) / a2;
                if (setVal(`${r1.id}_h`, targetH, {
                  rule: '面積比の計算',
                  rectId: r1.id,
                  explanation: `同幅の${getRectDesc(r2)} との面積比 (${a2}:${a1}) から、光っている${getRectDesc(r1)} の高さ = ${targetH} cm`
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
