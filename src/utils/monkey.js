// Draws the squirrel monkey mascot as an SVG string. Same drawing as src/monkey.js in Math Challenge (math-quiz).
// White face, dark muzzle, dark cap of fur and big ears are what make it a squirrel monkey

// Eyes and outlines keep this colour in both light and dark themes
const LINE = '#1c2a4a';
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
  );
}

/** The mascot as an <svg>. look changes the expression (e.g. eyes: 'happy'); label is the accessible description */
export function monkeySvg(label, look = {}) {
  return `<svg viewBox="0 0 120 110" role="img" aria-label="${label}">${monkeyFace(look)}</svg>`;
}
