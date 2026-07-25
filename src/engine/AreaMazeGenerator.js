import { AreaMazeModel } from './AreaMazeModel.js';
import { AreaMazeSolver } from './AreaMazeSolver.js';

export class AreaMazeGenerator {
  /**
   * Generates a procedurally generated Area Maze puzzle.
   * @param {string} difficulty - 'Easy' | 'Medium' | 'Hard' | 'Expert' | 'Grandmaster'
   * @returns {AreaMazeModel}
   */
  static generate(difficulty = 'Medium') {
    let bestModel = null;
    let attempts = 0;

    while (attempts < 100) {
      attempts++;
      const rects = this.generateRectLayout(difficulty);
      if (!rects || rects.length < 3) continue;

      // Pick a random target question rectangle
      const targetRect = rects[Math.floor(Math.random() * rects.length)];
      const questionTypes = ['area', 'w', 'h'];
      const qType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      const question = { targetId: targetRect.id, type: qType };

      // Compute exact solution
      let solution = 0;
      if (qType === 'area') solution = targetRect.w * targetRect.h;
      else if (qType === 'w') solution = targetRect.w;
      else if (qType === 'h') solution = targetRect.h;

      // Build full clue set
      const allClues = {};
      rects.forEach(r => {
        allClues[`${r.id}_area`] = r.w * r.h;
        allClues[`${r.id}_w`] = r.w;
        allClues[`${r.id}_h`] = r.h;
      });

      // Remove target question clue
      delete allClues[`${targetRect.id}_${qType}`];

      // Randomly prune non-essential clues while maintaining 100% unique solvability
      const clueKeys = Object.keys(allClues).sort(() => Math.random() - 0.5);
      const activeClues = { ...allClues };

      for (const key of clueKeys) {
        const tempClues = { ...activeClues };
        delete tempClues[key];

        const testModel = new AreaMazeModel({
          id: `gen_${Date.now()}_${attempts}`,
          title: `${difficulty} パズル #${Math.floor(Math.random() * 900 + 100)}`,
          difficulty,
          rects,
          clues: tempClues,
          question,
          solution
        });

        const solver = new AreaMazeSolver(testModel);
        const result = solver.solve();

        if (result.isSolved && result.solution === solution) {
          delete activeClues[key];
        }
      }

      const finalModel = new AreaMazeModel({
        id: `gen_${Date.now()}_${attempts}`,
        title: `${difficulty} パズル #${Math.floor(Math.random() * 900 + 100)}`,
        difficulty,
        rects,
        clues: activeClues,
        question,
        solution
      });

      const finalSolver = new AreaMazeSolver(finalModel);
      const finalResult = finalSolver.solve();

      if (finalResult.isSolved && finalResult.solution === solution) {
        bestModel = finalModel;
        break;
      }
    }

    if (!bestModel) {
      bestModel = this.getFallbackModel(difficulty);
    }

    return bestModel;
  }

  static generateRectLayout(difficulty) {
    const rects = [];
    let idCounter = 1;

    if (difficulty === 'Easy') {
      // 3 Rectangles layout (2 top, 1 bottom)
      const w1 = [3, 4, 5][Math.floor(Math.random() * 3)];
      const w2 = [4, 5, 6][Math.floor(Math.random() * 3)];
      const h1 = [3, 4, 5][Math.floor(Math.random() * 3)];
      const h2 = [3, 4, 5][Math.floor(Math.random() * 3)];

      rects.push({ id: 'A1', x: 0, y: 0, w: w1, h: h1 });
      rects.push({ id: 'A2', x: w1, y: 0, w: w2, h: h1 });
      rects.push({ id: 'A3', x: 0, y: h1, w: w1 + w2, h: h2 });
    } else if (difficulty === 'Medium') {
      // 4 Rectangles grid (2x2)
      const w1 = [3, 4, 5][Math.floor(Math.random() * 3)];
      const w2 = [4, 5, 6][Math.floor(Math.random() * 3)];
      const h1 = [3, 4][Math.floor(Math.random() * 2)];
      const h2 = [4, 5][Math.floor(Math.random() * 2)];

      rects.push({ id: 'A1', x: 0, y: 0, w: w1, h: h1 });
      rects.push({ id: 'A2', x: w1, y: 0, w: w2, h: h1 });
      rects.push({ id: 'A3', x: 0, y: h1, w: w1, h: h2 });
      rects.push({ id: 'A4', x: w1, y: h1, w: w2, h: h2 });
    } else {
      // 5-6 Rectangles layout
      const w1 = [3, 4][Math.floor(Math.random() * 2)];
      const w2 = [4, 5][Math.floor(Math.random() * 2)];
      const w3 = [3, 5][Math.floor(Math.random() * 2)];
      const h1 = [3, 4][Math.floor(Math.random() * 2)];
      const h2 = [4, 5][Math.floor(Math.random() * 2)];

      rects.push({ id: 'A1', x: 0, y: 0, w: w1, h: h1 });
      rects.push({ id: 'A2', x: w1, y: 0, w: w2, h: h1 });
      rects.push({ id: 'A3', x: w1 + w2, y: 0, w: w3, h: h1 });
      rects.push({ id: 'A4', x: 0, y: h1, w: w1 + w2, h: h2 });
      rects.push({ id: 'A5', x: w1 + w2, y: h1, w: w3, h: h2 });
    }

    return rects;
  }

  static getFallbackModel(difficulty) {
    return new AreaMazeModel({
      id: `fallback_${difficulty.toLowerCase()}`,
      title: `${difficulty} パズル`,
      difficulty,
      rects: [
        { id: 'A1', x: 0, y: 0, w: 4, h: 3 },
        { id: 'A2', x: 4, y: 0, w: 6, h: 3 },
        { id: 'A3', x: 0, y: 3, w: 10, h: 4 }
      ],
      clues: {
        'A1_area': 12,
        'A1_h': 3,
        'A2_area': 18,
        'A3_w': 10,
        'A3_area': 40
      },
      question: { targetId: 'A3', type: 'h' },
      solution: 4
    });
  }
}
