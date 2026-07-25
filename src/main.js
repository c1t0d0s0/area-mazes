import './styles/main.css';
import './styles/components.css';
import './styles/diagram.css';

import { LevelSelectView } from './views/LevelSelectView.js';
import { GameView } from './views/GameView.js';
import { EditorView } from './views/EditorView.js';
import { getPresetModel, PRESET_PUZZLES } from './engine/PresetPuzzles.js';
import { AreaMazeGenerator } from './engine/AreaMazeGenerator.js';
import { AreaMazeModel } from './engine/AreaMazeModel.js';
import { Storage } from './utils/Storage.js';

class App {
  constructor() {
    this.appEl = document.querySelector('#app');
    this.currentView = 'level_select';
    this.currentLevelId = null;

    this.levelSelectView = null;
    this.gameView = null;
    this.editorView = null;

    this.init();
  }

  init() {
    this.renderView('level_select');
  }

  renderView(viewName, param = null) {
    this.currentView = viewName;
    this.appEl.innerHTML = '';

    if (viewName === 'level_select') {
      const container = document.createElement('div');
      this.appEl.appendChild(container);

      this.levelSelectView = new LevelSelectView(container, {
        onSelectLevel: (levelId) => {
          this.renderView('game', { type: 'preset', id: levelId });
        },
        onQuickPlay: (difficulty) => {
          this.renderView('game', { type: 'random', difficulty });
        },
        onOpenEditor: () => {
          this.renderView('editor');
        }
      });
      this.levelSelectView.render();
    } else if (viewName === 'game') {
      const container = document.createElement('div');
      this.appEl.appendChild(container);

      this.gameView = new GameView(container, {
        onNavigate: (target, targetParam) => {
          if (target === 'level_select') {
            this.renderView('level_select');
          } else if (target === 'next_level') {
            this.playNextLevel(targetParam);
          }
        }
      });

      let model = null;
      if (param && param.type === 'preset') {
        this.currentLevelId = param.id;
        // Check custom first then preset
        const customs = Storage.getCustomLevels();
        const customData = customs.find(c => c.id === param.id);
        if (customData) {
          model = AreaMazeModel.fromJSON(customData);
        } else {
          model = getPresetModel(param.id);
        }
      } else if (param && param.type === 'random') {
        model = AreaMazeGenerator.generate(param.difficulty || 'Medium');
        this.currentLevelId = model.id;
      } else {
        model = getPresetModel('level_1');
        this.currentLevelId = 'level_1';
      }

      this.gameView.loadLevel(model);
    } else if (viewName === 'editor') {
      const container = document.createElement('div');
      this.appEl.appendChild(container);

      this.editorView = new EditorView(container, {
        onNavigate: (target) => {
          if (target === 'level_select') {
            this.renderView('level_select');
          }
        }
      });
      this.editorView.render();
    }
  }

  playNextLevel(currentId) {
    if (!currentId) {
      this.renderView('level_select');
      return;
    }

    const currIdx = PRESET_PUZZLES.findIndex(p => p.id === currentId);
    if (currIdx >= 0 && currIdx < PRESET_PUZZLES.length - 1) {
      const nextId = PRESET_PUZZLES[currIdx + 1].id;
      this.renderView('game', { type: 'preset', id: nextId });
    } else {
      // If completed last preset or custom, generate a fresh random level
      this.renderView('game', { type: 'random', difficulty: 'Hard' });
    }
  }
}

// Start Application
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
