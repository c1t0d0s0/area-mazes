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
- 📐 **インタラクティブSVG図面**: 高解像度ベクター描画、赤ペンの点線で示す `?` ターゲット、鉛筆メモ（仮計算）入力機能。
- 🖨️ **印刷・PDF出力機能**: 図面を紙のパズルプリントとして印刷可能なレイアウトに即座に出力。
- 🔊 **Web Audio 効果音**: タクタイルな操作音、メモ書き音、ヒント音、クリアファンファーレを生成。
- 🎨 **紙とインクのデザイン**: 姉妹アプリ「算数チャレンジ」と同じテイスト（原稿用紙と赤ペン。暗い画面では黒板とチョーク）。端末の明暗設定に自動で追従。Google Fonts（Klee One, Zen Maru Gothic）、リスザルのキャラクター、紙吹雪クリア演出。
- 🔑 **Google ログイン（任意）**: ログインするとクリア記録を Firestore に保存し、ほかのブラウザや端末でも同じ記録で遊べます。ログインしなくても今までどおり遊べます。

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

公開するビルドの設定は、リポジトリの **Settings** > **Secrets and variables** > **Actions** > **Variables** に登録します。

| 変数 | 内容 |
|---|---|
| `GTM_ID` | Google アナリティクス / タグ マネージャーの ID。登録してあればタグを埋め込みます |
| `FIREBASE_API_KEY` `FIREBASE_AUTH_DOMAIN` `FIREBASE_PROJECT_ID` `FIREBASE_APP_ID` | 4つとも登録してあれば、Google ログインと Firestore への保存が使えます（なければログインの入り口を出しません） |

---

## 🔑 ログインと記録の保存 (Firebase)

Google でログインした人のクリア記録（スター数と最短クリアタイム）は Firebase の Firestore に保存し、どのブラウザでも同じ記録で遊べます。
ログインは任意で、ログインしない人は、今までどおりそのブラウザの localStorage に保存します。
**Firebase の設定を入れていないビルドでは、ログインの入り口は出ず、Firebase のコードも読みこまれません。**

### 仕組み

- ログインしていないとき: 記録は localStorage に保存します（`src/utils/Storage.js`）
- ログインしているとき: プリセット100問の記録は localStorage には書かず、Firestore に保存します（`src/cloud/sync.js`）。
  ページを開くと Firestore から読みこみ、読み終わるまでは「読みこみ中…」と出します
- 新しい記録を書くときは、Firestore にある記録と合わせます（スターは多いほう、クリアタイムは短いほう）。
  2台で別々に遊んでも、よい記録が消えることはありません（`src/cloud/records.js`）
- ログインしたとき、その端末にログインなしの記録があれば、アカウントにうつすかどうかを聞きます。
  うつした記録は端末から消します。うつさなかった記録は端末に残り、ログアウトするとまた使えます
- 通信できずに送れなかった記録は、ページを開いている間はおぼえていて、つながったら送ります
- **自作パズルと、自作パズル・ランダム問題の記録は、アカウントには保存しません**（その端末の localStorage に置いたままです）

### Firestore の形（算数チャレンジ・Wordlynx と共通）

同じ Firebase プロジェクトを算数チャレンジや Wordlynx と共有できます（このアプリの `appId` は `area-mazes`）。

```
users/{uid}                                    その人の情報 (全アプリ共通)
  schema: 1, createdAt, updatedAt              ※ 名前・メールアドレス・写真は保存しない

users/{uid}/apps/area-mazes                    アプリごとの記録のまとめ (このアプリでは中身を使わない)

users/{uid}/apps/area-mazes/progress/{level_N} ステージごとのクリア記録
  schema: 1, updatedAt, status: "done"
  data: { stars: スター数 (1〜3), seconds: 最短クリアタイム (秒) }
```

読み書きできるのはログインしている本人だけです（`firestore.rules`）。

### Firebase の準備

1. [Firebase コンソール](https://console.firebase.google.com/) でプロジェクトを作り（算数チャレンジと同じプロジェクトでもよい）、ウェブアプリを登録する
2. Authentication → ログイン方法 で **Google** を有効にする。設定 → 承認済みドメイン に、公開先のドメインを足す
3. Firestore Database を作り、ルールに `firestore.rules` の内容を設定する
4. ウェブアプリの設定値のうち4つを入れる
   - 手元: `config.example.js` を `config.js` にコピーして、`FIREBASE_API_KEY` / `FIREBASE_AUTH_DOMAIN` / `FIREBASE_PROJECT_ID` / `FIREBASE_APP_ID` を書く
   - GitHub Pages: 上の表のとおり、同じ4つの名前でリポジトリ変数に登録する

   環境変数があればそれを使い、なければ `config.js` の値を使います。4つのうち一部だけを入れると、ビルドがエラーになります。
   設定はビルドのときに読むので、変えたら `npm run dev` / `npm run build` をやり直してください。

ログインに失敗すると、ボタンの下に「ログインできませんでした。(auth/…)」と Firebase のエラーの名前が出ます
（`auth/unauthorized-domain` なら承認済みドメインの登録もれ、`auth/operation-not-allowed` なら Google ログインが無効、など）。

### エミュレーターで動かす（開発用）

本物の Firebase を使わずに、手元でログインと保存をためせます（Java が必要）。

```bash
npx firebase-tools emulators:start --only auth,firestore --project demo-area-mazes
FIREBASE_API_KEY=x FIREBASE_AUTH_DOMAIN=localhost FIREBASE_PROJECT_ID=demo-area-mazes FIREBASE_APP_ID=x FIREBASE_EMULATOR=1 npm run dev
```

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
│   │   ├── VictoryModal.js     # クリア演出 & スター評価
│   │   └── AccountBox.js       # Google ログイン欄
│   ├── cloud/
│   │   ├── store.js            # クリア記録の読み書き（localStorage / Firestore の切りかえ）
│   │   ├── sync.js             # Firestore との同期
│   │   ├── records.js          # 記録の形と合わせ方
│   │   └── firebase.js         # Firebase を使う部分（あとから読みこむ）
│   ├── views/
│   │   ├── LevelSelectView.js  # ステージ選択画面
│   │   ├── GameView.js         # パズルプレイ画面
│   │   └── EditorView.js       # 自作エディター画面
│   ├── utils/
│   │   ├── SoundManager.js     # Web Audio API 効果音
│   │   ├── Storage.js          # LocalStorage 進捗管理
│   │   ├── monkey.js           # リスザルのキャラクター (SVG)
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
