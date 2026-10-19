/**
 * Internationalization (i18n) module for Area Mazes
 * Supports Japanese (ja) and English (en).
 * Automatically detects browser language (ja -> Japanese, others -> English).
 */

export const translations = {
  ja: {
    // App Meta
    appTitle: 'Area Mazes (面積迷路) - ひらめきと整数の幾何学パズル',
    appDescription: 'Area Mazes（面積迷路）は分数・小数を一切使わずに整数計算とひらめきで解く人気の幾何学パズルアプリ。自動生成、100のレベルパック、自作エディター搭載。',
    langName: '日本語',
    langToggle: 'English',

    // Level Select View
    title: 'AREA MAZES',
    subtitle: '面積迷路 - ひらめきと整数の幾何学パズル',
    btnRandom: 'ランダム問題',
    btnEditor: 'パズルを作る',
    filterAll: 'すべて',
    filterEasy: '入門 (Easy)',
    filterMedium: '初級 (Medium)',
    filterHard: '中級 (Hard)',
    filterExpert: '上級 (Expert)',
    filterGrandmaster: '達人 (Grandmaster)',
    btnPlay: 'プレイ',
    clearBadge: '✓ CLEAR',
    customLevelsTitle: '自作パズル',
    presetLevelsTitle: 'ステージ',
    clearedCount: '{total}問中 {done}問クリア',
    filterLabel: '難易度の切りかえ',
    bestTime: '最短 {time}',
    notCleared: 'まだクリアなし',
    loadingRecords: '読みこみ中…',
    monkeyLabel: 'リスザルのキャラクター',

    // Dress-up (accessories for the squirrel monkey)
    kisekaeTitle: 'リスザルのきせかえ',
    kisekaeOpenLabel: 'リスザルのきせかえを開く（{total}こ中 {earned}こ もらった）',
    kisekaeSummary: '{total}こ中 {earned}こ もらいました',
    kisekaeHelpEarned: 'もらった小物を押すと、付けたり外したりできます。',
    kisekaeHelpNone: 'ステージをクリアすると、リスザルに付ける小物がもらえます。「？」を押すと、もらい方が分かります。',
    kisekaeLocked: 'まだ',
    kisekaeLockedLabel: 'まだもらっていません（{hint}ともらえます）',
    kisekaeHowTo: '{hint}ともらえます。',
    kisekaeWorn: '{name}を付けました！',
    kisekaeRemoved: '{name}を外しました。',
    btnKisekae: 'きせかえる',
    rewardTitle: 'ごほうび ゲット！',
    rewardWorn: 'リスザルに「{name}」を付けました。',
    rewardHintFirst: 'はじめて1問クリアする',
    rewardHintCount: 'ステージを合計{count}問クリアする',
    rewardHintClear: '{difficulty}の{count}問をぜんぶクリアする',
    rewardHintStars: '{difficulty}の{count}問をぜんぶ ★3 でクリアする（ヒントは1回まで）',
    item_ribbon: 'リボン',
    item_flower: '花かざり',
    item_glasses: 'めがね',
    item_pencil: 'えんぴつ',
    item_scarf: 'マフラー',
    item_book: '本',
    item_hat: 'むぎわらぼうし',
    item_headband: 'はちまき',
    item_banana: 'バナナ',
    item_cap: '野球ぼう',
    item_wizard: 'まほうのぼうし',
    item_crown: '王冠',

    // Account (Google sign-in)
    accountTitle: '記録の保存',
    accountChecking: 'たしかめています…',
    accountNote: 'Google でログインすると、クリア記録が保存されて、ほかのブラウザや端末でも同じ記録で遊べます。ログインしなくても遊べます。',
    btnSignIn: 'Google でログイン',
    btnSignOut: 'ログアウト',
    accountSignedIn: 'ログイン中',
    statusSyncing: '保存中…',
    statusSynced: '保存ずみ',
    statusOffline: 'まだ保存できていません。つながったら保存します。',
    signInFailed: 'ログインできませんでした。もういちどためしてください。',
    confirmSignOutUnsynced: 'まだ保存できていない記録があります。今ログアウトすると、その分はなくなります。ログアウトしますか？',
    askMigrate: 'この端末にあるクリア記録を、アカウントにうつしますか？\n（「キャンセル」をえらぶと、アカウントの記録だけを使います。この端末の記録は、ログアウトするとまた使えます）',

    // Game View
    btnBack: '← 一覧',
    btnBackTitle: 'ステージ選択に戻る',
    btnSoundTitle: '音切替',
    timerLabel: '経過時間',
    btnPrintTitle: '印刷',
    btnLangTitle: '言語切替 / Switch Language',
    alertEnterValue: '「 ? 」に入る数値を入力してください。',
    alertWrongValue: '残念！数値が違います。もう一度考えてみましょう。',

    // Numpad
    modeAnswerActive: '<strong>回答モード</strong>: 「 ? 」に入る本番の数値を入力してください',
    modeMemoDefault: '<strong>メモモードON</strong>: 図面の長方形や辺を選んで仮数字（メモ）を書き込めます',
    modeMemoTarget: '<strong>メモモードON</strong>: {target} を入力中',
    targetLabel: '対象箇所:',
    targetArea: '面積',
    targetWidth: '幅 (上辺)',
    targetHeight: '高さ (左辺)',
    btnDelTitle: '1文字消去',
    btnSubmit: '判定',
    btnSubmitTitle: '回答判定',
    btnNote: 'メモモード',
    btnNoteTitle: 'メモ機能のオン/オフ切替',
    btnHint: 'ヒント',
    btnHintTitle: 'ヒントを見る',
    memoWidthLabel: '幅メモ (上辺)',
    memoHeightLabel: '高さメモ (左辺)',
    memoAreaLabel: '面積メモ',
    memoRectTarget: '長方形 {id} の【{label}】',
    memoDefaultTarget: '図面の長方形や辺',

    // Maze Renderer
    focusHere: 'ここに着目',
    placeholderWidth: '+幅',
    placeholderHeight: '+高',

    // Hint Modal
    hintTitle: 'ヒント',
    hintStepTitle: '解法ヒント ({current} / {total})',
    btnClose: '閉じる',
    btnCloseLabel: '閉じる',
    noHints: 'このパズルは既に入力されているか、ヒントが見つかりません。',
    defaultRule: '推論ステップ',
    btnPrev: '← 前へ',
    btnNext: '次へ →',

    // Victory Modal
    stageClear: 'ステージクリア！',
    statClearTime: 'クリアタイム',
    statHintsUsed: 'ヒント使用',
    hintsCount: '{count} 回',
    btnLevelSelect: 'ステージ一覧',
    btnNextStage: '次のステージ →',

    // Editor View
    editorTitle: 'マイカスタムパズル',
    btnEditorBack: '← 一覧に戻る',
    editorHeader: 'パズル自作エディター',
    solvable: '✓ 解答可能 (解: {solution})',
    unsolvable: '解答不可 (情報不足)',
    labelTitle: 'パズルタイトル',
    labelDiff: '難易度',
    diffEasy: 'Easy (入門)',
    diffMedium: 'Medium (初級)',
    diffHard: 'Hard (中級)',
    diffExpert: 'Expert (上級)',
    rectsList: '長方形リスト',
    btnDelete: '削除',
    btnAddRect: '+ 長方形を追加',
    btnSaveCustom: '保存して一覧に追加',
    previewTitle: '図面プレビュー',
    alertMinRects: '長方形は最低2つ必要です。',
    alertSavedCustom: 'カスタムパズルを保存しました！ステージ一覧からプレイできます。',

    // Print Exporter
    printPopupBlocked: 'ポップアップがブロックされました。印刷するにはポップアップを許可してください。',
    printPageTitle: '{title} - 面積迷路 (Area Maze)',
    printMeta: '難易度: {difficulty} | 面積迷路 (Area Maze)',
    printAnswerSection: '解答記入欄',
    printAnswerLine: '答え「 ? 」 =  ________________ cm',
    printFooter: 'Area Mazes (面積迷路) | Printed on {date}',

    // Solver Rect Descriptions & Rules
    rectWithQuestion: '【「 ? 」のある長方形】',
    rectWithArea: '【面積 {area} cm² の長方形】',
    rectWithDim: '【幅 {w} cm・高さ {h} cm の長方形】',
    rectWithWidth: '【幅 {w} cm の長方形】',
    rectWithHeight: '【高さ {h} cm の長方形】',
    rectHighlighted: '【ハイライト中の長方形】',

    ruleAreaCalc: '面積の計算',
    ruleWidthCalc: '幅の計算',
    ruleHeightCalc: '高さの計算',
    ruleSameHeight: '高さを揃える',
    ruleSameWidth: '幅を揃える',
    ruleSpanWidth: '全体の幅の引き算',
    ruleSpanHeight: '全体の高さの引き算',
    ruleAreaRatio: '面積比の計算',

    expAreaCalc: '光っている{desc} の 幅 ({w} cm) × 高さ ({h} cm) から、面積 = {area} cm²',
    expWidthCalc: '光っている{desc} の 面積 ({area} cm²) ÷ 高さ ({h} cm) から、幅 = {w} cm',
    expHeightCalc: '光っている{desc} の 面積 ({area} cm²) ÷ 幅 ({w} cm) から、高さ = {h} cm',
    expSameHeight: '{desc1} と高さが共通しているため、光っている{desc2} の高さ = {h} cm',
    expSameWidth: '{desc1} と幅が共通しているため、光っている{desc2} の幅 = {w} cm',
    expSpanWidth: '全体の横幅 ({totalW} cm) から並んだ幅を引いて、光っている{desc} の幅 = {w} cm',
    expSpanHeight: '全体の縦の高さ ({totalH} cm) から並んだ高さを引いて、光っている{desc} の高さ = {h} cm',
    expChainWidth: 'つながった線をたどると、左右の線の間は {expr} なので、光っている{desc} の幅 = {w} cm',
    expChainHeight: 'つながった線をたどると、上下の線の間は {expr} なので、光っている{desc} の高さ = {h} cm',
    expAreaRatioW: '同高の{desc1} との面積比 ({a1}:{a2}) から、光っている{desc2} の幅 = {w} cm',
    expAreaRatioH: '同幅の{desc1} との面積比 ({a1}:{a2}) から、光っている{desc2} の高さ = {h} cm',
  },
  en: {
    // App Meta
    appTitle: 'Area Mazes - Geometric Logic & Integer Math Puzzles',
    appDescription: 'Area Mazes is a popular geometric logic puzzle game solved using integer calculations and clever insights without fractions or decimals. Features procedural generation, 100 preset levels, and a custom puzzle editor.',
    langName: 'English',
    langToggle: '日本語',

    // Level Select View
    title: 'AREA MAZES',
    subtitle: 'Geometric Logic & Integer Math Puzzles',
    btnRandom: 'Random Puzzle',
    btnEditor: 'Puzzle Editor',
    filterAll: 'All',
    filterEasy: 'Intro (Easy)',
    filterMedium: 'Beginner (Medium)',
    filterHard: 'Intermediate (Hard)',
    filterExpert: 'Advanced (Expert)',
    filterGrandmaster: 'Master (Grandmaster)',
    btnPlay: 'Play',
    clearBadge: '✓ CLEAR',
    customLevelsTitle: 'Custom Puzzles',
    presetLevelsTitle: 'Levels',
    clearedCount: '{done} of {total} cleared',
    filterLabel: 'Difficulty filter',
    bestTime: 'Best {time}',
    notCleared: 'Not cleared yet',
    loadingRecords: 'Loading…',
    monkeyLabel: 'Squirrel monkey mascot',

    // Dress-up (accessories for the squirrel monkey)
    kisekaeTitle: 'Dress Up the Monkey',
    kisekaeOpenLabel: 'Open dress-up ({earned} of {total} accessories won)',
    kisekaeSummary: '{earned} of {total} accessories won',
    kisekaeHelpEarned: 'Tap an accessory you have won to put it on or take it off.',
    kisekaeHelpNone: 'Clear levels to win accessories for the monkey. Tap a "?" to see how to win it.',
    kisekaeLocked: 'Locked',
    kisekaeLockedLabel: 'Not won yet ({hint} to win it)',
    kisekaeHowTo: '{hint} to win it.',
    kisekaeWorn: 'Put on the {name}!',
    kisekaeRemoved: 'Took off the {name}.',
    btnKisekae: 'Dress Up',
    rewardTitle: 'You won a reward!',
    rewardWorn: 'The monkey is now wearing the {name}.',
    rewardHintFirst: 'Clear your first level',
    rewardHintCount: 'Clear {count} levels in total',
    rewardHintClear: 'Clear all {count} {difficulty} levels',
    rewardHintStars: 'Clear all {count} {difficulty} levels with ★3 (at most 1 hint)',
    item_ribbon: 'Ribbon',
    item_flower: 'Flower',
    item_glasses: 'Glasses',
    item_pencil: 'Pencil',
    item_scarf: 'Scarf',
    item_book: 'Book',
    item_hat: 'Straw Hat',
    item_headband: 'Headband',
    item_banana: 'Banana',
    item_cap: 'Baseball Cap',
    item_wizard: 'Wizard Hat',
    item_crown: 'Crown',

    // Account (Google sign-in)
    accountTitle: 'Save Progress',
    accountChecking: 'Checking…',
    accountNote: 'Sign in with Google to save your cleared levels and keep the same progress on other browsers and devices. You can also play without signing in.',
    btnSignIn: 'Sign in with Google',
    btnSignOut: 'Sign out',
    accountSignedIn: 'Signed in',
    statusSyncing: 'Saving…',
    statusSynced: 'Saved',
    statusOffline: 'Not saved yet. It will be saved once you are back online.',
    signInFailed: 'Could not sign in. Please try again.',
    confirmSignOutUnsynced: 'Some progress has not been saved yet. If you sign out now, it will be lost. Sign out anyway?',
    askMigrate: 'Move the progress stored on this device to your account?\n(Choose "Cancel" to use only the progress in your account. The progress on this device will be available again after you sign out.)',

    // Game View
    btnBack: '← Levels',
    btnBackTitle: 'Back to Level Select',
    btnSoundTitle: 'Toggle Sound',
    timerLabel: 'Elapsed time',
    btnPrintTitle: 'Print',
    btnLangTitle: 'Switch Language / 言語切替',
    alertEnterValue: 'Please enter a number for "?".',
    alertWrongValue: 'Incorrect! Double-check your calculations and try again.',

    // Numpad
    modeAnswerActive: '<strong>Answer Mode</strong>: Enter the solution value for "?"',
    modeMemoDefault: '<strong>Note Mode ON</strong>: Select rectangles or edges to write notes',
    modeMemoTarget: '<strong>Note Mode ON</strong>: Entering {target}',
    targetLabel: 'Target:',
    targetArea: 'Area',
    targetWidth: 'Width (Top)',
    targetHeight: 'Height (Left)',
    btnDelTitle: 'Delete digit',
    btnSubmit: 'Check',
    btnSubmitTitle: 'Check Answer',
    btnNote: 'Note Mode',
    btnNoteTitle: 'Toggle Note Mode',
    btnHint: 'Hint',
    btnHintTitle: 'View Hint',
    memoWidthLabel: 'Width Note (Top Edge)',
    memoHeightLabel: 'Height Note (Left Edge)',
    memoAreaLabel: 'Area Note',
    memoRectTarget: '【{label}】 for Rectangle {id}',
    memoDefaultTarget: 'a rectangle or edge on the diagram',

    // Maze Renderer
    focusHere: 'Focus Here',
    placeholderWidth: '+W',
    placeholderHeight: '+H',

    // Hint Modal
    hintTitle: 'Hint',
    hintStepTitle: 'Solution Hint ({current} / {total})',
    btnClose: 'Close',
    btnCloseLabel: 'Close',
    noHints: 'This puzzle is already solved or no hints are available.',
    defaultRule: 'Reasoning Step',
    btnPrev: '← Prev',
    btnNext: 'Next →',

    // Victory Modal
    stageClear: 'Stage Clear!',
    statClearTime: 'Clear Time',
    statHintsUsed: 'Hints Used',
    hintsCount: '{count}',
    btnLevelSelect: 'Levels',
    btnNextStage: 'Next Level →',

    // Editor View
    editorTitle: 'My Custom Puzzle',
    btnEditorBack: '← Back to Levels',
    editorHeader: 'Custom Puzzle Editor',
    solvable: '✓ Solvable (Answer: {solution})',
    unsolvable: 'Unsolvable (Insufficient Clues)',
    labelTitle: 'Puzzle Title',
    labelDiff: 'Difficulty',
    diffEasy: 'Easy (Intro)',
    diffMedium: 'Medium (Beginner)',
    diffHard: 'Hard (Intermediate)',
    diffExpert: 'Expert (Advanced)',
    rectsList: 'Rectangles List',
    btnDelete: 'Delete',
    btnAddRect: '+ Add Rectangle',
    btnSaveCustom: 'Save to Custom Levels',
    previewTitle: 'Diagram Preview',
    alertMinRects: 'At least 2 rectangles are required.',
    alertSavedCustom: 'Custom puzzle saved! You can play it from the level list.',

    // Print Exporter
    printPopupBlocked: 'Pop-up blocked. Please allow pop-ups to print.',
    printPageTitle: '{title} - Area Maze',
    printMeta: 'Difficulty: {difficulty} | Area Maze',
    printAnswerSection: 'Answer Sheet',
    printAnswerLine: 'Answer "?" =  ________________ cm',
    printFooter: 'Area Mazes | Printed on {date}',

    // Solver Rect Descriptions & Rules
    rectWithQuestion: '[Rectangle with "?"]',
    rectWithArea: '[Rectangle with Area {area} cm²]',
    rectWithDim: '[Rectangle with W {w} cm & H {h} cm]',
    rectWithWidth: '[Rectangle with Width {w} cm]',
    rectWithHeight: '[Rectangle with Height {h} cm]',
    rectHighlighted: '[Highlighted Rectangle]',

    ruleAreaCalc: 'Area Calculation',
    ruleWidthCalc: 'Width Calculation',
    ruleHeightCalc: 'Height Calculation',
    ruleSameHeight: 'Same Height Alignment',
    ruleSameWidth: 'Same Width Alignment',
    ruleSpanWidth: 'Total Width Subtraction',
    ruleSpanHeight: 'Total Height Subtraction',
    ruleAreaRatio: 'Area Ratio Calculation',

    expAreaCalc: 'From Width ({w} cm) × Height ({h} cm) of highlighted {desc}, Area = {area} cm²',
    expWidthCalc: 'From Area ({area} cm²) ÷ Height ({h} cm) of highlighted {desc}, Width = {w} cm',
    expHeightCalc: 'From Area ({area} cm²) ÷ Width ({w} cm) of highlighted {desc}, Height = {h} cm',
    expSameHeight: 'Sharing height with {desc1}, the height of highlighted {desc2} = {h} cm',
    expSameWidth: 'Sharing width with {desc1}, the width of highlighted {desc2} = {w} cm',
    expSpanWidth: 'Subtracting adjacent widths from total width ({totalW} cm), width of highlighted {desc} = {w} cm',
    expSpanHeight: 'Subtracting adjacent heights from total height ({totalH} cm), height of highlighted {desc} = {h} cm',
    expChainWidth: 'Along the connected lines, the gap between its left and right lines is {expr}, so the width of highlighted {desc} = {w} cm',
    expChainHeight: 'Along the connected lines, the gap between its top and bottom lines is {expr}, so the height of highlighted {desc} = {h} cm',
    expAreaRatioW: 'From the area ratio ({a1}:{a2}) with same-height {desc1}, width of highlighted {desc2} = {w} cm',
    expAreaRatioH: 'From the area ratio ({a1}:{a2}) with same-width {desc1}, height of highlighted {desc2} = {h} cm',
  }
};

/**
 * Detect browser preferred language:
 * Returns 'ja' if primary browser language starts with 'ja', otherwise returns 'en'.
 */
export function detectBrowserLanguage() {
  if (typeof navigator === 'undefined') return 'en';
  const primaryLang = (navigator.languages && navigator.languages.length > 0)
    ? navigator.languages[0]
    : (navigator.language || navigator.userLanguage || '');
  return (primaryLang && primaryLang.toLowerCase().startsWith('ja')) ? 'ja' : 'en';
}

let currentLang = null;
const listeners = new Set();

/**
 * Get active language ('ja' | 'en')
 */
export function getLanguage() {
  if (!currentLang) {
    try {
      const saved = localStorage.getItem('area_mazes_lang');
      if (saved === 'ja' || saved === 'en') {
        currentLang = saved;
      } else {
        currentLang = detectBrowserLanguage();
      }
    } catch (e) {
      currentLang = detectBrowserLanguage();
    }
  }
  return currentLang;
}

/**
 * Set active language ('ja' | 'en')
 */
export function setLanguage(lang) {
  if (lang !== 'ja' && lang !== 'en') return;
  currentLang = lang;
  try {
    localStorage.setItem('area_mazes_lang', lang);
  } catch (e) {}
  updateDocumentMeta(lang);
  listeners.forEach(fn => fn(lang));
}

/**
 * Toggle active language between 'ja' and 'en'
 */
export function toggleLanguage() {
  const next = getLanguage() === 'ja' ? 'en' : 'ja';
  setLanguage(next);
  return next;
}

/**
 * Subscribe to language changes
 */
export function onLanguageChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/**
 * Translate string by key with parameter interpolation
 */
export function t(key, params = {}) {
  const lang = getLanguage();
  const dict = translations[lang] || translations.en;
  let text = dict[key] || translations.ja[key] || key;

  for (const [paramKey, paramVal] of Object.entries(params)) {
    text = text.replaceAll(`{${paramKey}}`, paramVal !== undefined && paramVal !== null ? paramVal : '');
  }
  return text;
}

/**
 * Translate puzzle title to active language
 */
export function translateTitle(title, lang = null) {
  const targetLang = lang || getLanguage();
  if (targetLang === 'ja' || !title) return title;

  if (title === 'マイカスタムパズル') return 'My Custom Puzzle';

  let t = title;
  t = t.replace(/^入門 (\d+): 基本トレーニング$/, 'Intro $1: Basic Training');
  t = t.replace(/^入門 (\d+): 上下の連鎖$/, 'Intro $1: Vertical Chain');
  t = t.replace(/^初級 (\d+): ステップアップ$/, 'Beginner $1: Stepping Up');
  t = t.replace(/^中級 (\d+): 思考力の壁$/, 'Intermediate $1: Logic Barrier');
  t = t.replace(/^上級 (\d+): 幾何学の要塞$/, 'Advanced $1: Geometric Fortress');
  t = t.replace(/^達人 (\d+):\s*11重連鎖の迷宮 \[第(\d+)型\]$/, 'Master $1: 11-Chain Labyrinth [Type $2]');
  t = t.replace(/^達人 (\d+):\s*思考力テスト極致 \[第(\d+)型\]$/, 'Master $1: Ultimate Logic Test [Type $2]');
  t = t.replace(/^達人 (\d+):\s*難攻不落の長方形 \[第(\d+)型\]$/, 'Master $1: Impregnable Rectangles [Type $2]');
  t = t.replace(/^達人 (\d+):\s*幾何学最高峰のパズル \[第(\d+)型\]$/, 'Master $1: Apex Geometry Challenge [Type $2]');
  t = t.replace(/パズル/g, 'Puzzle');

  return t;
}

/**
 * Update document title, html lang, and meta description
 */
export function updateDocumentMeta(lang = null) {
  if (typeof document === 'undefined') return;
  const targetLang = lang || getLanguage();
  const dict = translations[targetLang] || translations.en;

  document.documentElement.lang = targetLang;
  document.title = dict.appTitle;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', dict.appDescription);
  }
}
