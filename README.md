# 📐 Area Mazes (Menseki Meiro)

> A modern, interactive web application for solving, generating, and creating **Area Mazes (Menseki Meiro)** geometry puzzles using pure integer arithmetic.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vite](https://img.shields.io/badge/built%20with-Vite-646CFF.svg)
![JavaScript](https://img.shields.io/badge/language-Vanilla%20JS-F7DF1E.svg)

---

## 🌟 Overview

**Area Mazes** (also known as *Menseki Meiro* 面積迷路) are geometric spatial-logic puzzles created by Japanese puzzle author Naoki Inaba in collaboration with Mensa Japan. 

The rule is simple: **Find the target value marked with `?` using only integer arithmetic ($\text{Area} = \text{Width} \times \text{Height}$) without using fractions or decimals!**

This web application offers a complete digital experience featuring a built-in constraint solver, procedural puzzle generator, 30 hand-crafted campaign levels, custom level builder, Web Audio API sound effects, and print sheet export.

---

## ✨ Features

- 🎮 **100 Hand-Crafted Preset Puzzles**: Ranging from **Easy (入門)** to **Grandmaster (達人)** with 1-3 star ratings, best time tracking, and completion badges. Heavy focus on advanced tiers (Medium, Hard, Expert, Grandmaster).
- 🎲 **Procedural Level Generator**: Generate infinite, 100% mathematically solvable puzzles on demand with custom difficulty settings.
- 💡 **Step-by-Step Hint Engine**: Powered by a custom graph constraint-satisfaction solver (`AreaMazeSolver`) that provides visual diagram highlights and logical deduction traces.
- ✏️ **Custom Level Builder / Editor**: Create custom grid partitions, set known values, verify solvability in real-time, and save puzzles to your local library.
- 📐 **Interactive SVG Renderer**: Crisp vector diagrams with dynamic zoom, segment highlights, glowing golden target markers, and pencil scratchpad notes.
- 🖨️ **Print & PDF Export**: Export any puzzle diagram into a clean printable paper worksheet with an answer box.
- 🔊 **Synthesized Audio Effects**: Zero-dependency Web Audio API sound generator for tactile feedback, pencil scratches, hint chimes, and victory fanfares.
- 🎨 **Modern Glassmorphic UI**: Sleek dark-mode aesthetic built with CSS Variables, Google Fonts (Outfit, Inter, JetBrains Mono), and celebratory particle effects.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`

### Installation

```bash
# Clone the repository
git clone https://github.com/c1t0d0s0/area-mazes.git

# Navigate into project directory
cd area-mazes

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### Production Build

```bash
npm run build
```

The optimized bundle will be compiled inside the `dist/` directory.

---

## 🛠️ Architecture & Project Structure

```
area-mazes/
├── index.html                  # Main HTML document with SEO metadata
├── src/
│   ├── main.js                 # Application entry point & router
│   ├── engine/
│   │   ├── AreaMazeModel.js    # Data model for grid partitions & clues
│   │   ├── AreaMazeSolver.js   # Graph constraint-satisfaction solver
│   │   ├── AreaMazeGenerator.js# Procedural level synthesis engine
│   │   └── PresetPuzzles.js    # 30 curated preset campaign levels
│   ├── components/
│   │   ├── MazeRenderer.js     # Scalable SVG diagram renderer & highlights
│   │   ├── Numpad.js           # Virtual numeric keypad & pencil notes
│   │   ├── HintModal.js        # Step-by-step visual hint viewer
│   │   └── VictoryModal.js     # Stage clear modal with star rating
│   ├── views/
│   │   ├── LevelSelectView.js  # Campaign map & difficulty filter
│   │   ├── GameView.js         # Interactive gameplay screen & timer
│   │   └── EditorView.js       # Custom level builder & solvability checker
│   ├── utils/
│   │   ├── SoundManager.js     # Web Audio API sound synthesizer
│   │   ├── Storage.js          # LocalStorage progress manager
│   │   └── PrintExporter.js    # PDF/Paper printing layout exporter
│   └── styles/
│       ├── main.css            # CSS variables & base resets
│       ├── components.css      # Buttons, cards, modals & glassmorphism
│       └── diagram.css         # SVG diagram styles & keyframe animations
```

---

## 🧠 Solving Rules & Engine Logic

The solver engine applies 4 core integer geometry rules in a deduction loop:

1. **Single Rectangle Formula**: $A = W \times H \implies W = A / H, H = A / W$.
2. **Shared Edge & Alignment**: Rectangles sharing boundary edges or grid spans inherit equal lengths.
3. **Segment Addition / Subtraction**: $\sum W_{\text{top}} = \sum W_{\text{bottom}}$ across aligned grid spans.
4. **Area Ratio Deduction**: When two rectangles share height $H$, $\frac{A_1}{A_2} = \frac{W_1}{W_2}$.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).

---

## 🙏 Credits

- **Concept**: Created by **Naoki Inaba** and **Mensa Japan**.
