import { AreaMazeModel } from './AreaMazeModel.js';

export const PRESET_PUZZLES = [
  {
    "id": "level_1",
    "title": "入門 1: 基本トレーニング",
    "difficulty": "Easy",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 3,
        "area": 12
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 6,
        "h": 3,
        "area": 18
      },
      {
        "id": "C",
        "x": 0,
        "y": 3,
        "w": 10,
        "h": 3,
        "area": 30
      }
    ],
    "clues": {
      "A_area": 12,
      "A_h": 3,
      "B_area": 18,
      "C_h": 3
    },
    "question": {
      "targetId": "C",
      "type": "w"
    },
    "solution": 10
  },
  {
    "id": "level_2",
    "title": "入門 2: 上下の連鎖",
    "difficulty": "Easy",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 3,
        "area": 12
      },
      {
        "id": "B",
        "x": 0,
        "y": 3,
        "w": 4,
        "h": 5,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 12,
      "A_h": 3,
      "B_area": 20
    },
    "question": {
      "targetId": "B",
      "type": "h"
    },
    "solution": 5
  },
  {
    "id": "level_3",
    "title": "入門 3: 基本トレーニング",
    "difficulty": "Easy",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 3,
        "h": 4,
        "area": 12
      },
      {
        "id": "B",
        "x": 3,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "C",
        "x": 0,
        "y": 4,
        "w": 8,
        "h": 3,
        "area": 24
      }
    ],
    "clues": {
      "A_area": 12,
      "A_h": 4,
      "B_area": 20,
      "C_h": 3
    },
    "question": {
      "targetId": "C",
      "type": "area"
    },
    "solution": 24
  },
  {
    "id": "level_4",
    "title": "入門 4: 基本トレーニング",
    "difficulty": "Easy",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "C",
        "x": 0,
        "y": 5,
        "w": 8,
        "h": 5,
        "area": 40
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 5,
      "B_area": 20,
      "C_h": 5
    },
    "question": {
      "targetId": "C",
      "type": "w"
    },
    "solution": 8
  },
  {
    "id": "level_5",
    "title": "入門 5: 基本トレーニング",
    "difficulty": "Easy",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 3,
        "h": 4,
        "area": 12
      },
      {
        "id": "B",
        "x": 3,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 0,
        "y": 4,
        "w": 7,
        "h": 5,
        "area": 35
      }
    ],
    "clues": {
      "A_area": 12,
      "A_h": 4,
      "B_area": 16,
      "C_h": 5
    },
    "question": {
      "targetId": "C",
      "type": "h"
    },
    "solution": 5
  },
  {
    "id": "level_6",
    "title": "入門 6: 基本トレーニング",
    "difficulty": "Easy",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "C",
        "x": 0,
        "y": 4,
        "w": 10,
        "h": 3,
        "area": 30
      }
    ],
    "clues": {
      "A_area": 16,
      "A_h": 4,
      "B_area": 24,
      "C_h": 3
    },
    "question": {
      "targetId": "C",
      "type": "area"
    },
    "solution": 30
  },
  {
    "id": "level_7",
    "title": "入門 7: 基本トレーニング",
    "difficulty": "Easy",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 3,
        "area": 15
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 4,
        "h": 3,
        "area": 12
      },
      {
        "id": "C",
        "x": 0,
        "y": 3,
        "w": 9,
        "h": 4,
        "area": 36
      }
    ],
    "clues": {
      "A_area": 15,
      "A_h": 3,
      "B_area": 12,
      "C_h": 4
    },
    "question": {
      "targetId": "C",
      "type": "w"
    },
    "solution": 9
  },
  {
    "id": "level_8",
    "title": "入門 8: 基本トレーニング",
    "difficulty": "Easy",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "B",
        "x": 6,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 0,
        "y": 4,
        "w": 10,
        "h": 4,
        "area": 40
      }
    ],
    "clues": {
      "A_area": 24,
      "A_h": 4,
      "B_area": 16,
      "C_h": 4
    },
    "question": {
      "targetId": "C",
      "type": "h"
    },
    "solution": 4
  },
  {
    "id": "level_9",
    "title": "入門 9: 基本トレーニング",
    "difficulty": "Easy",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "C",
        "x": 0,
        "y": 5,
        "w": 9,
        "h": 4,
        "area": 36
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 5,
      "B_area": 25,
      "C_h": 4
    },
    "question": {
      "targetId": "C",
      "type": "area"
    },
    "solution": 36
  },
  {
    "id": "level_10",
    "title": "入門 10: 基本トレーニング",
    "difficulty": "Easy",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 3,
        "h": 4,
        "area": 12
      },
      {
        "id": "B",
        "x": 3,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "C",
        "x": 0,
        "y": 4,
        "w": 9,
        "h": 4,
        "area": 36
      }
    ],
    "clues": {
      "A_area": 12,
      "A_h": 4,
      "B_area": 24,
      "C_h": 4
    },
    "question": {
      "targetId": "C",
      "type": "w"
    },
    "solution": 9
  },
  {
    "id": "level_11",
    "title": "入門 11: 基本トレーニング",
    "difficulty": "Easy",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 3,
        "h": 4,
        "area": 12
      },
      {
        "id": "C",
        "x": 0,
        "y": 4,
        "w": 8,
        "h": 5,
        "area": 40
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 4,
      "B_area": 12,
      "C_h": 5
    },
    "question": {
      "targetId": "C",
      "type": "h"
    },
    "solution": 5
  },
  {
    "id": "level_12",
    "title": "入門 12: 基本トレーニング",
    "difficulty": "Easy",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 6,
        "h": 3,
        "area": 18
      },
      {
        "id": "B",
        "x": 6,
        "y": 0,
        "w": 5,
        "h": 3,
        "area": 15
      },
      {
        "id": "C",
        "x": 0,
        "y": 3,
        "w": 11,
        "h": 4,
        "area": 44
      }
    ],
    "clues": {
      "A_area": 18,
      "A_h": 3,
      "B_area": 15,
      "C_h": 4
    },
    "question": {
      "targetId": "C",
      "type": "area"
    },
    "solution": 44
  },
  {
    "id": "level_13",
    "title": "入門 13: 基本トレーニング",
    "difficulty": "Easy",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 7,
        "h": 4,
        "area": 28
      },
      {
        "id": "C",
        "x": 0,
        "y": 4,
        "w": 11,
        "h": 3,
        "area": 33
      }
    ],
    "clues": {
      "A_area": 16,
      "A_h": 4,
      "B_area": 28,
      "C_h": 3
    },
    "question": {
      "targetId": "C",
      "type": "w"
    },
    "solution": 11
  },
  {
    "id": "level_14",
    "title": "入門 14: 基本トレーニング",
    "difficulty": "Easy",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 3,
        "area": 15
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 6,
        "h": 3,
        "area": 18
      },
      {
        "id": "C",
        "x": 0,
        "y": 3,
        "w": 11,
        "h": 5,
        "area": 55
      }
    ],
    "clues": {
      "A_area": 15,
      "A_h": 3,
      "B_area": 18,
      "C_h": 5
    },
    "question": {
      "targetId": "C",
      "type": "h"
    },
    "solution": 5
  },
  {
    "id": "level_15",
    "title": "入門 15: 基本トレーニング",
    "difficulty": "Easy",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "B",
        "x": 6,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "C",
        "x": 0,
        "y": 4,
        "w": 12,
        "h": 4,
        "area": 48
      }
    ],
    "clues": {
      "A_area": 24,
      "A_h": 4,
      "B_area": 24,
      "C_h": 4
    },
    "question": {
      "targetId": "C",
      "type": "area"
    },
    "solution": 48
  },
  {
    "id": "level_16",
    "title": "初級 1: ステップアップ",
    "difficulty": "Medium",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 0,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "D",
        "x": 4,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 16,
      "A_w": 4,
      "B_area": 16,
      "C_area": 20
    },
    "question": {
      "targetId": "D",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_17",
    "title": "初級 2: ステップアップ",
    "difficulty": "Medium",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "C",
        "x": 0,
        "y": 5,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "D",
        "x": 5,
        "y": 5,
        "w": 5,
        "h": 6,
        "area": 30
      }
    ],
    "clues": {
      "A_area": 25,
      "A_w": 5,
      "B_area": 25,
      "C_area": 30
    },
    "question": {
      "targetId": "D",
      "type": "area"
    },
    "solution": 30
  },
  {
    "id": "level_18",
    "title": "初級 3: ステップアップ",
    "difficulty": "Medium",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 3,
        "h": 4,
        "area": 12
      },
      {
        "id": "B",
        "x": 3,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "C",
        "x": 0,
        "y": 4,
        "w": 3,
        "h": 4,
        "area": 12
      },
      {
        "id": "D",
        "x": 3,
        "y": 4,
        "w": 6,
        "h": 4,
        "area": 24
      }
    ],
    "clues": {
      "A_area": 12,
      "A_w": 3,
      "B_area": 24,
      "C_area": 12
    },
    "question": {
      "targetId": "D",
      "type": "area"
    },
    "solution": 24
  },
  {
    "id": "level_19",
    "title": "初級 4: ステップアップ",
    "difficulty": "Medium",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 7,
        "h": 5,
        "area": 35
      },
      {
        "id": "C",
        "x": 0,
        "y": 5,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "D",
        "x": 4,
        "y": 5,
        "w": 7,
        "h": 5,
        "area": 35
      }
    ],
    "clues": {
      "A_area": 20,
      "A_w": 4,
      "B_area": 35,
      "C_area": 20
    },
    "question": {
      "targetId": "D",
      "type": "area"
    },
    "solution": 35
  },
  {
    "id": "level_20",
    "title": "初級 5: ステップアップ",
    "difficulty": "Medium",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 0,
        "y": 4,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "D",
        "x": 5,
        "y": 4,
        "w": 4,
        "h": 6,
        "area": 24
      }
    ],
    "clues": {
      "A_area": 20,
      "A_w": 5,
      "B_area": 16,
      "C_area": 30
    },
    "question": {
      "targetId": "D",
      "type": "area"
    },
    "solution": 24
  },
  {
    "id": "level_21",
    "title": "初級 6: ステップアップ",
    "difficulty": "Medium",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 3,
        "h": 5,
        "area": 15
      },
      {
        "id": "B",
        "x": 3,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "C",
        "x": 0,
        "y": 5,
        "w": 3,
        "h": 4,
        "area": 12
      },
      {
        "id": "D",
        "x": 3,
        "y": 5,
        "w": 5,
        "h": 4,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 15,
      "A_w": 3,
      "B_area": 25,
      "C_area": 12
    },
    "question": {
      "targetId": "D",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_22",
    "title": "初級 7: ステップアップ",
    "difficulty": "Medium",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "C",
        "x": 0,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "D",
        "x": 4,
        "y": 4,
        "w": 6,
        "h": 5,
        "area": 30
      }
    ],
    "clues": {
      "A_area": 16,
      "A_w": 4,
      "B_area": 24,
      "C_area": 20
    },
    "question": {
      "targetId": "D",
      "type": "area"
    },
    "solution": 30
  },
  {
    "id": "level_23",
    "title": "初級 8: ステップアップ",
    "difficulty": "Medium",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 7,
        "h": 5,
        "area": 35
      },
      {
        "id": "C",
        "x": 0,
        "y": 5,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "D",
        "x": 5,
        "y": 5,
        "w": 7,
        "h": 6,
        "area": 42
      }
    ],
    "clues": {
      "A_area": 25,
      "A_w": 5,
      "B_area": 35,
      "C_area": 30
    },
    "question": {
      "targetId": "D",
      "type": "area"
    },
    "solution": 42
  },
  {
    "id": "level_24",
    "title": "初級 9: ステップアップ",
    "difficulty": "Medium",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 3,
        "h": 4,
        "area": 12
      },
      {
        "id": "B",
        "x": 3,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 0,
        "y": 4,
        "w": 3,
        "h": 4,
        "area": 12
      },
      {
        "id": "D",
        "x": 3,
        "y": 4,
        "w": 4,
        "h": 4,
        "area": 16
      }
    ],
    "clues": {
      "A_area": 12,
      "A_w": 3,
      "B_area": 16,
      "C_area": 12
    },
    "question": {
      "targetId": "D",
      "type": "area"
    },
    "solution": 16
  },
  {
    "id": "level_25",
    "title": "初級 10: ステップアップ",
    "difficulty": "Medium",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "C",
        "x": 0,
        "y": 5,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "D",
        "x": 4,
        "y": 5,
        "w": 5,
        "h": 5,
        "area": 25
      }
    ],
    "clues": {
      "A_area": 20,
      "A_w": 4,
      "B_area": 25,
      "C_area": 20
    },
    "question": {
      "targetId": "D",
      "type": "area"
    },
    "solution": 25
  },
  {
    "id": "level_26",
    "title": "初級 11: ステップアップ",
    "difficulty": "Medium",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "C",
        "x": 0,
        "y": 4,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "D",
        "x": 5,
        "y": 4,
        "w": 6,
        "h": 6,
        "area": 36
      }
    ],
    "clues": {
      "A_area": 20,
      "A_w": 5,
      "B_area": 24,
      "C_area": 30
    },
    "question": {
      "targetId": "D",
      "type": "area"
    },
    "solution": 36
  },
  {
    "id": "level_27",
    "title": "初級 12: ステップアップ",
    "difficulty": "Medium",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 3,
        "h": 5,
        "area": 15
      },
      {
        "id": "B",
        "x": 3,
        "y": 0,
        "w": 7,
        "h": 5,
        "area": 35
      },
      {
        "id": "C",
        "x": 0,
        "y": 5,
        "w": 3,
        "h": 4,
        "area": 12
      },
      {
        "id": "D",
        "x": 3,
        "y": 5,
        "w": 7,
        "h": 4,
        "area": 28
      }
    ],
    "clues": {
      "A_area": 15,
      "A_w": 3,
      "B_area": 35,
      "C_area": 12
    },
    "question": {
      "targetId": "D",
      "type": "area"
    },
    "solution": 28
  },
  {
    "id": "level_28",
    "title": "初級 13: ステップアップ",
    "difficulty": "Medium",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 0,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "D",
        "x": 4,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 16,
      "A_w": 4,
      "B_area": 16,
      "C_area": 20
    },
    "question": {
      "targetId": "D",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_29",
    "title": "初級 14: ステップアップ",
    "difficulty": "Medium",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "C",
        "x": 0,
        "y": 5,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "D",
        "x": 5,
        "y": 5,
        "w": 5,
        "h": 6,
        "area": 30
      }
    ],
    "clues": {
      "A_area": 25,
      "A_w": 5,
      "B_area": 25,
      "C_area": 30
    },
    "question": {
      "targetId": "D",
      "type": "area"
    },
    "solution": 30
  },
  {
    "id": "level_30",
    "title": "初級 15: ステップアップ",
    "difficulty": "Medium",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 3,
        "h": 4,
        "area": 12
      },
      {
        "id": "B",
        "x": 3,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "C",
        "x": 0,
        "y": 4,
        "w": 3,
        "h": 4,
        "area": 12
      },
      {
        "id": "D",
        "x": 3,
        "y": 4,
        "w": 6,
        "h": 4,
        "area": 24
      }
    ],
    "clues": {
      "A_area": 12,
      "A_w": 3,
      "B_area": 24,
      "C_area": 12
    },
    "question": {
      "targetId": "D",
      "type": "area"
    },
    "solution": 24
  },
  {
    "id": "level_31",
    "title": "初級 16: ステップアップ",
    "difficulty": "Medium",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 7,
        "h": 5,
        "area": 35
      },
      {
        "id": "C",
        "x": 0,
        "y": 5,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "D",
        "x": 4,
        "y": 5,
        "w": 7,
        "h": 5,
        "area": 35
      }
    ],
    "clues": {
      "A_area": 20,
      "A_w": 4,
      "B_area": 35,
      "C_area": 20
    },
    "question": {
      "targetId": "D",
      "type": "area"
    },
    "solution": 35
  },
  {
    "id": "level_32",
    "title": "初級 17: ステップアップ",
    "difficulty": "Medium",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 0,
        "y": 4,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "D",
        "x": 5,
        "y": 4,
        "w": 4,
        "h": 6,
        "area": 24
      }
    ],
    "clues": {
      "A_area": 20,
      "A_w": 5,
      "B_area": 16,
      "C_area": 30
    },
    "question": {
      "targetId": "D",
      "type": "area"
    },
    "solution": 24
  },
  {
    "id": "level_33",
    "title": "初級 18: ステップアップ",
    "difficulty": "Medium",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 3,
        "h": 5,
        "area": 15
      },
      {
        "id": "B",
        "x": 3,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "C",
        "x": 0,
        "y": 5,
        "w": 3,
        "h": 4,
        "area": 12
      },
      {
        "id": "D",
        "x": 3,
        "y": 5,
        "w": 5,
        "h": 4,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 15,
      "A_w": 3,
      "B_area": 25,
      "C_area": 12
    },
    "question": {
      "targetId": "D",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_34",
    "title": "初級 19: ステップアップ",
    "difficulty": "Medium",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "C",
        "x": 0,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "D",
        "x": 4,
        "y": 4,
        "w": 6,
        "h": 5,
        "area": 30
      }
    ],
    "clues": {
      "A_area": 16,
      "A_w": 4,
      "B_area": 24,
      "C_area": 20
    },
    "question": {
      "targetId": "D",
      "type": "area"
    },
    "solution": 30
  },
  {
    "id": "level_35",
    "title": "初級 20: ステップアップ",
    "difficulty": "Medium",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 7,
        "h": 5,
        "area": 35
      },
      {
        "id": "C",
        "x": 0,
        "y": 5,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "D",
        "x": 5,
        "y": 5,
        "w": 7,
        "h": 6,
        "area": 42
      }
    ],
    "clues": {
      "A_area": 25,
      "A_w": 5,
      "B_area": 35,
      "C_area": 30
    },
    "question": {
      "targetId": "D",
      "type": "area"
    },
    "solution": 42
  },
  {
    "id": "level_36",
    "title": "中級 1: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 3,
        "h": 4,
        "area": 12
      },
      {
        "id": "B",
        "x": 3,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 7,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 7,
        "h": 3,
        "area": 21
      },
      {
        "id": "E",
        "x": 7,
        "y": 4,
        "w": 4,
        "h": 3,
        "area": 12
      }
    ],
    "clues": {
      "A_area": 12,
      "A_h": 4,
      "B_area": 16,
      "C_area": 16,
      "D_h": 3
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 12
  },
  {
    "id": "level_37",
    "title": "中級 2: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "C",
        "x": 9,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "D",
        "x": 0,
        "y": 5,
        "w": 9,
        "h": 4,
        "area": 36
      },
      {
        "id": "E",
        "x": 9,
        "y": 5,
        "w": 5,
        "h": 4,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 5,
      "B_area": 25,
      "C_area": 25,
      "D_h": 4
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_38",
    "title": "中級 3: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "C",
        "x": 11,
        "y": 0,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "D",
        "x": 0,
        "y": 6,
        "w": 11,
        "h": 3,
        "area": 33
      },
      {
        "id": "E",
        "x": 11,
        "y": 6,
        "w": 4,
        "h": 3,
        "area": 12
      }
    ],
    "clues": {
      "A_area": 30,
      "A_h": 6,
      "B_area": 36,
      "C_area": 24,
      "D_h": 3
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 12
  },
  {
    "id": "level_39",
    "title": "中級 4: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 3,
        "h": 4,
        "area": 12
      },
      {
        "id": "B",
        "x": 3,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 7,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 7,
        "h": 4,
        "area": 28
      },
      {
        "id": "E",
        "x": 7,
        "y": 4,
        "w": 5,
        "h": 4,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 12,
      "A_h": 4,
      "B_area": 16,
      "C_area": 20,
      "D_h": 4
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_40",
    "title": "中級 5: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "C",
        "x": 9,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "D",
        "x": 0,
        "y": 5,
        "w": 9,
        "h": 3,
        "area": 27
      },
      {
        "id": "E",
        "x": 9,
        "y": 5,
        "w": 4,
        "h": 3,
        "area": 12
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 5,
      "B_area": 25,
      "C_area": 20,
      "D_h": 3
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 12
  },
  {
    "id": "level_41",
    "title": "中級 6: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "C",
        "x": 11,
        "y": 0,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "D",
        "x": 0,
        "y": 6,
        "w": 11,
        "h": 4,
        "area": 44
      },
      {
        "id": "E",
        "x": 11,
        "y": 6,
        "w": 5,
        "h": 4,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 30,
      "A_h": 6,
      "B_area": 36,
      "C_area": 30,
      "D_h": 4
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_42",
    "title": "中級 7: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 3,
        "h": 4,
        "area": 12
      },
      {
        "id": "B",
        "x": 3,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 7,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 7,
        "h": 3,
        "area": 21
      },
      {
        "id": "E",
        "x": 7,
        "y": 4,
        "w": 4,
        "h": 3,
        "area": 12
      }
    ],
    "clues": {
      "A_area": 12,
      "A_h": 4,
      "B_area": 16,
      "C_area": 16,
      "D_h": 3
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 12
  },
  {
    "id": "level_43",
    "title": "中級 8: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "C",
        "x": 9,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "D",
        "x": 0,
        "y": 5,
        "w": 9,
        "h": 4,
        "area": 36
      },
      {
        "id": "E",
        "x": 9,
        "y": 5,
        "w": 5,
        "h": 4,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 5,
      "B_area": 25,
      "C_area": 25,
      "D_h": 4
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_44",
    "title": "中級 9: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "C",
        "x": 11,
        "y": 0,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "D",
        "x": 0,
        "y": 6,
        "w": 11,
        "h": 3,
        "area": 33
      },
      {
        "id": "E",
        "x": 11,
        "y": 6,
        "w": 4,
        "h": 3,
        "area": 12
      }
    ],
    "clues": {
      "A_area": 30,
      "A_h": 6,
      "B_area": 36,
      "C_area": 24,
      "D_h": 3
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 12
  },
  {
    "id": "level_45",
    "title": "中級 10: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 3,
        "h": 4,
        "area": 12
      },
      {
        "id": "B",
        "x": 3,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 7,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 7,
        "h": 4,
        "area": 28
      },
      {
        "id": "E",
        "x": 7,
        "y": 4,
        "w": 5,
        "h": 4,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 12,
      "A_h": 4,
      "B_area": 16,
      "C_area": 20,
      "D_h": 4
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_46",
    "title": "中級 11: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "C",
        "x": 9,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "D",
        "x": 0,
        "y": 5,
        "w": 9,
        "h": 3,
        "area": 27
      },
      {
        "id": "E",
        "x": 9,
        "y": 5,
        "w": 4,
        "h": 3,
        "area": 12
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 5,
      "B_area": 25,
      "C_area": 20,
      "D_h": 3
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 12
  },
  {
    "id": "level_47",
    "title": "中級 12: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "C",
        "x": 11,
        "y": 0,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "D",
        "x": 0,
        "y": 6,
        "w": 11,
        "h": 4,
        "area": 44
      },
      {
        "id": "E",
        "x": 11,
        "y": 6,
        "w": 5,
        "h": 4,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 30,
      "A_h": 6,
      "B_area": 36,
      "C_area": 30,
      "D_h": 4
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_48",
    "title": "中級 13: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 3,
        "h": 4,
        "area": 12
      },
      {
        "id": "B",
        "x": 3,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 7,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 7,
        "h": 3,
        "area": 21
      },
      {
        "id": "E",
        "x": 7,
        "y": 4,
        "w": 4,
        "h": 3,
        "area": 12
      }
    ],
    "clues": {
      "A_area": 12,
      "A_h": 4,
      "B_area": 16,
      "C_area": 16,
      "D_h": 3
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 12
  },
  {
    "id": "level_49",
    "title": "中級 14: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "C",
        "x": 9,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "D",
        "x": 0,
        "y": 5,
        "w": 9,
        "h": 4,
        "area": 36
      },
      {
        "id": "E",
        "x": 9,
        "y": 5,
        "w": 5,
        "h": 4,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 5,
      "B_area": 25,
      "C_area": 25,
      "D_h": 4
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_50",
    "title": "中級 15: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "C",
        "x": 11,
        "y": 0,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "D",
        "x": 0,
        "y": 6,
        "w": 11,
        "h": 3,
        "area": 33
      },
      {
        "id": "E",
        "x": 11,
        "y": 6,
        "w": 4,
        "h": 3,
        "area": 12
      }
    ],
    "clues": {
      "A_area": 30,
      "A_h": 6,
      "B_area": 36,
      "C_area": 24,
      "D_h": 3
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 12
  },
  {
    "id": "level_51",
    "title": "中級 16: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 3,
        "h": 4,
        "area": 12
      },
      {
        "id": "B",
        "x": 3,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 7,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 7,
        "h": 4,
        "area": 28
      },
      {
        "id": "E",
        "x": 7,
        "y": 4,
        "w": 5,
        "h": 4,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 12,
      "A_h": 4,
      "B_area": 16,
      "C_area": 20,
      "D_h": 4
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_52",
    "title": "中級 17: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "C",
        "x": 9,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "D",
        "x": 0,
        "y": 5,
        "w": 9,
        "h": 3,
        "area": 27
      },
      {
        "id": "E",
        "x": 9,
        "y": 5,
        "w": 4,
        "h": 3,
        "area": 12
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 5,
      "B_area": 25,
      "C_area": 20,
      "D_h": 3
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 12
  },
  {
    "id": "level_53",
    "title": "中級 18: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "C",
        "x": 11,
        "y": 0,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "D",
        "x": 0,
        "y": 6,
        "w": 11,
        "h": 4,
        "area": 44
      },
      {
        "id": "E",
        "x": 11,
        "y": 6,
        "w": 5,
        "h": 4,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 30,
      "A_h": 6,
      "B_area": 36,
      "C_area": 30,
      "D_h": 4
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_54",
    "title": "中級 19: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 3,
        "h": 4,
        "area": 12
      },
      {
        "id": "B",
        "x": 3,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 7,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 7,
        "h": 3,
        "area": 21
      },
      {
        "id": "E",
        "x": 7,
        "y": 4,
        "w": 4,
        "h": 3,
        "area": 12
      }
    ],
    "clues": {
      "A_area": 12,
      "A_h": 4,
      "B_area": 16,
      "C_area": 16,
      "D_h": 3
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 12
  },
  {
    "id": "level_55",
    "title": "中級 20: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "C",
        "x": 9,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "D",
        "x": 0,
        "y": 5,
        "w": 9,
        "h": 4,
        "area": 36
      },
      {
        "id": "E",
        "x": 9,
        "y": 5,
        "w": 5,
        "h": 4,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 5,
      "B_area": 25,
      "C_area": 25,
      "D_h": 4
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_56",
    "title": "中級 21: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "C",
        "x": 11,
        "y": 0,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "D",
        "x": 0,
        "y": 6,
        "w": 11,
        "h": 3,
        "area": 33
      },
      {
        "id": "E",
        "x": 11,
        "y": 6,
        "w": 4,
        "h": 3,
        "area": 12
      }
    ],
    "clues": {
      "A_area": 30,
      "A_h": 6,
      "B_area": 36,
      "C_area": 24,
      "D_h": 3
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 12
  },
  {
    "id": "level_57",
    "title": "中級 22: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 3,
        "h": 4,
        "area": 12
      },
      {
        "id": "B",
        "x": 3,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 7,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 7,
        "h": 4,
        "area": 28
      },
      {
        "id": "E",
        "x": 7,
        "y": 4,
        "w": 5,
        "h": 4,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 12,
      "A_h": 4,
      "B_area": 16,
      "C_area": 20,
      "D_h": 4
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_58",
    "title": "中級 23: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "C",
        "x": 9,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "D",
        "x": 0,
        "y": 5,
        "w": 9,
        "h": 3,
        "area": 27
      },
      {
        "id": "E",
        "x": 9,
        "y": 5,
        "w": 4,
        "h": 3,
        "area": 12
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 5,
      "B_area": 25,
      "C_area": 20,
      "D_h": 3
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 12
  },
  {
    "id": "level_59",
    "title": "中級 24: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "C",
        "x": 11,
        "y": 0,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "D",
        "x": 0,
        "y": 6,
        "w": 11,
        "h": 4,
        "area": 44
      },
      {
        "id": "E",
        "x": 11,
        "y": 6,
        "w": 5,
        "h": 4,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 30,
      "A_h": 6,
      "B_area": 36,
      "C_area": 30,
      "D_h": 4
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_60",
    "title": "中級 25: 思考力の壁",
    "difficulty": "Hard",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 3,
        "h": 4,
        "area": 12
      },
      {
        "id": "B",
        "x": 3,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 7,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 7,
        "h": 3,
        "area": 21
      },
      {
        "id": "E",
        "x": 7,
        "y": 4,
        "w": 4,
        "h": 3,
        "area": 12
      }
    ],
    "clues": {
      "A_area": 12,
      "A_h": 4,
      "B_area": 16,
      "C_area": 16,
      "D_h": 3
    },
    "question": {
      "targetId": "E",
      "type": "area"
    },
    "solution": 12
  },
  {
    "id": "level_61",
    "title": "上級 1: 幾何学の要塞",
    "difficulty": "Expert",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "C",
        "x": 10,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "E",
        "x": 5,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "F",
        "x": 10,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 4,
      "B_area": 20,
      "C_area": 20,
      "D_area": 25,
      "E_area": 25
    },
    "question": {
      "targetId": "F",
      "type": "area"
    },
    "solution": 25
  },
  {
    "id": "level_62",
    "title": "上級 2: 幾何学の要塞",
    "difficulty": "Expert",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "B",
        "x": 6,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "C",
        "x": 12,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "E",
        "x": 6,
        "y": 4,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "F",
        "x": 12,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 24,
      "A_h": 4,
      "B_area": 24,
      "C_area": 16,
      "D_area": 30,
      "E_area": 30
    },
    "question": {
      "targetId": "F",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_63",
    "title": "上級 3: 幾何学の要塞",
    "difficulty": "Expert",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 8,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "E",
        "x": 4,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "F",
        "x": 8,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      }
    ],
    "clues": {
      "A_area": 16,
      "A_h": 4,
      "B_area": 16,
      "C_area": 20,
      "D_area": 20,
      "E_area": 20
    },
    "question": {
      "targetId": "F",
      "type": "area"
    },
    "solution": 25
  },
  {
    "id": "level_64",
    "title": "上級 4: 幾何学の要塞",
    "difficulty": "Expert",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "C",
        "x": 10,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "E",
        "x": 5,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "F",
        "x": 10,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 4,
      "B_area": 20,
      "C_area": 16,
      "D_area": 25,
      "E_area": 25
    },
    "question": {
      "targetId": "F",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_65",
    "title": "上級 5: 幾何学の要塞",
    "difficulty": "Expert",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "B",
        "x": 6,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "C",
        "x": 12,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "E",
        "x": 6,
        "y": 4,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "F",
        "x": 12,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      }
    ],
    "clues": {
      "A_area": 24,
      "A_h": 4,
      "B_area": 24,
      "C_area": 20,
      "D_area": 30,
      "E_area": 30
    },
    "question": {
      "targetId": "F",
      "type": "area"
    },
    "solution": 25
  },
  {
    "id": "level_66",
    "title": "上級 6: 幾何学の要塞",
    "difficulty": "Expert",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 8,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "E",
        "x": 4,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "F",
        "x": 8,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 16,
      "A_h": 4,
      "B_area": 16,
      "C_area": 16,
      "D_area": 20,
      "E_area": 20
    },
    "question": {
      "targetId": "F",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_67",
    "title": "上級 7: 幾何学の要塞",
    "difficulty": "Expert",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "C",
        "x": 10,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "E",
        "x": 5,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "F",
        "x": 10,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 4,
      "B_area": 20,
      "C_area": 20,
      "D_area": 25,
      "E_area": 25
    },
    "question": {
      "targetId": "F",
      "type": "area"
    },
    "solution": 25
  },
  {
    "id": "level_68",
    "title": "上級 8: 幾何学の要塞",
    "difficulty": "Expert",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "B",
        "x": 6,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "C",
        "x": 12,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "E",
        "x": 6,
        "y": 4,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "F",
        "x": 12,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 24,
      "A_h": 4,
      "B_area": 24,
      "C_area": 16,
      "D_area": 30,
      "E_area": 30
    },
    "question": {
      "targetId": "F",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_69",
    "title": "上級 9: 幾何学の要塞",
    "difficulty": "Expert",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 8,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "E",
        "x": 4,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "F",
        "x": 8,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      }
    ],
    "clues": {
      "A_area": 16,
      "A_h": 4,
      "B_area": 16,
      "C_area": 20,
      "D_area": 20,
      "E_area": 20
    },
    "question": {
      "targetId": "F",
      "type": "area"
    },
    "solution": 25
  },
  {
    "id": "level_70",
    "title": "上級 10: 幾何学の要塞",
    "difficulty": "Expert",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "C",
        "x": 10,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "E",
        "x": 5,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "F",
        "x": 10,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 4,
      "B_area": 20,
      "C_area": 16,
      "D_area": 25,
      "E_area": 25
    },
    "question": {
      "targetId": "F",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_71",
    "title": "上級 11: 幾何学の要塞",
    "difficulty": "Expert",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "B",
        "x": 6,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "C",
        "x": 12,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "E",
        "x": 6,
        "y": 4,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "F",
        "x": 12,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      }
    ],
    "clues": {
      "A_area": 24,
      "A_h": 4,
      "B_area": 24,
      "C_area": 20,
      "D_area": 30,
      "E_area": 30
    },
    "question": {
      "targetId": "F",
      "type": "area"
    },
    "solution": 25
  },
  {
    "id": "level_72",
    "title": "上級 12: 幾何学の要塞",
    "difficulty": "Expert",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 8,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "E",
        "x": 4,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "F",
        "x": 8,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 16,
      "A_h": 4,
      "B_area": 16,
      "C_area": 16,
      "D_area": 20,
      "E_area": 20
    },
    "question": {
      "targetId": "F",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_73",
    "title": "上級 13: 幾何学の要塞",
    "difficulty": "Expert",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "C",
        "x": 10,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "E",
        "x": 5,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "F",
        "x": 10,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 4,
      "B_area": 20,
      "C_area": 20,
      "D_area": 25,
      "E_area": 25
    },
    "question": {
      "targetId": "F",
      "type": "area"
    },
    "solution": 25
  },
  {
    "id": "level_74",
    "title": "上級 14: 幾何学の要塞",
    "difficulty": "Expert",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "B",
        "x": 6,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "C",
        "x": 12,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "E",
        "x": 6,
        "y": 4,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "F",
        "x": 12,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 24,
      "A_h": 4,
      "B_area": 24,
      "C_area": 16,
      "D_area": 30,
      "E_area": 30
    },
    "question": {
      "targetId": "F",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_75",
    "title": "上級 15: 幾何学の要塞",
    "difficulty": "Expert",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 8,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "E",
        "x": 4,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "F",
        "x": 8,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      }
    ],
    "clues": {
      "A_area": 16,
      "A_h": 4,
      "B_area": 16,
      "C_area": 20,
      "D_area": 20,
      "E_area": 20
    },
    "question": {
      "targetId": "F",
      "type": "area"
    },
    "solution": 25
  },
  {
    "id": "level_76",
    "title": "上級 16: 幾何学の要塞",
    "difficulty": "Expert",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "C",
        "x": 10,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "E",
        "x": 5,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "F",
        "x": 10,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 4,
      "B_area": 20,
      "C_area": 16,
      "D_area": 25,
      "E_area": 25
    },
    "question": {
      "targetId": "F",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_77",
    "title": "上級 17: 幾何学の要塞",
    "difficulty": "Expert",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "B",
        "x": 6,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "C",
        "x": 12,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "E",
        "x": 6,
        "y": 4,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "F",
        "x": 12,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      }
    ],
    "clues": {
      "A_area": 24,
      "A_h": 4,
      "B_area": 24,
      "C_area": 20,
      "D_area": 30,
      "E_area": 30
    },
    "question": {
      "targetId": "F",
      "type": "area"
    },
    "solution": 25
  },
  {
    "id": "level_78",
    "title": "上級 18: 幾何学の要塞",
    "difficulty": "Expert",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 8,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "E",
        "x": 4,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "F",
        "x": 8,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 16,
      "A_h": 4,
      "B_area": 16,
      "C_area": 16,
      "D_area": 20,
      "E_area": 20
    },
    "question": {
      "targetId": "F",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_79",
    "title": "上級 19: 幾何学の要塞",
    "difficulty": "Expert",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "C",
        "x": 10,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "E",
        "x": 5,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "F",
        "x": 10,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 4,
      "B_area": 20,
      "C_area": 20,
      "D_area": 25,
      "E_area": 25
    },
    "question": {
      "targetId": "F",
      "type": "area"
    },
    "solution": 25
  },
  {
    "id": "level_80",
    "title": "上級 20: 幾何学の要塞",
    "difficulty": "Expert",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "B",
        "x": 6,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "C",
        "x": 12,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "E",
        "x": 6,
        "y": 4,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "F",
        "x": 12,
        "y": 4,
        "w": 4,
        "h": 5,
        "area": 20
      }
    ],
    "clues": {
      "A_area": 24,
      "A_h": 4,
      "B_area": 24,
      "C_area": 16,
      "D_area": 30,
      "E_area": 30
    },
    "question": {
      "targetId": "F",
      "type": "area"
    },
    "solution": 20
  },
  {
    "id": "level_81",
    "title": "達人 1:  11重連鎖の迷宮 [第1型]",
    "difficulty": "Grandmaster",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "C",
        "x": 10,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "D",
        "x": 0,
        "y": 5,
        "w": 7,
        "h": 4,
        "area": 28
      },
      {
        "id": "E",
        "x": 7,
        "y": 5,
        "w": 8,
        "h": 4,
        "area": 32
      },
      {
        "id": "F",
        "x": 0,
        "y": 9,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "G",
        "x": 5,
        "y": 9,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "H",
        "x": 10,
        "y": 9,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "I",
        "x": 0,
        "y": 15,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "J",
        "x": 6,
        "y": 15,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "K",
        "x": 10,
        "y": 15,
        "w": 5,
        "h": 5,
        "area": 25
      }
    ],
    "clues": {
      "A_area": 20,
      "A_w": 4,
      "B_area": 30,
      "C_area": 25,
      "D_area": 28,
      "E_area": 32,
      "F_area": 30,
      "G_area": 30,
      "I_area": 30,
      "J_area": 20
    },
    "question": {
      "targetId": "K",
      "type": "area"
    },
    "solution": 25
  },
  {
    "id": "level_82",
    "title": "達人 2:  思考力テスト極致 [第1型]",
    "difficulty": "Grandmaster",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 9,
        "y": 0,
        "w": 7,
        "h": 4,
        "area": 28
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "E",
        "x": 6,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "F",
        "x": 11,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "G",
        "x": 0,
        "y": 9,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "H",
        "x": 4,
        "y": 9,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "I",
        "x": 10,
        "y": 9,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "J",
        "x": 0,
        "y": 15,
        "w": 8,
        "h": 4,
        "area": 32
      },
      {
        "id": "K",
        "x": 8,
        "y": 15,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "L",
        "x": 12,
        "y": 15,
        "w": 4,
        "h": 4,
        "area": 16
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 4,
      "B_area": 16,
      "C_area": 28,
      "D_area": 30,
      "E_area": 25,
      "G_area": 24,
      "H_area": 36,
      "J_area": 32,
      "K_area": 16
    },
    "question": {
      "targetId": "L",
      "type": "area"
    },
    "solution": 16
  },
  {
    "id": "level_83",
    "title": "達人 3:  難攻不落の長方形 [第1型]",
    "difficulty": "Grandmaster",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "B",
        "x": 6,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "C",
        "x": 12,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 9,
        "h": 5,
        "area": 45
      },
      {
        "id": "E",
        "x": 9,
        "y": 4,
        "w": 9,
        "h": 5,
        "area": 45
      },
      {
        "id": "F",
        "x": 0,
        "y": 9,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "G",
        "x": 4,
        "y": 9,
        "w": 8,
        "h": 6,
        "area": 48
      },
      {
        "id": "H",
        "x": 12,
        "y": 9,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "I",
        "x": 0,
        "y": 15,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "J",
        "x": 6,
        "y": 15,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "K",
        "x": 12,
        "y": 15,
        "w": 6,
        "h": 4,
        "area": 24
      }
    ],
    "clues": {
      "A_area": 24,
      "A_w": 6,
      "B_area": 24,
      "C_area": 24,
      "D_area": 45,
      "E_area": 45,
      "F_area": 24,
      "G_area": 48,
      "I_area": 24,
      "J_area": 24
    },
    "question": {
      "targetId": "K",
      "type": "area"
    },
    "solution": 24
  },
  {
    "id": "level_84",
    "title": "達人 4:  幾何学最高峰のパズル [第1型]",
    "difficulty": "Grandmaster",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "C",
        "x": 9,
        "y": 0,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "D",
        "x": 0,
        "y": 6,
        "w": 7,
        "h": 5,
        "area": 35
      },
      {
        "id": "E",
        "x": 7,
        "y": 6,
        "w": 8,
        "h": 5,
        "area": 40
      },
      {
        "id": "F",
        "x": 0,
        "y": 11,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "G",
        "x": 5,
        "y": 11,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "H",
        "x": 10,
        "y": 11,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "I",
        "x": 0,
        "y": 15,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "J",
        "x": 6,
        "y": 15,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "K",
        "x": 10,
        "y": 15,
        "w": 5,
        "h": 6,
        "area": 30
      }
    ],
    "clues": {
      "A_area": 24,
      "A_h": 6,
      "B_area": 30,
      "C_area": 36,
      "D_area": 35,
      "E_area": 40,
      "F_area": 20,
      "G_area": 20,
      "I_area": 36,
      "J_area": 24
    },
    "question": {
      "targetId": "K",
      "type": "area"
    },
    "solution": 30
  },
  {
    "id": "level_85",
    "title": "達人 5:  11重連鎖の迷宮 [第2型]",
    "difficulty": "Grandmaster",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "C",
        "x": 10,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "D",
        "x": 0,
        "y": 5,
        "w": 7,
        "h": 4,
        "area": 28
      },
      {
        "id": "E",
        "x": 7,
        "y": 5,
        "w": 8,
        "h": 4,
        "area": 32
      },
      {
        "id": "F",
        "x": 0,
        "y": 9,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "G",
        "x": 5,
        "y": 9,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "H",
        "x": 10,
        "y": 9,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "I",
        "x": 0,
        "y": 15,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "J",
        "x": 6,
        "y": 15,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "K",
        "x": 10,
        "y": 15,
        "w": 5,
        "h": 5,
        "area": 25
      }
    ],
    "clues": {
      "A_area": 20,
      "A_w": 4,
      "B_area": 30,
      "C_area": 25,
      "D_area": 28,
      "E_area": 32,
      "F_area": 30,
      "G_area": 30,
      "I_area": 30,
      "J_area": 20
    },
    "question": {
      "targetId": "K",
      "type": "area"
    },
    "solution": 25
  },
  {
    "id": "level_86",
    "title": "達人 6:  思考力テスト極致 [第2型]",
    "difficulty": "Grandmaster",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 9,
        "y": 0,
        "w": 7,
        "h": 4,
        "area": 28
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "E",
        "x": 6,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "F",
        "x": 11,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "G",
        "x": 0,
        "y": 9,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "H",
        "x": 4,
        "y": 9,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "I",
        "x": 10,
        "y": 9,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "J",
        "x": 0,
        "y": 15,
        "w": 8,
        "h": 4,
        "area": 32
      },
      {
        "id": "K",
        "x": 8,
        "y": 15,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "L",
        "x": 12,
        "y": 15,
        "w": 4,
        "h": 4,
        "area": 16
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 4,
      "B_area": 16,
      "C_area": 28,
      "D_area": 30,
      "E_area": 25,
      "G_area": 24,
      "H_area": 36,
      "J_area": 32,
      "K_area": 16
    },
    "question": {
      "targetId": "L",
      "type": "area"
    },
    "solution": 16
  },
  {
    "id": "level_87",
    "title": "達人 7:  難攻不落の長方形 [第2型]",
    "difficulty": "Grandmaster",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "B",
        "x": 6,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "C",
        "x": 12,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 9,
        "h": 5,
        "area": 45
      },
      {
        "id": "E",
        "x": 9,
        "y": 4,
        "w": 9,
        "h": 5,
        "area": 45
      },
      {
        "id": "F",
        "x": 0,
        "y": 9,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "G",
        "x": 4,
        "y": 9,
        "w": 8,
        "h": 6,
        "area": 48
      },
      {
        "id": "H",
        "x": 12,
        "y": 9,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "I",
        "x": 0,
        "y": 15,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "J",
        "x": 6,
        "y": 15,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "K",
        "x": 12,
        "y": 15,
        "w": 6,
        "h": 4,
        "area": 24
      }
    ],
    "clues": {
      "A_area": 24,
      "A_w": 6,
      "B_area": 24,
      "C_area": 24,
      "D_area": 45,
      "E_area": 45,
      "F_area": 24,
      "G_area": 48,
      "I_area": 24,
      "J_area": 24
    },
    "question": {
      "targetId": "K",
      "type": "area"
    },
    "solution": 24
  },
  {
    "id": "level_88",
    "title": "達人 8:  幾何学最高峰のパズル [第2型]",
    "difficulty": "Grandmaster",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "C",
        "x": 9,
        "y": 0,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "D",
        "x": 0,
        "y": 6,
        "w": 7,
        "h": 5,
        "area": 35
      },
      {
        "id": "E",
        "x": 7,
        "y": 6,
        "w": 8,
        "h": 5,
        "area": 40
      },
      {
        "id": "F",
        "x": 0,
        "y": 11,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "G",
        "x": 5,
        "y": 11,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "H",
        "x": 10,
        "y": 11,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "I",
        "x": 0,
        "y": 15,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "J",
        "x": 6,
        "y": 15,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "K",
        "x": 10,
        "y": 15,
        "w": 5,
        "h": 6,
        "area": 30
      }
    ],
    "clues": {
      "A_area": 24,
      "A_h": 6,
      "B_area": 30,
      "C_area": 36,
      "D_area": 35,
      "E_area": 40,
      "F_area": 20,
      "G_area": 20,
      "I_area": 36,
      "J_area": 24
    },
    "question": {
      "targetId": "K",
      "type": "area"
    },
    "solution": 30
  },
  {
    "id": "level_89",
    "title": "達人 9:  11重連鎖の迷宮 [第3型]",
    "difficulty": "Grandmaster",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "C",
        "x": 10,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "D",
        "x": 0,
        "y": 5,
        "w": 7,
        "h": 4,
        "area": 28
      },
      {
        "id": "E",
        "x": 7,
        "y": 5,
        "w": 8,
        "h": 4,
        "area": 32
      },
      {
        "id": "F",
        "x": 0,
        "y": 9,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "G",
        "x": 5,
        "y": 9,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "H",
        "x": 10,
        "y": 9,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "I",
        "x": 0,
        "y": 15,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "J",
        "x": 6,
        "y": 15,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "K",
        "x": 10,
        "y": 15,
        "w": 5,
        "h": 5,
        "area": 25
      }
    ],
    "clues": {
      "A_area": 20,
      "A_w": 4,
      "B_area": 30,
      "C_area": 25,
      "D_area": 28,
      "E_area": 32,
      "F_area": 30,
      "G_area": 30,
      "I_area": 30,
      "J_area": 20
    },
    "question": {
      "targetId": "K",
      "type": "area"
    },
    "solution": 25
  },
  {
    "id": "level_90",
    "title": "達人 10:  思考力テスト極致 [第3型]",
    "difficulty": "Grandmaster",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 9,
        "y": 0,
        "w": 7,
        "h": 4,
        "area": 28
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "E",
        "x": 6,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "F",
        "x": 11,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "G",
        "x": 0,
        "y": 9,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "H",
        "x": 4,
        "y": 9,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "I",
        "x": 10,
        "y": 9,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "J",
        "x": 0,
        "y": 15,
        "w": 8,
        "h": 4,
        "area": 32
      },
      {
        "id": "K",
        "x": 8,
        "y": 15,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "L",
        "x": 12,
        "y": 15,
        "w": 4,
        "h": 4,
        "area": 16
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 4,
      "B_area": 16,
      "C_area": 28,
      "D_area": 30,
      "E_area": 25,
      "G_area": 24,
      "H_area": 36,
      "J_area": 32,
      "K_area": 16
    },
    "question": {
      "targetId": "L",
      "type": "area"
    },
    "solution": 16
  },
  {
    "id": "level_91",
    "title": "達人 11:  難攻不落の長方形 [第3型]",
    "difficulty": "Grandmaster",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "B",
        "x": 6,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "C",
        "x": 12,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 9,
        "h": 5,
        "area": 45
      },
      {
        "id": "E",
        "x": 9,
        "y": 4,
        "w": 9,
        "h": 5,
        "area": 45
      },
      {
        "id": "F",
        "x": 0,
        "y": 9,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "G",
        "x": 4,
        "y": 9,
        "w": 8,
        "h": 6,
        "area": 48
      },
      {
        "id": "H",
        "x": 12,
        "y": 9,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "I",
        "x": 0,
        "y": 15,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "J",
        "x": 6,
        "y": 15,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "K",
        "x": 12,
        "y": 15,
        "w": 6,
        "h": 4,
        "area": 24
      }
    ],
    "clues": {
      "A_area": 24,
      "A_w": 6,
      "B_area": 24,
      "C_area": 24,
      "D_area": 45,
      "E_area": 45,
      "F_area": 24,
      "G_area": 48,
      "I_area": 24,
      "J_area": 24
    },
    "question": {
      "targetId": "K",
      "type": "area"
    },
    "solution": 24
  },
  {
    "id": "level_92",
    "title": "達人 12:  幾何学最高峰のパズル [第3型]",
    "difficulty": "Grandmaster",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "C",
        "x": 9,
        "y": 0,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "D",
        "x": 0,
        "y": 6,
        "w": 7,
        "h": 5,
        "area": 35
      },
      {
        "id": "E",
        "x": 7,
        "y": 6,
        "w": 8,
        "h": 5,
        "area": 40
      },
      {
        "id": "F",
        "x": 0,
        "y": 11,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "G",
        "x": 5,
        "y": 11,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "H",
        "x": 10,
        "y": 11,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "I",
        "x": 0,
        "y": 15,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "J",
        "x": 6,
        "y": 15,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "K",
        "x": 10,
        "y": 15,
        "w": 5,
        "h": 6,
        "area": 30
      }
    ],
    "clues": {
      "A_area": 24,
      "A_h": 6,
      "B_area": 30,
      "C_area": 36,
      "D_area": 35,
      "E_area": 40,
      "F_area": 20,
      "G_area": 20,
      "I_area": 36,
      "J_area": 24
    },
    "question": {
      "targetId": "K",
      "type": "area"
    },
    "solution": 30
  },
  {
    "id": "level_93",
    "title": "達人 13:  11重連鎖の迷宮 [第4型]",
    "difficulty": "Grandmaster",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "C",
        "x": 10,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "D",
        "x": 0,
        "y": 5,
        "w": 7,
        "h": 4,
        "area": 28
      },
      {
        "id": "E",
        "x": 7,
        "y": 5,
        "w": 8,
        "h": 4,
        "area": 32
      },
      {
        "id": "F",
        "x": 0,
        "y": 9,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "G",
        "x": 5,
        "y": 9,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "H",
        "x": 10,
        "y": 9,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "I",
        "x": 0,
        "y": 15,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "J",
        "x": 6,
        "y": 15,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "K",
        "x": 10,
        "y": 15,
        "w": 5,
        "h": 5,
        "area": 25
      }
    ],
    "clues": {
      "A_area": 20,
      "A_w": 4,
      "B_area": 30,
      "C_area": 25,
      "D_area": 28,
      "E_area": 32,
      "F_area": 30,
      "G_area": 30,
      "I_area": 30,
      "J_area": 20
    },
    "question": {
      "targetId": "K",
      "type": "area"
    },
    "solution": 25
  },
  {
    "id": "level_94",
    "title": "達人 14:  思考力テスト極致 [第4型]",
    "difficulty": "Grandmaster",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 9,
        "y": 0,
        "w": 7,
        "h": 4,
        "area": 28
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "E",
        "x": 6,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "F",
        "x": 11,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "G",
        "x": 0,
        "y": 9,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "H",
        "x": 4,
        "y": 9,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "I",
        "x": 10,
        "y": 9,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "J",
        "x": 0,
        "y": 15,
        "w": 8,
        "h": 4,
        "area": 32
      },
      {
        "id": "K",
        "x": 8,
        "y": 15,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "L",
        "x": 12,
        "y": 15,
        "w": 4,
        "h": 4,
        "area": 16
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 4,
      "B_area": 16,
      "C_area": 28,
      "D_area": 30,
      "E_area": 25,
      "G_area": 24,
      "H_area": 36,
      "J_area": 32,
      "K_area": 16
    },
    "question": {
      "targetId": "L",
      "type": "area"
    },
    "solution": 16
  },
  {
    "id": "level_95",
    "title": "達人 15:  難攻不落の長方形 [第4型]",
    "difficulty": "Grandmaster",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "B",
        "x": 6,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "C",
        "x": 12,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 9,
        "h": 5,
        "area": 45
      },
      {
        "id": "E",
        "x": 9,
        "y": 4,
        "w": 9,
        "h": 5,
        "area": 45
      },
      {
        "id": "F",
        "x": 0,
        "y": 9,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "G",
        "x": 4,
        "y": 9,
        "w": 8,
        "h": 6,
        "area": 48
      },
      {
        "id": "H",
        "x": 12,
        "y": 9,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "I",
        "x": 0,
        "y": 15,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "J",
        "x": 6,
        "y": 15,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "K",
        "x": 12,
        "y": 15,
        "w": 6,
        "h": 4,
        "area": 24
      }
    ],
    "clues": {
      "A_area": 24,
      "A_w": 6,
      "B_area": 24,
      "C_area": 24,
      "D_area": 45,
      "E_area": 45,
      "F_area": 24,
      "G_area": 48,
      "I_area": 24,
      "J_area": 24
    },
    "question": {
      "targetId": "K",
      "type": "area"
    },
    "solution": 24
  },
  {
    "id": "level_96",
    "title": "達人 16:  幾何学最高峰のパズル [第4型]",
    "difficulty": "Grandmaster",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "C",
        "x": 9,
        "y": 0,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "D",
        "x": 0,
        "y": 6,
        "w": 7,
        "h": 5,
        "area": 35
      },
      {
        "id": "E",
        "x": 7,
        "y": 6,
        "w": 8,
        "h": 5,
        "area": 40
      },
      {
        "id": "F",
        "x": 0,
        "y": 11,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "G",
        "x": 5,
        "y": 11,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "H",
        "x": 10,
        "y": 11,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "I",
        "x": 0,
        "y": 15,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "J",
        "x": 6,
        "y": 15,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "K",
        "x": 10,
        "y": 15,
        "w": 5,
        "h": 6,
        "area": 30
      }
    ],
    "clues": {
      "A_area": 24,
      "A_h": 6,
      "B_area": 30,
      "C_area": 36,
      "D_area": 35,
      "E_area": 40,
      "F_area": 20,
      "G_area": 20,
      "I_area": 36,
      "J_area": 24
    },
    "question": {
      "targetId": "K",
      "type": "area"
    },
    "solution": 30
  },
  {
    "id": "level_97",
    "title": "達人 17:  11重連鎖の迷宮 [第5型]",
    "difficulty": "Grandmaster",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "C",
        "x": 10,
        "y": 0,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "D",
        "x": 0,
        "y": 5,
        "w": 7,
        "h": 4,
        "area": 28
      },
      {
        "id": "E",
        "x": 7,
        "y": 5,
        "w": 8,
        "h": 4,
        "area": 32
      },
      {
        "id": "F",
        "x": 0,
        "y": 9,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "G",
        "x": 5,
        "y": 9,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "H",
        "x": 10,
        "y": 9,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "I",
        "x": 0,
        "y": 15,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "J",
        "x": 6,
        "y": 15,
        "w": 4,
        "h": 5,
        "area": 20
      },
      {
        "id": "K",
        "x": 10,
        "y": 15,
        "w": 5,
        "h": 5,
        "area": 25
      }
    ],
    "clues": {
      "A_area": 20,
      "A_w": 4,
      "B_area": 30,
      "C_area": 25,
      "D_area": 28,
      "E_area": 32,
      "F_area": 30,
      "G_area": 30,
      "I_area": 30,
      "J_area": 20
    },
    "question": {
      "targetId": "K",
      "type": "area"
    },
    "solution": 25
  },
  {
    "id": "level_98",
    "title": "達人 18:  思考力テスト極致 [第5型]",
    "difficulty": "Grandmaster",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "B",
        "x": 5,
        "y": 0,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "C",
        "x": 9,
        "y": 0,
        "w": 7,
        "h": 4,
        "area": 28
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 6,
        "h": 5,
        "area": 30
      },
      {
        "id": "E",
        "x": 6,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "F",
        "x": 11,
        "y": 4,
        "w": 5,
        "h": 5,
        "area": 25
      },
      {
        "id": "G",
        "x": 0,
        "y": 9,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "H",
        "x": 4,
        "y": 9,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "I",
        "x": 10,
        "y": 9,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "J",
        "x": 0,
        "y": 15,
        "w": 8,
        "h": 4,
        "area": 32
      },
      {
        "id": "K",
        "x": 8,
        "y": 15,
        "w": 4,
        "h": 4,
        "area": 16
      },
      {
        "id": "L",
        "x": 12,
        "y": 15,
        "w": 4,
        "h": 4,
        "area": 16
      }
    ],
    "clues": {
      "A_area": 20,
      "A_h": 4,
      "B_area": 16,
      "C_area": 28,
      "D_area": 30,
      "E_area": 25,
      "G_area": 24,
      "H_area": 36,
      "J_area": 32,
      "K_area": 16
    },
    "question": {
      "targetId": "L",
      "type": "area"
    },
    "solution": 16
  },
  {
    "id": "level_99",
    "title": "達人 19:  難攻不落の長方形 [第5型]",
    "difficulty": "Grandmaster",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "B",
        "x": 6,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "C",
        "x": 12,
        "y": 0,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "D",
        "x": 0,
        "y": 4,
        "w": 9,
        "h": 5,
        "area": 45
      },
      {
        "id": "E",
        "x": 9,
        "y": 4,
        "w": 9,
        "h": 5,
        "area": 45
      },
      {
        "id": "F",
        "x": 0,
        "y": 9,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "G",
        "x": 4,
        "y": 9,
        "w": 8,
        "h": 6,
        "area": 48
      },
      {
        "id": "H",
        "x": 12,
        "y": 9,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "I",
        "x": 0,
        "y": 15,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "J",
        "x": 6,
        "y": 15,
        "w": 6,
        "h": 4,
        "area": 24
      },
      {
        "id": "K",
        "x": 12,
        "y": 15,
        "w": 6,
        "h": 4,
        "area": 24
      }
    ],
    "clues": {
      "A_area": 24,
      "A_w": 6,
      "B_area": 24,
      "C_area": 24,
      "D_area": 45,
      "E_area": 45,
      "F_area": 24,
      "G_area": 48,
      "I_area": 24,
      "J_area": 24
    },
    "question": {
      "targetId": "K",
      "type": "area"
    },
    "solution": 24
  },
  {
    "id": "level_100",
    "title": "達人 20:  幾何学最高峰のパズル [第5型]",
    "difficulty": "Grandmaster",
    "rects": [
      {
        "id": "A",
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "B",
        "x": 4,
        "y": 0,
        "w": 5,
        "h": 6,
        "area": 30
      },
      {
        "id": "C",
        "x": 9,
        "y": 0,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "D",
        "x": 0,
        "y": 6,
        "w": 7,
        "h": 5,
        "area": 35
      },
      {
        "id": "E",
        "x": 7,
        "y": 6,
        "w": 8,
        "h": 5,
        "area": 40
      },
      {
        "id": "F",
        "x": 0,
        "y": 11,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "G",
        "x": 5,
        "y": 11,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "H",
        "x": 10,
        "y": 11,
        "w": 5,
        "h": 4,
        "area": 20
      },
      {
        "id": "I",
        "x": 0,
        "y": 15,
        "w": 6,
        "h": 6,
        "area": 36
      },
      {
        "id": "J",
        "x": 6,
        "y": 15,
        "w": 4,
        "h": 6,
        "area": 24
      },
      {
        "id": "K",
        "x": 10,
        "y": 15,
        "w": 5,
        "h": 6,
        "area": 30
      }
    ],
    "clues": {
      "A_area": 24,
      "A_h": 6,
      "B_area": 30,
      "C_area": 36,
      "D_area": 35,
      "E_area": 40,
      "F_area": 20,
      "G_area": 20,
      "I_area": 36,
      "J_area": 24
    },
    "question": {
      "targetId": "K",
      "type": "area"
    },
    "solution": 30
  }
];

export function getPresetModel(id) {
  const data = PRESET_PUZZLES.find(p => p.id === id) || PRESET_PUZZLES[0];
  return new AreaMazeModel(data);
}
