// Checks that every puzzle can be solved by logic alone, without guessing lengths from how the diagram looks.
// - every preset level is solved by AreaMazeSolver and the answer matches its solution
// - every value the solver deduces matches the real geometry (no wrong reasoning)
// - the random generator only produces puzzles that pass the same checks
// Run: npm run check:puzzles
import { PRESET_PUZZLES } from '../src/engine/PresetPuzzles.js';
import { AreaMazeGenerator } from '../src/engine/AreaMazeGenerator.js';
import { AreaMazeModel } from '../src/engine/AreaMazeModel.js';
import { AreaMazeSolver } from '../src/engine/AreaMazeSolver.js';

const GENERATED_PER_DIFFICULTY = 30;
const problems = [];

function check(model, label) {
  const result = new AreaMazeSolver(model).solve();
  if (!result.isSolved || result.solution !== model.solution) {
    problems.push(`${label}: not solvable by logic (expected ${model.solution}, got ${result.solution})`);
  }
  for (const [key, value] of Object.entries(result.knowns)) {
    const [, id, type] = key.match(/^(.*)_(area|w|h)$/);
    const rect = model.rects.find(r => r.id === id);
    const actual = type === 'w' ? rect.w : type === 'h' ? rect.h : rect.w * rect.h;
    if (value !== actual) problems.push(`${label}: ${key} is ${value}, but the real value is ${actual}`);
  }
}

for (const level of PRESET_PUZZLES) {
  check(new AreaMazeModel(structuredClone(level)), level.id);
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
