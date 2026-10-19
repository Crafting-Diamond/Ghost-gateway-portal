// script.js — open games in a new tab (reliable fallback for sites that block embedding)

function openGameInNewTab(gameURL, gameName) {
  if (!gameURL) return;

  // Open in a new tab/window. Use noopener to avoid giving the opened page access to our window.
  const newWin = window.open(gameURL, '_blank', 'noopener');

  // If the browser blocked the popup, fall back to navigation so the click still works.
  if (!newWin) {
    // This will replace the current page (safer fallback) — usually allowed because the click started the flow.
    window.location.href = gameURL;
  }
}

// Attach listeners once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Attach listeners to play buttons (data-url + data-name)
  document.querySelectorAll('.play-btn').forEach(btn => {
    const url = btn.getAttribute('data-url');
    const name = btn.getAttribute('data-name') || btn.textContent.trim();
    if (!url) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openGameInNewTab(url, name);
    });

    // keyboard support
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openGameInNewTab(url, name);
      }
    });

    // make sure button is focusable
    if (!btn.hasAttribute('tabindex')) btn.setAttribute('tabindex', '0');
  });
});
