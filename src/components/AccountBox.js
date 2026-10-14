import { account, signIn, signOut } from '../cloud/store.js';
import { sounds } from '../utils/SoundManager.js';
import { t } from '../utils/i18n.js';

const STATUS_KEYS = {
  syncing: 'statusSyncing',
  synced: 'statusSynced',
  offline: 'statusOffline'
};

/**
 * AccountBox
 * Account section on the level select screen. Signing in with Google saves progress to Firestore,
 * so the same progress is available on other browsers and devices.
 * Not rendered at all in builds without a Firebase config.
 */
export class AccountBox {
  constructor() {
    this.container = null;
    this.busy = false;
    this.error = '';
  }

  // Called again with a fresh container every time the parent view re-renders
  mount(containerEl) {
    this.container = containerEl;
    this.render();
  }

  render() {
    if (!this.container || !account.available) return;

    let body = '';
    if (account.status === 'loading') {
      // Still loading the Firebase code or checking whether the user is signed in
      body = `<p class="account-status">${t('accountChecking')}</p>`;
    } else if (!account.signedIn) {
      body = `
        <p class="account-note">${t('accountNote')}</p>
        <button id="sign-in-button" type="button" class="btn btn-primary" ${this.busy ? 'disabled' : ''}>${t('btnSignIn')}</button>
        ${this.error ? `<p class="account-error" role="alert">${this.error}</p>` : ''}
      `;
    } else {
      body = `
        <p class="account-state">
          <b>${t('accountSignedIn')}</b>
          <span class="account-status is-${account.status}" role="status">${STATUS_KEYS[account.status] ? t(STATUS_KEYS[account.status]) : ''}</span>
        </p>
        <button id="sign-out-button" type="button" class="btn" ${this.busy ? 'disabled' : ''}>${t('btnSignOut')}</button>
      `;
    }

    this.container.innerHTML = `
      <section class="account" aria-labelledby="account-title">
        <h2 id="account-title">${t('accountTitle')}</h2>
        ${body}
      </section>
    `;

    const signInBtn = this.container.querySelector('#sign-in-button');
    if (signInBtn) signInBtn.addEventListener('click', () => this.handleSignIn());

    const signOutBtn = this.container.querySelector('#sign-out-button');
    if (signOutBtn) signOutBtn.addEventListener('click', () => this.handleSignOut());
  }

  async handleSignIn() {
    sounds.playClick();
    this.busy = true;
    this.error = '';
    this.render();
    try {
      await signIn();
    } catch (err) {
      // Stay quiet when the user closed the sign-in popup themselves.
      // The Firebase error code is appended to help diagnose setup problems (see README).
      const code = (err && err.code) || '';
      if (!/popup-closed-by-user|cancelled-popup-request/.test(code)) {
        this.error = t('signInFailed') + (code ? ` (${code})` : '');
      }
    } finally {
      this.busy = false;
      this.render();
    }
  }

  async handleSignOut() {
    sounds.playClick();
    this.busy = true;
    this.render();
    try {
      if ((await signOut()) === 'unsynced' && window.confirm(t('confirmSignOutUnsynced'))) {
        await signOut(true);
      }
    } finally {
      this.busy = false;
      this.render();
    }
  }
}
