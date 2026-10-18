// theme-toggle.js
(function () {
  const TOGGLE_ID = 'theme-toggle';
  const THEME_KEY = 'theme';
  const TRANSITION_CLASS = 'theme-transition';

  function setAria(toggleEl, theme) {
    if (!toggleEl) return;
    toggleEl.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    const icon = toggleEl.querySelector('.toggle-icon');
    const label = toggleEl.querySelector('.toggle-label');
    if (icon) icon.textContent = theme === 'light' ? '☀️' : '🌙';
    if (label) label.textContent = theme === 'light' ? 'Day' : 'Night';
    toggleEl.setAttribute('aria-label', theme === 'light' ? 'Switch to night mode' : 'Switch to day mode');
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    const toggle = document.getElementById(TOGGLE_ID);

    // small helper class to let CSS animate transitions; removed shortly after
    root.classList.add(TRANSITION_CLASS);
    window.setTimeout(() => root.classList.remove(TRANSITION_CLASS), 380);

    root.classList.toggle('theme-light', theme === 'light');
    localStorage.setItem(THEME_KEY, theme);
    setAria(toggle, theme);
  }

  function toggleTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const next = saved === 'light' ? 'dark' : 'light';
    applyTheme(next);
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const theme = saved || (prefersLight ? 'light' : 'dark');
    applyTheme(theme);
  }

  function attachListeners() {
    const toggle = document.getElementById(TOGGLE_ID);
    if (!toggle) return;

    // click and keyboard support
    toggle.addEventListener('click', (e) => { e.preventDefault(); toggleTheme(); });
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTheme(); }
    });

    // expose a global fallback (safe) so inline onclick still works if present
    window.toggleTheme = toggleTheme;
  }

  // react to system preference only if the user hasn't chosen
  function watchSystem() {
    if (!window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    mq.addEventListener && mq.addEventListener('change', (e) => {
      if (localStorage.getItem(THEME_KEY)) return; // user's choice overrides
      applyTheme(e.matches ? 'light' : 'dark');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    attachListeners();
    watchSystem();
  });

})();
