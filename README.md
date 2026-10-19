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
- 📐 **Interactive SVG Renderer**: Crisp vector diagrams with dynamic zoom, segment highlights, red-pen dashed target markers, and pencil scratchpad notes.
- 🖨️ **Print & PDF Export**: Export any puzzle diagram into a clean printable paper worksheet with an answer box.
- 🔊 **Synthesized Audio Effects**: Zero-dependency Web Audio API sound generator for tactile feedback, pencil scratches, hint chimes, and victory fanfares.
- 🎨 **Paper-and-Ink Design**: Shares its look with the sister app Math Challenge (manuscript paper and a red pen; a blackboard with chalk on dark screens). Follows the device's light/dark setting, with Google Fonts (Klee One, Zen Maru Gothic), a squirrel monkey mascot, and celebratory particle effects.
- 🐒 **Dress Up the Monkey**: Clearing levels wins accessories for the squirrel monkey (12 in all). Tap the monkey on the home screen or "Dress Up the Monkey" to put them on and take them off. They are won by "clear your first level", "clear all Easy levels", "all Easy levels with ★3 (at most 1 hint)" … "clear 50 levels" … "all Grandmaster levels with ★3" (`src/utils/rewards.js`).
- 🔑 **Google Sign-In (optional)**: Sign in to save cleared levels to Firestore and keep the same progress on other browsers and devices. Playing without signing in works exactly as before.

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

## 🌐 Automatic Deployment (GitHub Pages)

Pushing to the `main` branch triggers a GitHub Actions workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) that checks the puzzles, builds, and deploys the `dist/` directory to GitHub Pages. Nothing is deployed if the check fails. The workflow can also be run manually from the Actions tab.

> **Repository Setup**:
> Ensure that your GitHub repository settings under **Settings** > **Pages** > **Build and deployment** have `Source` set to **"GitHub Actions"**.

Build settings for the published site are registered under **Settings** > **Secrets and variables** > **Actions** > **Variables**.

| Variable | Purpose |
|---|---|
| `GTM_ID` | Google Analytics / Tag Manager ID. When set, the tag is embedded |
| `FIREBASE_API_KEY` `FIREBASE_AUTH_DOMAIN` `FIREBASE_PROJECT_ID` `FIREBASE_APP_ID` | When all four are set, Google sign-in and saving to Firestore are enabled (otherwise the sign-in entry is hidden) |

---

## 🔑 Sign-In & Saved Progress (Firebase)

Players who sign in with Google have their progress (stars and best clear time) saved to Firebase Firestore, so it follows them to any browser.
Signing in is optional; without it, progress is kept in the browser's localStorage as before.
**Builds without a Firebase config show no sign-in entry and load no Firebase code.**

### How It Works

- Signed out: progress is kept in localStorage (`src/utils/Storage.js`)
- Signed in: progress on the 100 preset levels is not written to localStorage but saved to Firestore (`src/cloud/sync.js`).
  It is loaded from Firestore when the page opens; "Loading…" is shown until then
- A new record is merged with the one already in Firestore (more stars and the shorter clear time win),
  so playing on two devices never loses the better record (`src/cloud/records.js`)
- On sign-in, if the device has guest progress, the player is asked whether to move it to the account.
  Moved progress is removed from the device; progress left behind is available again after signing out
- Won accessories are not stored; they are worked out from the progress every time. Only what the monkey wears is saved: in the account while signed in, otherwise in localStorage (`area_mazes_outfit_v1`)
- Records that could not be sent are remembered while the page is open and sent once the connection is back
- **Custom puzzles, and progress on custom and random puzzles, are not saved to the account** (they stay in that device's localStorage)

### Firestore Layout (shared with Math Challenge and Wordlynx)

The same Firebase project can be shared with Math Challenge and Wordlynx (this app's `appId` is `area-mazes`).

```
users/{uid}                                    User document (shared by all apps)
  schema: 1, createdAt, updatedAt              * no name, email address or photo is stored

users/{uid}/apps/area-mazes                    Per-app summary
  settings: { outfit: ids of the accessories worn, at: when they were chosen }   * the newer choice wins

users/{uid}/apps/area-mazes/progress/{level_N} One record per cleared level
  schema: 1, updatedAt, status: "done"
  data: { stars: 1-3, seconds: best clear time in seconds }
```

Only the signed-in owner can read and write (`firestore.rules`).

### Firebase Setup

1. Create a project in the [Firebase console](https://console.firebase.google.com/) (the Math Challenge project can be reused) and register a web app
2. Under Authentication → Sign-in method, enable **Google**. Under Settings → Authorized domains, add the domain you publish to
3. Create a Firestore Database and set its rules to the contents of `firestore.rules`
4. Provide four values from the web app config
   - Locally: copy `config.example.js` to `config.js` and fill in `FIREBASE_API_KEY` / `FIREBASE_AUTH_DOMAIN` / `FIREBASE_PROJECT_ID` / `FIREBASE_APP_ID`
   - GitHub Pages: register repository variables with the same four names (see the table above)

   Environment variables win over `config.js`. Setting only some of the four makes the build fail.
   The values are read at build time, so restart `npm run dev` / re-run `npm run build` after changing them.

When sign-in fails, the Firebase error code is shown under the button, e.g. "Could not sign in. (auth/…)"
(`auth/unauthorized-domain`: the domain is missing from the authorized domains; `auth/operation-not-allowed`: Google sign-in is not enabled).

### Running Against the Emulators (development)

Sign-in and saving can be tried locally without a real Firebase project (requires Java).

```bash
npx firebase-tools emulators:start --only auth,firestore --project demo-area-mazes
FIREBASE_API_KEY=x FIREBASE_AUTH_DOMAIN=localhost FIREBASE_PROJECT_ID=demo-area-mazes FIREBASE_APP_ID=x FIREBASE_EMULATOR=1 npm run dev
```

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
│   │   ├── VictoryModal.js     # Stage clear modal with star rating
│   │   └── AccountBox.js       # Google sign-in box
│   ├── cloud/
│   │   ├── store.js            # Progress store (switches between localStorage and Firestore)
│   │   ├── sync.js             # Sync with Firestore
│   │   ├── records.js          # Record shape & merge rules
│   │   └── firebase.js         # Everything that touches Firebase (lazy-loaded)
│   ├── views/
│   │   ├── LevelSelectView.js  # Campaign map & difficulty filter
│   │   ├── GameView.js         # Interactive gameplay screen & timer
│   │   └── EditorView.js       # Custom level builder & solvability checker
│   ├── utils/
│   │   ├── SoundManager.js     # Web Audio API sound synthesizer
│   │   ├── Storage.js          # LocalStorage progress manager
│   │   ├── monkey.js           # Squirrel monkey mascot (SVG)
│   │   └── PrintExporter.js    # PDF/Paper printing layout exporter
│   └── styles/
│       ├── main.css            # CSS variables & base resets
│       ├── components.css      # Screens, number pad, modals & editor
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
