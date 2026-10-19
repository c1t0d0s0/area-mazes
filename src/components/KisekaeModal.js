import { setOutfit } from '../cloud/store.js';
import { REWARDS, currentOutfit, earnedNow, itemName, rewardHint } from '../utils/rewards.js';
import { monkeySvg, wear } from '../utils/monkey.js';
import { sounds } from '../utils/SoundManager.js';
import { t } from '../utils/i18n.js';

/**
 * KisekaeModal
 * The monkey's wardrobe: accessories won on the preset levels can be put on and taken off.
 * Locked accessories show "?" and tell how to win them. One dialog is shared by every screen.
 */
let dialog = null;
let onChange = null;

function ensureDialog() {
  if (dialog) return dialog;
  dialog = document.createElement('dialog');
  dialog.className = 'kisekae';
  dialog.setAttribute('aria-labelledby', 'kisekae-title');
  // Clicking the backdrop (outside the content) closes it
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  document.body.appendChild(dialog);
  return dialog;
}

function render(message) {
  const earned = earnedNow();
  const worn = currentOutfit(earned);

  dialog.innerHTML = `
    <div class="kisekae-head">
      <div>
        <h2 id="kisekae-title">${t('kisekaeTitle')}</h2>
        <p class="kisekae-summary">${t('kisekaeSummary', { total: REWARDS.length, earned: earned.size })}</p>
      </div>
      <button type="button" class="btn btn-quiet kisekae-close">${t('btnCloseLabel')}</button>
    </div>
    <div class="kisekae-monkey monkey">${monkeySvg(t('monkeyLabel'), { items: worn })}</div>
    <p class="kisekae-detail" aria-live="polite">${message || (earned.size > 0 ? t('kisekaeHelpEarned') : t('kisekaeHelpNone'))}</p>
    <div class="kisekae-items"></div>
  `;

  dialog.querySelector('.kisekae-close').addEventListener('click', () => {
    sounds.playClick();
    dialog.close();
  });

  dialog.querySelector('.kisekae-items').replaceChildren(...REWARDS.map(reward => {
    const has = earned.has(reward.item);
    const isWorn = worn.includes(reward.item);
    const name = itemName(reward.item);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `kisekae-item${has ? ' is-earned' : ''}${isWorn ? ' is-worn' : ''}`;
    if (has) {
      button.innerHTML = `${monkeySvg(name, { items: [reward.item] })}<span class="kisekae-name">${name}</span>`;
      button.setAttribute('aria-pressed', String(isWorn));
    } else {
      button.innerHTML = `<span class="kisekae-lock" aria-hidden="true">？</span><span class="kisekae-name">${t('kisekaeLocked')}</span>`;
      button.setAttribute('aria-label', t('kisekaeLockedLabel', { hint: rewardHint(reward) }));
    }
    button.addEventListener('click', () => {
      sounds.playClick();
      if (!has) {
        render(t('kisekaeHowTo', { hint: rewardHint(reward) }));
        return;
      }
      setOutfit(isWorn ? worn.filter(id => id !== reward.item) : wear(worn, reward.item));
      render(t(isWorn ? 'kisekaeRemoved' : 'kisekaeWorn', { name }));
      if (onChange) onChange();
    });
    return button;
  }));
}

/** Opens the wardrobe. changed() is called after something is put on or taken off */
export function openKisekae(changed = null) {
  onChange = changed;
  ensureDialog();
  render();
  if (!dialog.open) dialog.showModal();
}
