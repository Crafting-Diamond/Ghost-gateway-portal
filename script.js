// script.js — navigation-to-game-page implementation

function openGamePage(gameURL, gameName) {
  // Navigate to the dedicated game page with encoded params
  const params = new URLSearchParams();
  params.set('url', gameURL);
  if (gameName) params.set('name', gameName);
  // Use relative path so it works when deployed
  window.location.href = `game.html?${params.toString()}`;
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
      openGamePage(url, name);
    });

    // keyboard support
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openGamePage(url, name);
      }
    });

    // make sure button is focusable
    if (!btn.hasAttribute('tabindex')) btn.setAttribute('tabindex', '0');
  });
});
