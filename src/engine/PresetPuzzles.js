import { AreaMazeModel } from './AreaMazeModel.js';

export const PRESET_PUZZLES = [
  // EASY PUZZLES (Levels 1 - 6)
  {
    id: 'level_1',
    title: '入門 1: はじめての面積迷路',
    difficulty: 'Easy',
    rects: [
      { id: 'A', x: 0, y: 0, w: 4, h: 3 },
      { id: 'B', x: 4, y: 0, w: 6, h: 3 }
    ],
    clues: {
      'A_area': 12,
      'A_h': 3,
      'B_area': 18
    },
    question: { targetId: 'B', type: 'w' },
    solution: 6
  },
  {
    id: 'level_2',
    title: '入門 2: 上下のバランス',
    difficulty: 'Easy',
    rects: [
      { id: 'A', x: 0, y: 0, w: 5, h: 4 },
      { id: 'B', x: 0, y: 4, w: 5, h: 6 }
    ],
    clues: {
      'A_area': 20,
      'A_w': 5,
      'B_area': 30
    },
    question: { targetId: 'B', type: 'h' },
    solution: 6
  },
  {
    id: 'level_3',
    title: '入門 3: 3つのエリア',
    difficulty: 'Easy',
    rects: [
      { id: 'A', x: 0, y: 0, w: 3, h: 4 },
      { id: 'B', x: 3, y: 0, w: 5, h: 4 },
      { id: 'C', x: 0, y: 4, w: 8, h: 3 }
    ],
    clues: {
      'A_area': 12,
      'A_h': 4,
      'B_area': 20,
      'C_h': 3
    },
    question: { targetId: 'C', type: 'area' },
    solution: 24
  },
  {
    id: 'level_4',
    title: '入門 4: 高さの連鎖',
    difficulty: 'Easy',
    rects: [
      { id: 'A', x: 0, y: 0, w: 4, h: 5 },
      { id: 'B', x: 4, y: 0, w: 4, h: 5 },
      { id: 'C', x: 8, y: 0, w: 4, h: 5 }
    ],
    clues: {
      'A_area': 20,
      'A_w': 4,
      'B_w': 4,
      'C_area': 20
    },
    question: { targetId: 'C', type: 'w' },
    solution: 4
  },
  {
    id: 'level_5',
    title: '入門 5: たし算とひき算',
    difficulty: 'Easy',
    rects: [
      { id: 'A', x: 0, y: 0, w: 3, h: 4 },
      { id: 'B', x: 3, y: 0, w: 4, h: 4 },
      { id: 'C', x: 0, y: 4, w: 7, h: 5 }
    ],
    clues: {
      'A_area': 12,
      'A_h': 4,
      'B_area': 16,
      'C_w': 7,
      'C_area': 35
    },
    question: { targetId: 'C', type: 'h' },
    solution: 5
  },
  {
    id: 'level_6',
    title: '入門 6: 正方形のひみつ',
    difficulty: 'Easy',
    rects: [
      { id: 'A', x: 0, y: 0, w: 4, h: 4 },
      { id: 'B', x: 4, y: 0, w: 6, h: 4 },
      { id: 'C', x: 4, y: 4, w: 6, h: 3 }
    ],
    clues: {
      'A_area': 16,
      'A_w': 4,
      'B_area': 24,
      'C_h': 3
    },
    question: { targetId: 'C', type: 'area' },
    solution: 18
  },

  // MEDIUM PUZZLES (Levels 7 - 14)
  {
    id: 'level_7',
    title: '初級 1: 面積比の基礎',
    difficulty: 'Medium',
    rects: [
      { id: 'A', x: 0, y: 0, w: 3, h: 5 },
      { id: 'B', x: 3, y: 0, w: 6, h: 5 },
      { id: 'C', x: 0, y: 5, w: 3, h: 4 },
      { id: 'D', x: 3, y: 5, w: 6, h: 4 }
    ],
    clues: {
      'A_area': 15,
      'A_w': 3,
      'B_area': 30,
      'C_area': 12
    },
    question: { targetId: 'D', type: 'area' },
    solution: 24
  },
  {
    id: 'level_8',
    title: '初級 2: L字型の壁',
    difficulty: 'Medium',
    rects: [
      { id: 'A', x: 0, y: 0, w: 4, h: 6 },
      { id: 'B', x: 4, y: 0, w: 5, h: 3 },
      { id: 'C', x: 4, y: 3, w: 5, h: 3 }
    ],
    clues: {
      'A_area': 24,
      'A_w': 4,
      'B_area': 15,
      'C_area': 15,
      'C_h': 3
    },
    question: { targetId: 'B', type: 'w' },
    solution: 5
  },
  {
    id: 'level_9',
    title: '初級 3: 段々畑のパズル',
    difficulty: 'Medium',
    rects: [
      { id: 'A', x: 0, y: 0, w: 3, h: 3 },
      { id: 'B', x: 3, y: 0, w: 4, h: 3 },
      { id: 'C', x: 0, y: 3, w: 7, h: 4 },
      { id: 'D', x: 7, y: 0, w: 3, h: 7 }
    ],
    clues: {
      'A_area': 9,
      'A_w': 3,
      'B_area': 12,
      'C_h': 4,
      'D_h': 7,
      'D_area': 21
    },
    question: { targetId: 'D', type: 'w' },
    solution: 3
  },
  {
    id: 'level_10',
    title: '初級 4: クロスカット',
    difficulty: 'Medium',
    rects: [
      { id: 'A', x: 0, y: 0, w: 5, h: 4 },
      { id: 'B', x: 5, y: 0, w: 4, h: 4 },
      { id: 'C', x: 0, y: 4, w: 5, h: 5 },
      { id: 'D', x: 5, y: 4, w: 4, h: 5 }
    ],
    clues: {
      'A_area': 20,
      'A_w': 5,
      'B_area': 16,
      'D_area': 20
    },
    question: { targetId: 'C', type: 'area' },
    solution: 25
  },
  {
    id: 'level_11',
    title: '初級 5: 中央の謎',
    difficulty: 'Medium',
    rects: [
      { id: 'A', x: 0, y: 0, w: 4, h: 3 },
      { id: 'B', x: 4, y: 0, w: 4, h: 3 },
      { id: 'C', x: 0, y: 3, w: 8, h: 4 },
      { id: 'D', x: 0, y: 7, w: 4, h: 3 },
      { id: 'E', x: 4, y: 7, w: 4, h: 3 }
    ],
    clues: {
      'A_area': 12,
      'A_w': 4,
      'B_area': 12,
      'C_h': 4,
      'D_area': 12,
      'E_area': 12
    },
    question: { targetId: 'C', type: 'area' },
    solution: 32
  },
  {
    id: 'level_12',
    title: '初級 6: 高さの隠し味',
    difficulty: 'Medium',
    rects: [
      { id: 'A', x: 0, y: 0, w: 6, h: 4 },
      { id: 'B', x: 6, y: 0, w: 4, h: 4 },
      { id: 'C', x: 0, y: 4, w: 6, h: 6 },
      { id: 'D', x: 6, y: 4, w: 4, h: 6 }
    ],
    clues: {
      'A_area': 24,
      'A_w': 6,
      'B_area': 16,
      'C_area': 36
    },
    question: { targetId: 'D', type: 'area' },
    solution: 24
  },
  {
    id: 'level_13',
    title: '初級 7: 3段スライド',
    difficulty: 'Medium',
    rects: [
      { id: 'A', x: 0, y: 0, w: 3, h: 3 },
      { id: 'B', x: 3, y: 0, w: 5, h: 3 },
      { id: 'C', x: 0, y: 3, w: 8, h: 3 },
      { id: 'D', x: 0, y: 6, w: 4, h: 4 },
      { id: 'E', x: 4, y: 6, w: 4, h: 4 }
    ],
    clues: {
      'A_area': 9,
      'A_h': 3,
      'B_area': 15,
      'C_h': 3,
      'D_area': 16,
      'D_w': 4
    },
    question: { targetId: 'E', type: 'area' },
    solution: 16
  },
  {
    id: 'level_14',
    title: '初級 8: 四方向の包囲網',
    difficulty: 'Medium',
    rects: [
      { id: 'A', x: 0, y: 0, w: 4, h: 4 },
      { id: 'B', x: 4, y: 0, w: 6, h: 4 },
      { id: 'C', x: 0, y: 4, w: 4, h: 5 },
      { id: 'D', x: 4, y: 4, w: 6, h: 5 }
    ],
    clues: {
      'A_area': 16,
      'A_w': 4,
      'B_area': 24,
      'C_area': 20
    },
    question: { targetId: 'D', type: 'area' },
    solution: 30
  },

  // HARD PUZZLES (Levels 15 - 22)
  {
    id: 'level_15',
    title: '中級 1: 連鎖反応',
    difficulty: 'Hard',
    rects: [
      { id: 'A', x: 0, y: 0, w: 3, h: 4 },
      { id: 'B', x: 3, y: 0, w: 4, h: 4 },
      { id: 'C', x: 7, y: 0, w: 5, h: 4 },
      { id: 'D', x: 0, y: 4, w: 7, h: 3 },
      { id: 'E', x: 7, y: 4, w: 5, h: 3 }
    ],
    clues: {
      'A_area': 12,
      'A_h': 4,
      'B_area': 16,
      'C_area': 20,
      'D_h': 3
    },
    question: { targetId: 'E', type: 'area' },
    solution: 15
  },
  {
    id: 'level_16',
    title: '中級 2: 黄金の比率',
    difficulty: 'Hard',
    rects: [
      { id: 'A', x: 0, y: 0, w: 4, h: 5 },
      { id: 'B', x: 4, y: 0, w: 6, h: 5 },
      { id: 'C', x: 0, y: 5, w: 4, h: 3 },
      { id: 'D', x: 4, y: 5, w: 6, h: 3 }
    ],
    clues: {
      'A_area': 20,
      'A_w': 4,
      'B_area': 30,
      'C_area': 12
    },
    question: { targetId: 'D', type: 'area' },
    solution: 18
  },
  {
    id: 'level_17',
    title: '中級 3: 迷宮の幾何学',
    difficulty: 'Hard',
    rects: [
      { id: 'A', x: 0, y: 0, w: 4, h: 3 },
      { id: 'B', x: 4, y: 0, w: 5, h: 3 },
      { id: 'C', x: 0, y: 3, w: 3, h: 5 },
      { id: 'D', x: 3, y: 3, w: 6, h: 5 }
    ],
    clues: {
      'A_area': 12,
      'A_h': 3,
      'B_area': 15,
      'C_area': 15,
      'C_w': 3
    },
    question: { targetId: 'D', type: 'area' },
    solution: 30
  },
  {
    id: 'level_18',
    title: '中級 4: トリプルタワー',
    difficulty: 'Hard',
    rects: [
      { id: 'A', x: 0, y: 0, w: 3, h: 6 },
      { id: 'B', x: 3, y: 0, w: 4, h: 3 },
      { id: 'C', x: 3, y: 3, w: 4, h: 3 },
      { id: 'D', x: 7, y: 0, w: 3, h: 6 }
    ],
    clues: {
      'A_area': 18,
      'A_w': 3,
      'B_area': 12,
      'C_area': 12,
      'D_w': 3
    },
    question: { targetId: 'D', type: 'area' },
    solution: 18
  },
  {
    id: 'level_19',
    title: '中級 5: ナンバーピラミッド',
    difficulty: 'Hard',
    rects: [
      { id: 'A', x: 0, y: 0, w: 6, h: 3 },
      { id: 'B', x: 0, y: 3, w: 3, h: 4 },
      { id: 'C', x: 3, y: 3, w: 3, h: 4 },
      { id: 'D', x: 0, y: 7, w: 6, h: 3 }
    ],
    clues: {
      'A_area': 18,
      'A_h': 3,
      'B_area': 12,
      'C_area': 12,
      'D_h': 3
    },
    question: { targetId: 'D', type: 'area' },
    solution: 18
  },
  {
    id: 'level_20',
    title: '中級 6: 複雑なグリッド',
    difficulty: 'Hard',
    rects: [
      { id: 'A', x: 0, y: 0, w: 4, h: 4 },
      { id: 'B', x: 4, y: 0, w: 4, h: 4 },
      { id: 'C', x: 8, y: 0, w: 4, h: 4 },
      { id: 'D', x: 0, y: 4, w: 6, h: 4 },
      { id: 'E', x: 6, y: 4, w: 6, h: 4 }
    ],
    clues: {
      'A_area': 16,
      'A_w': 4,
      'B_area': 16,
      'C_area': 16,
      'D_area': 24
    },
    question: { targetId: 'E', type: 'area' },
    solution: 24
  },
  {
    id: 'level_21',
    title: '中級 7: トラップ付き長方形',
    difficulty: 'Hard',
    rects: [
      { id: 'A', x: 0, y: 0, w: 5, h: 3 },
      { id: 'B', x: 5, y: 0, w: 5, h: 3 },
      { id: 'C', x: 0, y: 3, w: 4, h: 5 },
      { id: 'D', x: 4, y: 3, w: 6, h: 5 }
    ],
    clues: {
      'A_area': 15,
      'A_h': 3,
      'B_area': 15,
      'C_area': 20,
      'C_w': 4
    },
    question: { targetId: 'D', type: 'area' },
    solution: 30
  },
  {
    id: 'level_22',
    title: '中級 8: 隠された高さ',
    difficulty: 'Hard',
    rects: [
      { id: 'A', x: 0, y: 0, w: 4, h: 4 },
      { id: 'B', x: 4, y: 0, w: 6, h: 4 },
      { id: 'C', x: 0, y: 4, w: 5, h: 5 },
      { id: 'D', x: 5, y: 4, w: 5, h: 5 }
    ],
    clues: {
      'A_area': 16,
      'A_w': 4,
      'B_area': 24,
      'C_area': 25,
      'C_w': 5
    },
    question: { targetId: 'D', type: 'area' },
    solution: 25
  },

  // EXPERT & GRANDMASTER (Levels 23 - 30)
  {
    id: 'level_23',
    title: '上級 1: 面積迷路の要塞',
    difficulty: 'Expert',
    rects: [
      { id: 'A', x: 0, y: 0, w: 3, h: 4 },
      { id: 'B', x: 3, y: 0, w: 5, h: 4 },
      { id: 'C', x: 8, y: 0, w: 4, h: 4 },
      { id: 'D', x: 0, y: 4, w: 4, h: 6 },
      { id: 'E', x: 4, y: 4, w: 4, h: 6 },
      { id: 'F', x: 8, y: 4, w: 4, h: 6 }
    ],
    clues: {
      'A_area': 12,
      'A_h': 4,
      'B_area': 20,
      'C_area': 16,
      'D_area': 24,
      'E_area': 24
    },
    question: { targetId: 'F', type: 'area' },
    solution: 24
  },
  {
    id: 'level_24',
    title: '上級 2: 究極の比率解法',
    difficulty: 'Expert',
    rects: [
      { id: 'A', x: 0, y: 0, w: 4, h: 5 },
      { id: 'B', x: 4, y: 0, w: 6, h: 5 },
      { id: 'C', x: 10, y: 0, w: 4, h: 5 },
      { id: 'D', x: 0, y: 5, w: 7, h: 4 },
      { id: 'E', x: 7, y: 5, w: 7, h: 4 }
    ],
    clues: {
      'A_area': 20,
      'A_w': 4,
      'B_area': 30,
      'C_area': 20,
      'D_area': 28,
      'D_w': 7
    },
    question: { targetId: 'E', type: 'area' },
    solution: 28
  },
  {
    id: 'level_25',
    title: '上級 3: 多重L字構造',
    difficulty: 'Expert',
    rects: [
      { id: 'A', x: 0, y: 0, w: 4, h: 4 },
      { id: 'B', x: 4, y: 0, w: 4, h: 4 },
      { id: 'C', x: 8, y: 0, w: 4, h: 4 },
      { id: 'D', x: 0, y: 4, w: 6, h: 5 },
      { id: 'E', x: 6, y: 4, w: 6, h: 5 }
    ],
    clues: {
      'A_area': 16,
      'A_w': 4,
      'B_area': 16,
      'C_area': 16,
      'D_area': 30,
      'D_w': 6
    },
    question: { targetId: 'E', type: 'area' },
    solution: 30
  },
  {
    id: 'level_26',
    title: '上級 4: 幾何学の迷宮',
    difficulty: 'Expert',
    rects: [
      { id: 'A', x: 0, y: 0, w: 5, h: 4 },
      { id: 'B', x: 5, y: 0, w: 5, h: 4 },
      { id: 'C', x: 0, y: 4, w: 3, h: 6 },
      { id: 'D', x: 3, y: 4, w: 7, h: 6 }
    ],
    clues: {
      'A_area': 20,
      'A_w': 5,
      'B_area': 20,
      'C_area': 18,
      'C_w': 3
    },
    question: { targetId: 'D', type: 'area' },
    solution: 42
  },
  {
    id: 'level_27',
    title: '達人 1: グランドマスターの洗礼',
    difficulty: 'Grandmaster',
    rects: [
      { id: 'A', x: 0, y: 0, w: 3, h: 3 },
      { id: 'B', x: 3, y: 0, w: 4, h: 3 },
      { id: 'C', x: 7, y: 0, w: 5, h: 3 },
      { id: 'D', x: 0, y: 3, w: 5, h: 4 },
      { id: 'E', x: 5, y: 3, w: 7, h: 4 },
      { id: 'F', x: 0, y: 7, w: 6, h: 5 },
      { id: 'G', x: 6, y: 7, w: 6, h: 5 }
    ],
    clues: {
      'A_area': 9,
      'A_w': 3,
      'B_area': 12,
      'C_area': 15,
      'D_area': 20,
      'D_w': 5,
      'E_area': 28,
      'F_area': 30,
      'F_w': 6
    },
    question: { targetId: 'G', type: 'area' },
    solution: 30
  },
  {
    id: 'level_28',
    title: '達人 2: 7つの領域',
    difficulty: 'Grandmaster',
    rects: [
      { id: 'A', x: 0, y: 0, w: 4, h: 3 },
      { id: 'B', x: 4, y: 0, w: 4, h: 3 },
      { id: 'C', x: 8, y: 0, w: 4, h: 3 },
      { id: 'D', x: 0, y: 3, w: 6, h: 4 },
      { id: 'E', x: 6, y: 3, w: 6, h: 4 },
      { id: 'F', x: 0, y: 7, w: 4, h: 5 },
      { id: 'G', x: 4, y: 7, w: 8, h: 5 }
    ],
    clues: {
      'A_area': 12,
      'A_w': 4,
      'B_area': 12,
      'C_area': 12,
      'D_area': 24,
      'E_area': 24,
      'F_area': 20,
      'F_w': 4
    },
    question: { targetId: 'G', type: 'area' },
    solution: 40
  },
  {
    id: 'level_29',
    title: '達人 3: 不可解な相似',
    difficulty: 'Grandmaster',
    rects: [
      { id: 'A', x: 0, y: 0, w: 4, h: 4 },
      { id: 'B', x: 4, y: 0, w: 5, h: 4 },
      { id: 'C', x: 9, y: 0, w: 5, h: 4 },
      { id: 'D', x: 0, y: 4, w: 7, h: 6 },
      { id: 'E', x: 7, y: 4, w: 7, h: 6 }
    ],
    clues: {
      'A_area': 16,
      'A_w': 4,
      'B_area': 20,
      'C_area': 20,
      'D_area': 42,
      'D_w': 7
    },
    question: { targetId: 'E', type: 'area' },
    solution: 42
  },
  {
    id: 'level_30',
    title: '達人 4: 面積迷路・最終試練',
    difficulty: 'Grandmaster',
    rects: [
      { id: 'A', x: 0, y: 0, w: 4, h: 4 },
      { id: 'B', x: 4, y: 0, w: 6, h: 4 },
      { id: 'C', x: 10, y: 0, w: 5, h: 4 },
      { id: 'D', x: 0, y: 4, w: 5, h: 5 },
      { id: 'E', x: 5, y: 4, w: 5, h: 5 },
      { id: 'F', x: 10, y: 4, w: 5, h: 5 },
      { id: 'G', x: 0, y: 9, w: 15, h: 4 }
    ],
    clues: {
      'A_area': 16,
      'A_w': 4,
      'B_area': 24,
      'C_area': 20,
      'D_area': 25,
      'E_area': 25,
      'F_area': 25,
      'G_h': 4,
      'G_w': 15
    },
    question: { targetId: 'G', type: 'area' },
    solution: 60
  }
];

export function getPresetModel(id) {
  const data = PRESET_PUZZLES.find(p => p.id === id) || PRESET_PUZZLES[0];
  return new AreaMazeModel(data);
}
