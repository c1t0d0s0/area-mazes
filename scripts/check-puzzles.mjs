// Checks that every puzzle can be solved by logic alone, without guessing lengths from how the diagram looks.
// - every preset level is solved by AreaMazeSolver and the answer matches its solution
// - every value the solver deduces matches the real geometry (no wrong reasoning)
// - the answer is not given, and cannot be found from the question's own rectangle alone (needsReasoning)
// - the random generator only produces puzzles that pass the same checks
// Run: npm run check:puzzles
import { PRESET_PUZZLES } from '../src/engine/PresetPuzzles.js';
import { AreaMazeGenerator } from '../src/engine/AreaMazeGenerator.js';
import { AreaMazeModel } from '../src/engine/AreaMazeModel.js';
import { AreaMazeSolver, needsReasoning } from '../src/engine/AreaMazeSolver.js';

const GENERATED_PER_DIFFICULTY = 30;
const problems = [];

function isNonRectangular(rects) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  let unionArea = 0;
  for (const r of rects) {
    minX = Math.min(minX, r.x);
    minY = Math.min(minY, r.y);
    maxX = Math.max(maxX, r.x + r.w);
    maxY = Math.max(maxY, r.y + r.h);
    unionArea += r.w * r.h;
  }
  const bboxArea = (maxX - minX) * (maxY - minY);
  return unionArea < bboxArea;
}

function isTouching(r1, r2) {
  const xOverlap = Math.min(r1.x + r1.w, r2.x + r2.w) - Math.max(r1.x, r2.x);
  const yOverlap = Math.min(r1.y + r1.h, r2.y + r2.h) - Math.max(r1.y, r2.y);
  if (xOverlap > 0 && (r1.y + r1.h === r2.y || r2.y + r2.h === r1.y)) return true;
  if (yOverlap > 0 && (r1.x + r1.w === r2.x || r2.x + r2.w === r1.x)) return true;
  return false;
}

function checkAntiGuessing(model, label) {
  const targetId = model.question?.targetId;
  const targetType = model.question?.type || 'area';
  const targetRect = model.rects.find(r => r.id === targetId);
  const solution = model.solution;

  // 1. Target solution must not match neighbor area, width, or height
  if (targetRect) {
    const neighbors = model.rects.filter(r => r.id !== targetId && isTouching(targetRect, r));
    for (const n of neighbors) {
      const nArea = (model.clues && model.clues[`${n.id}_area`]) || (n.w * n.h);
      const nW = (model.clues && model.clues[`${n.id}_w`]) || n.w;
      const nH = (model.clues && model.clues[`${n.id}_h`]) || n.h;
      if (solution === nArea) {
        problems.push(`${label}: Target solution ${solution} matches neighbor ${n.id} area ${nArea}`);
      }
      if (targetType === 'area' && (solution === nW || solution === nH)) {
        problems.push(`${label}: Target area ${solution} matches neighbor ${n.id} dimension (w=${nW}, h=${nH})`);
      }
    }
  }

  // 2. No two touching rectangles have the exact same area
  for (let i = 0; i < model.rects.length; i++) {
    for (let j = i + 1; j < model.rects.length; j++) {
      const r1 = model.rects[i];
      const r2 = model.rects[j];
      if (isTouching(r1, r2)) {
        const a1 = r1.w * r1.h;
        const a2 = r2.w * r2.h;
        if (a1 === a2) {
          problems.push(`${label}: Touching rectangles ${r1.id} and ${r2.id} both have area ${a1}`);
        }
      }
    }
  }

  // 3. No single area value appears 3 or more times
  const areaCounts = {};
  for (const r of model.rects) {
    const a = r.w * r.h;
    areaCounts[a] = (areaCounts[a] || 0) + 1;
    if (areaCounts[a] >= 3) {
      problems.push(`${label}: Area ${a} appears ${areaCounts[a]} times across the board`);
    }
  }
}

function check(model, label, options = {}) {
  if (model.difficulty === 'Grandmaster' && !isNonRectangular(model.rects)) {
    problems.push(`${label}: Grandmaster puzzle must have a non-rectangular outer boundary`);
  }
  if (options.antiGuessing && model.difficulty === 'Grandmaster') {
    checkAntiGuessing(model, label);
  }
  const result = new AreaMazeSolver(model).solve();
  if (!result.isSolved || result.solution !== model.solution) {
    problems.push(`${label}: not solvable by logic (expected ${model.solution}, got ${result.solution})`);
  }
  if (!needsReasoning(model)) {
    problems.push(`${label}: just an area calculation on the question's own rectangle`);
  }
  for (const [key, value] of Object.entries(result.knowns)) {
    const [, id, type] = key.match(/^(.*)_(area|w|h)$/);
    const rect = model.rects.find(r => r.id === id);
    const actual = type === 'w' ? rect.w : type === 'h' ? rect.h : rect.w * rect.h;
    if (value !== actual) problems.push(`${label}: ${key} is ${value}, but the real value is ${actual}`);
  }
}

for (const level of PRESET_PUZZLES) {
  check(new AreaMazeModel(structuredClone(level)), level.id, { antiGuessing: true });
}

for (const difficulty of ['Easy', 'Medium', 'Hard', 'Expert', 'Grandmaster']) {
  check(AreaMazeGenerator.getFallbackModel(difficulty), `fallback ${difficulty}`);
  for (let i = 0; i < GENERATED_PER_DIFFICULTY; i++) {
    check(AreaMazeGenerator.generate(difficulty), `generated ${difficulty} #${i + 1}`);
  }
}

if (problems.length > 0) {
  console.error(problems.join('\n'));
  console.error(`\n${problems.length} problem(s) found`);
  process.exit(1);
}
console.log(`OK: ${PRESET_PUZZLES.length} preset levels and ${GENERATED_PER_DIFFICULTY * 5} generated puzzles are solvable by logic alone`);
