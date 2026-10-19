// Draws the squirrel monkey mascot as an SVG string. Same drawing as src/monkey.js in Math Challenge (math-quiz).
// White face, dark muzzle, dark cap of fur and big ears are what make it a squirrel monkey

// Eyes and outlines keep this colour in both light and dark themes
const LINE = '#1c2a4a';
const RED = '#e8546a';
const YELLOW = '#ffd23f';
const MUZZLE = '#3d3a44';

/** Default colours */
export const DEFAULT_LOOK = { fur: '#e3b84f', light: '#fffaf0', cap: '#6b6558', pink: '#f3b8a4' };

const sparkle = (cx, cy, r, fill = YELLOW) =>
  `<path fill="${fill}" d="M${cx} ${cy - r}Q${cx} ${cy} ${cx + r} ${cy}Q${cx} ${cy} ${cx} ${cy + r}Q${cx} ${cy} ${cx - r} ${cy}Q${cx} ${cy} ${cx} ${cy - r}Z"/>`;

const EYE_Y = 69;
const EYE_X = [43, 77];

function eyes(look) {
  const open = x => (look.eyeColor
    ? `<ellipse cx="${x}" cy="${EYE_Y}" rx="7.5" ry="8.5" fill="${look.eyeColor}" stroke="${LINE}" stroke-width="1.6"/>`
      + `<ellipse cx="${x}" cy="${EYE_Y}" rx="4.2" ry="6" fill="${LINE}"/>`
      + `<circle cx="${x + 2.6}" cy="${EYE_Y - 3.6}" r="2" fill="#fff"/>`
    : `<ellipse cx="${x}" cy="${EYE_Y}" rx="7.5" ry="8.5" fill="${LINE}"/>`
      + `<circle cx="${x + 2.6}" cy="${EYE_Y - 3.6}" r="3.1" fill="#fff"/>`
      + `<circle cx="${x - 2.6}" cy="${EYE_Y + 3.6}" r="1.5" fill="#fff"/>`);
  const arc = (x, up) =>
    `<path fill="none" stroke="${LINE}" stroke-width="2.8" stroke-linecap="round" d="M${x - 7} ${EYE_Y + (up ? 2 : -1)}Q${x} ${EYE_Y + (up ? -8 : 7)} ${x + 7} ${EYE_Y + (up ? 2 : -1)}"/>`;
  const [l, r] = EYE_X;
  switch (look.eyes ?? 'open') {
    case 'wink':
      return open(l) + arc(r, true);
    case 'sleep':
      return arc(l, false) + arc(r, false);
    case 'happy':
      return arc(l, true) + arc(r, true);
    case 'sparkle':
      return open(l) + open(r) + sparkle(l - 12, EYE_Y - 13, 4.5) + sparkle(r + 12, EYE_Y - 13, 4.5);
    case 'brave':
      return open(l) + open(r)
        + `<path fill="none" stroke="${LINE}" stroke-width="3" stroke-linecap="round" d="M34 57L51 61M86 57L69 61"/>`;
    default:
      return open(l) + open(r);
  }
}

// The muzzle is dark, so the mouth is drawn in a light colour
function mouth(look) {
  const nose = `<path fill="#77717f" d="M56.6 85.2Q60 83.6 63.4 85.2Q62 88.2 60 88.6Q58 88.2 56.6 85.2Z"/>`;
  const smile = `<path fill="none" stroke="#f6dccd" stroke-width="2" stroke-linecap="round" d="M53.5 92Q60 97.5 66.5 92"/>`;
  switch (look.mouth ?? 'smile') {
    case 'open':
      return nose
        + `<path fill="#e86a78" stroke="#f6dccd" stroke-width="1.6" stroke-linejoin="round" d="M53 91Q60 101.5 67 91Z"/>`;
    case 'tongue':
      return nose + smile + `<path fill="#f28f86" d="M57.4 94.6Q60 100 62.6 94.6Z"/>`;
    default:
      return nose + smile;
  }
}

const DRAWINGS = {
  ribbon:
    `<g transform="translate(88 32) rotate(18)" stroke="${LINE}" stroke-width="2" stroke-linejoin="round" fill="${RED}">`
    + `<path d="M0 0L-14 -8.5V8.5Z"/><path d="M0 0L14 -8.5V8.5Z"/><circle r="4"/></g>`,
  glasses:
    `<g fill="rgba(255,255,255,0.3)" stroke="${LINE}" stroke-width="2.6">`
    + `<circle cx="43" cy="69" r="11.5"/><circle cx="77" cy="69" r="11.5"/>`
    + `<path fill="none" stroke-linecap="round" d="M54.5 67.5Q60 64 65.5 67.5M31.5 67L21 63M88.5 67L99 63"/></g>`,
  pencil:
    `<g transform="rotate(30 97 34)" stroke="${LINE}" stroke-width="2" stroke-linejoin="round">`
    + `<rect x="93" y="12" width="8" height="6" fill="#f7a3b0"/><rect x="93" y="18" width="8" height="26" fill="${YELLOW}"/>`
    + `<path fill="#f6e0b5" d="M93 44H101L97 54Z"/><path fill="${LINE}" stroke="none" d="M95.4 50H98.6L97 54Z"/></g>`,
  hat:
    `<g stroke="${LINE}" stroke-width="2.5" stroke-linejoin="round">`
    + `<ellipse cx="60" cy="31" rx="43" ry="7.5" fill="#f0d27a"/>`
    + `<path fill="#f5dc8e" d="M37 30C37 6 83 6 83 30Q60 36 37 30Z"/>`
    + `<path fill="${RED}" d="M37.2 24Q60 19 82.8 24L83 30Q60 36 37 30Z"/></g>`,
  scarf:
    `<g fill="${RED}" stroke="${LINE}" stroke-width="2.5" stroke-linejoin="round">`
    + `<path d="M73 110L79 129L90 125L85 107Z"/><path d="M25 99Q60 115 95 99L97 108Q60 126 23 108Z"/></g>`
    + `<path fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.8" d="M38 108Q60 116 82 108"/>`,
  flower:
    `<g transform="translate(89 32)" stroke="${LINE}" stroke-width="1.6">`
    + [0, 72, 144, 216, 288].map(a => `<circle r="5.4" cx="0" cy="-6.6" fill="#ff9fb5" transform="rotate(${a})"/>`).join('')
    + `<circle r="4" fill="${YELLOW}"/></g>`,
  book:
    `<g stroke="${LINE}" stroke-width="2.2" stroke-linejoin="round">`
    + `<path fill="#fff" d="M32 102Q46 95 60 102Q74 95 88 102V122Q74 115 60 122Q46 115 32 122Z"/>`
    + `<path fill="none" d="M60 102V122"/></g>`
    + `<path fill="none" stroke="#9aa6b8" stroke-width="1.4" stroke-linecap="round" d="M38 106Q46 103 54 106M38 111Q46 108 54 111M66 106Q74 103 82 106M66 111Q74 108 82 111"/>`,
  headband:
    `<g stroke="${LINE}" stroke-width="2.2" stroke-linejoin="round" fill="#fff">`
    + `<path d="M97 52L112 44L110 53L114 60L98 58Z"/><path d="M21 50Q60 33 99 50L99.5 59Q60 42 20.5 59Z"/></g>`
    + `<circle cx="60" cy="44.5" r="4.4" fill="#d63c2c"/>`,
  banana:
    `<g transform="translate(93 104) rotate(-24)" stroke="${LINE}" stroke-width="2.2" stroke-linejoin="round">`
    + `<path fill="${YELLOW}" d="M-17 -6Q-2 8 17 -9Q19 -5 16 0Q0 20 -18 1Q-19 -3 -17 -6Z"/>`
    + `<path fill="#8a6a2c" d="M15.5 -10.5L19.5 -8.5L17.5 -4.5L14.5 -7Z"/></g>`,
  cap:
    `<g stroke="${LINE}" stroke-width="2.5" stroke-linejoin="round">`
    + `<path fill="#2f55a8" d="M38 33C24 33 11 37 6 44C24 45 46 41 62 35Z"/>`
    + `<path fill="#3f6fd1" d="M35 34C35 8 85 8 85 34Q60 28 35 34Z"/></g>`
    + `<circle cx="60" cy="13.5" r="2.6" fill="#fff" stroke="${LINE}" stroke-width="1.5"/>`
    + `<path fill="none" stroke="#fff" stroke-width="1.6" opacity="0.7" d="M60 16V30"/>`,
  wizard:
    `<g stroke="${LINE}" stroke-width="2.5" stroke-linejoin="round">`
    + `<path fill="#5b3fa8" d="M34 33Q50 10 70 -12Q72 12 86 33Q60 39 34 33Z"/>`
    + `<ellipse cx="60" cy="33" rx="37" ry="6.5" fill="#4a3290"/></g>`
    + sparkle(57, 20, 5) + sparkle(69, 8, 3.2) + sparkle(72, 25, 2.6),
  crown:
    `<path fill="${YELLOW}" stroke="${LINE}" stroke-width="2.5" stroke-linejoin="round" d="M38 32L35 8L49 20L60 2L71 20L85 8L82 32Q60 26 38 32Z"/>`
    + `<circle cx="60" cy="21" r="3.6" fill="#d63c2c" stroke="${LINE}" stroke-width="1.4"/>`
    + `<circle cx="45.5" cy="24" r="2.6" fill="#4a90e2" stroke="${LINE}" stroke-width="1.2"/>`
    + `<circle cx="74.5" cy="24" r="2.6" fill="#3fb37f" stroke="${LINE}" stroke-width="1.2"/>`,
};

// Accessories the monkey can wear, in the order they are given as rewards (see src/utils/rewards.js).
// Only one item per place, so the drawings never overlap.
export const ITEMS = [
  { id: 'ribbon', place: 'head' },
  { id: 'flower', place: 'head' },
  { id: 'glasses', place: 'face' },
  { id: 'pencil', place: 'head' },
  { id: 'scarf', place: 'neck' },
  { id: 'book', place: 'hand' },
  { id: 'hat', place: 'head' },
  { id: 'headband', place: 'head' },
  { id: 'banana', place: 'hand' },
  { id: 'cap', place: 'head' },
  { id: 'wizard', place: 'head' },
  { id: 'crown', place: 'head' }
];
const ITEM = new Map(ITEMS.map(item => [item.id, item]));

/** Keeps known items only, at most one per place (the later one wins) */
export function normalizeOutfit(outfit) {
  const byPlace = new Map();
  (Array.isArray(outfit) ? outfit : []).forEach(id => {
    if (ITEM.has(id)) byPlace.set(ITEM.get(id).place, id);
  });
  return [...byPlace.values()];
}

/** Puts an item on, taking off whatever was worn in the same place */
export function wear(outfit, id) {
  return normalizeOutfit([...normalizeOutfit(outfit), id]);
}

/** The monkey's face (drawn inside a 120 wide × 110 high box) */
export function monkeyFace(look = {}) {
  const c = { ...DEFAULT_LOOK, ...look };
  return (
    // Ears
    `<g stroke="${LINE}" stroke-width="2.5">`
    + `<circle cx="16" cy="61" r="13.5" fill="${c.light}"/><circle cx="104" cy="61" r="13.5" fill="${c.light}"/></g>`
    + `<circle cx="17.5" cy="62" r="6.5" fill="${c.pink}"/><circle cx="102.5" cy="62" r="6.5" fill="${c.pink}"/>`
    // Head
    + `<path fill="${c.fur}" stroke="${LINE}" stroke-width="2.5" stroke-linejoin="round" d="M60 26C35 26 20 44 20 66C20 90 38 106 60 106C82 106 100 90 100 66C100 44 85 26 60 26Z"/>`
    // Dark cap of fur, dipping towards the point between the eyes
    + `<path fill="${c.cap}" d="M22.6 53C25 37 40 27.4 60 27.4C80 27.4 95 37 97.4 53C90 44 80 42 72 46C67 48.5 63 53 60 59C57 53 53 48.5 48 46C40 42 30 44 22.6 53Z"/>`
    // White face
    + `<path fill="${c.light}" d="M60 58C54 48 40 46 31.5 54C24.5 61 24.5 76 31.5 84C38 91 50 92 60 87C70 92 82 91 88.5 84C95.5 76 95.5 61 88.5 54C80 46 66 48 60 58Z"/>`
    + `<ellipse cx="33.5" cy="81" rx="5.5" ry="3.4" fill="${c.pink}" opacity="0.7"/>`
    + `<ellipse cx="86.5" cy="81" rx="5.5" ry="3.4" fill="${c.pink}" opacity="0.7"/>`
    // Dark muzzle
    + `<ellipse cx="60" cy="90.5" rx="14" ry="10.5" fill="${MUZZLE}" stroke="${LINE}" stroke-width="2"/>`
    + eyes(look)
    + mouth(look)
    + normalizeOutfit(look.items).map(id => DRAWINGS[id]).join('')
  );
}

/**
 * The mascot as an <svg>. look changes the expression (e.g. eyes: 'happy') and look.items the accessories
 * worn; label is the accessible description. With accessories the view box grows to leave room for the
 * tall hats above the head and the scarf below the chin.
 */
export function monkeySvg(label, look = {}) {
  const viewBox = normalizeOutfit(look.items).length > 0 ? '-4 -16 128 150' : '0 0 120 110';
  return `<svg viewBox="${viewBox}" role="img" aria-label="${label}">${monkeyFace(look)}</svg>`;
}
