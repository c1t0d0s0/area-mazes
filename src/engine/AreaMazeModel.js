/**
 * AreaMazeModel represents an Area Maze puzzle configuration.
 * Grid consists of rects: { id, x, y, w, h, area }
 * Clues are known values: { type: 'area'|'width'|'height'|'span_w'|'span_h', targetId, value }
 * Question target: { type: 'area'|'width'|'height'|'span_w'|'span_h', targetId }
 */

export class AreaMazeModel {
  constructor({ id, title, difficulty = 'Medium', rects = [], clues = {}, question = null, solution = null }) {
    this.id = id || `maze_${Date.now()}`;
    this.title = title || 'Area Maze Puzzle';
    this.difficulty = difficulty; // Easy, Medium, Hard, Expert, Grandmaster
    this.rects = rects; // Array of { id, x, y, w, h }
    this.clues = clues; // Object map: { 'rect_1_area': 24, 'rect_2_w': 6, ... }
    this.question = question; // { type: 'area'|'width'|'height', targetId: 'rect_1' }
    this.solution = solution; // Integer answer for question
    
    this.computeDerivedProperties();
  }

  computeDerivedProperties() {
    this.rects.forEach(r => {
      r.area = r.w * r.h;
    });

    // Compute bounding box
    if (this.rects.length > 0) {
      this.minX = Math.min(...this.rects.map(r => r.x));
      this.minY = Math.min(...this.rects.map(r => r.y));
      this.maxX = Math.max(...this.rects.map(r => r.x + r.w));
      this.maxY = Math.max(...this.rects.map(r => r.y + r.h));
      this.totalWidth = this.maxX - this.minX;
      this.totalHeight = this.maxY - this.minY;
    } else {
      this.minX = 0; this.minY = 0;
      this.maxX = 10; this.maxY = 10;
      this.totalWidth = 10; this.totalHeight = 10;
    }
  }

  static fromJSON(json) {
    return new AreaMazeModel(json);
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      difficulty: this.difficulty,
      rects: this.rects,
      clues: this.clues,
      question: this.question,
      solution: this.solution
    };
  }
}
