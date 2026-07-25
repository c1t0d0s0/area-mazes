# 📐 Area Mazes (面積迷路 - Menseki Meiro)

> 整数計算とひらめきだけで解く「面積迷路（Menseki Meiro）」の本格パズルWebアプリケーション。自動生成・解法ヒント・自作エディター・印刷機能を搭載！

---

## 🌟 概要

**面積迷路 (Area Mazes / Menseki Meiro)** は、パズル作家の稲葉直貴氏とMensa Japanによって考案された人気の幾何学パズルです。

ルールはシンプル：**分数や小数を使わず、整数の計算（$\text{面積} = \text{幅} \times \text{高さ}$）と直感的なひらめきだけで `?` に入る数値を導き出します。**

本アプリケーションは、推論ソルバーエンジン、難易度別の自動問題生成器、30のプリセットステージ、自作エディター、印刷機能、Web Audio効果音を備えたフル機能のデジタルパズルゲームです。

---

## ✨ 主な機能

- 🎮 **100の厳選プリセット問題**: 入門 (Easy 15問) から達人 (Grandmaster 20問) までの全100ステージ。特に歯ごたえのある中級・上級・達人レベルを大幅拡充。クリアタイムやスター評価（1〜3つ星）を自動記録。
- 🎲 **問題自動生成器**: 100% 整数で解ける矛盾のないオリジナルパズルを無限に自動生成。
- 💡 **ステップバイステップ解法ヒント**: 自作の推論エンジン (`AreaMazeSolver`) が図面のハイライトとともに論理的な解き方を段階的に解説。
- ✏️ **パズル自作エディター**: 長方形の分割、数値配置、`?` の設定、リアルタイム解法判定、ブラウザ保存に対応。
- 📐 **インタラクティブSVG図面**: 高解像度ベクター描画、黄金に輝く `?` ターゲットアニメーション、鉛筆メモ（仮計算）入力機能。
- 🖨️ **印刷・PDF出力機能**: 図面を紙のパズルプリントとして印刷可能なレイアウトに即座に出力。
- 🔊 **Web Audio 効果音**: タクタイルな操作音、メモ書き音、ヒント音、クリアファンファーレを生成。
- 🎨 **グラスモフィズムUI**: 洗練されたダークモードデザイン、Google Fonts（Outfit, Inter, JetBrains Mono）、紙吹雪クリア演出。

---

## 🚀 開発・起動手順

### 前提条件
- [Node.js](https://nodejs.org/) (v18 以上推奨)
- `npm` または `yarn`

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/c1t0d0s0/area-mazes.git

# ディレクトリに移動
cd area-mazes

# 依存パッケージのインストール
npm install
```

### ローカル開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` にアクセスしてください。

### プロダクションビルド

```bash
npm run build
```

`dist/` ディレクトリに最適化されたビルドファイルが出力されます。

---

## 🌐 GitHub Pages への自動デプロイ

`v*` 形式のリリースタグ（例: `v1.0.0`）を GitHub に Push すると、GitHub Actions ワークフロー (`.github/workflows/deploy.yml`) が自動起動し、`dist/` 配下のコンテンツを GitHub Pages にデプロイします。

```bash
# タグの作成と Push
git tag v1.0.0
git push origin v1.0.0
```

> **事前に必要なリポジトリ設定**:
> GitHub リポジトリの **Settings** > **Pages** > **Build and deployment** にて、`Source` を **「GitHub Actions」** に選択してください。

---

## 🛠️ モジュール構成

```
area-mazes/
├── index.html                  # メインHTMLドキュメント（SEO設定済み）
├── README.md                   # 英語版 README
├── README.ja.md                # 日本語版 README
├── src/
│   ├── main.js                 # アプリ初期化 & ルーティング
│   ├── engine/
│   │   ├── AreaMazeModel.js    # 面積迷路のデータ構造
│   │   ├── AreaMazeSolver.js   # 制約充足推論エンジン
│   │   ├── AreaMazeGenerator.js# 問題自動生成アルゴリズム
│   │   └── PresetPuzzles.js    # プリセットパズル30選
│   ├── components/
│   │   ├── MazeRenderer.js     # SVG図面描画 & ハイライト
│   │   ├── Numpad.js           # テンキー & 鉛筆メモツール
│   │   ├── HintModal.js        # ステップバイステップ解法ヒント
│   │   └── VictoryModal.js     # クリア演出 & スター評価
│   ├── views/
│   │   ├── LevelSelectView.js  # ステージ選択画面
│   │   ├── GameView.js         # パズルプレイ画面
│   │   └── EditorView.js       # 自作エディター画面
│   ├── utils/
│   │   ├── SoundManager.js     # Web Audio API 効果音
│   │   ├── Storage.js          # LocalStorage 進捗管理
│   │   └── PrintExporter.js    # 印刷・PDF出力レイアウト
│   └── styles/
│       ├── main.css            # ベーススタイル & デザインシステム
│       ├── components.css      # コンポーネントスタイル
│       └── diagram.css         # SVG図面スタイル
```

---

## 🧠 パズル解法ロジック

推論エンジンは以下の4つの基本ルールを巡回してパズルを解き明かします：

1. **基本公式**: $A = W \times H \implies W = A / H, H = A / W$
2. **共有辺・整列の適用**: 境界線を共有する長方形同士の幅・高さの一致。
3. **スパン加減算**: 同一軸上に並ぶ長方形の全体の幅・高さの合計比較。
4. **面積比推論**: 高さが共通な長方形同士の面積比に基づく幅の計算（$\frac{A_1}{A_2} = \frac{W_1}{W_2}$）。

---

## 📄 ライセンス

本プロジェクトは [MIT License](LICENSE) のもとで公開されています。

---

## 🙏 クレジット

- **原案**: **稲葉直貴 氏** & **Mensa Japan**
