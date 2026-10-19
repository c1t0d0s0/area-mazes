import { PRESET_PUZZLES } from '../engine/PresetPuzzles.js';
import { getOutfit, getProgress } from '../cloud/store.js';
import { normalizeOutfit } from './monkey.js';
import { t } from './i18n.js';

// Rewards: accessories for the squirrel monkey, given for progress on the preset levels.
// They are worked out from the progress every time, so only what the monkey wears is saved.
// ★3 means cleared with at most one hint (see GameView.checkSolution).
const COUNT_REWARD = 50;
const DIFFICULTIES = ['Easy', 'Medium', 'Hard', 'Expert', 'Grandmaster'];
const FILTER_KEYS = { Easy: 'filterEasy', Medium: 'filterMedium', Hard: 'filterHard', Expert: 'filterExpert', Grandmaster: 'filterGrandmaster' };

// In the order of ITEMS in src/utils/monkey.js
export const REWARDS = [
  { item: 'ribbon', kind: 'first' },
  { item: 'flower', kind: 'clear', difficulty: 'Easy' },
  { item: 'glasses', kind: 'stars', difficulty: 'Easy' },
  { item: 'pencil', kind: 'clear', difficulty: 'Medium' },
  { item: 'scarf', kind: 'stars', difficulty: 'Medium' },
  { item: 'book', kind: 'count', count: COUNT_REWARD },
  { item: 'hat', kind: 'clear', difficulty: 'Hard' },
  { item: 'headband', kind: 'stars', difficulty: 'Hard' },
  { item: 'banana', kind: 'clear', difficulty: 'Expert' },
  { item: 'cap', kind: 'stars', difficulty: 'Expert' },
  { item: 'wizard', kind: 'clear', difficulty: 'Grandmaster' },
  { item: 'crown', kind: 'stars', difficulty: 'Grandmaster' }
];

const LEVELS_BY_DIFFICULTY = new Map(DIFFICULTIES.map(d => [d, PRESET_PUZZLES.filter(p => p.difficulty === d)]));

/** The accessories won with the given progress ({ [level id]: { completed, stars } }), as a Set of item ids */
export function earnedRewards(progress) {
  const cleared = level => !!(progress[level.id] && progress[level.id].completed);
  const threeStars = level => cleared(level) && progress[level.id].stars >= 3;
  const clearedCount = PRESET_PUZZLES.filter(cleared).length;

  const earned = REWARDS.filter(reward => {
    const levels = LEVELS_BY_DIFFICULTY.get(reward.difficulty);
    if (reward.kind === 'first') return clearedCount >= 1;
    if (reward.kind === 'count') return clearedCount >= reward.count;
    if (reward.kind === 'clear') return levels.every(cleared);
    return levels.every(threeStars);
  });
  return new Set(earned.map(reward => reward.item));
}

/** How to win the reward, e.g. "Clear all 15 Intro (Easy) levels" */
export function rewardHint(reward) {
  if (reward.kind === 'first') return t('rewardHintFirst');
  if (reward.kind === 'count') return t('rewardHintCount', { count: reward.count });
  const params = { difficulty: t(FILTER_KEYS[reward.difficulty]), count: LEVELS_BY_DIFFICULTY.get(reward.difficulty).length };
  return t(reward.kind === 'clear' ? 'rewardHintClear' : 'rewardHintStars', params);
}

export const itemName = id => t(`item_${id}`);

/** The accessories won with the current progress */
export const earnedNow = () => earnedRewards(getProgress());

/** What the monkey wears: only accessories that were won */
export function currentOutfit(earned = earnedNow()) {
  return normalizeOutfit(getOutfit()).filter(id => earned.has(id));
}
