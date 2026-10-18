// script.js — inline embed (Option B) implementation

function launchGame(gameURL, gameName) {
  const container = document.getElementById('game-frame-container');
  const iframe = document.getElementById('game-frame');
  const titleEl = document.getElementById('game-title');

  if (!container || !iframe) {
    // fallback to navigation
    window.location.href = gameURL;
    return;
  }

  // set title and src
  titleEl.textContent = gameName || 'Game';
  iframe.src = gameURL;

  // show container
  container.setAttribute('aria-hidden', 'false');

  // detect whether embed is blocked — use load event + timeout
  let loaded = false;
  const onLoad = () => {
    loaded = true;
    iframe.removeEventListener('load', onLoad);
    clearTimeout(fallbackTimer);
  };
  iframe.addEventListener('load', onLoad);

  const fallbackTimer = setTimeout(() => {
    iframe.removeEventListener('load', onLoad);
    if (!loaded) {
      // embedding likely blocked; close container and navigate
      container.setAttribute('aria-hidden', 'true');
      iframe.src = '';
      window.location.href = gameURL;
    }
  }, 1800);

  // store timer on container so back button can clear it if user navigates back quickly
  container._embedFallbackTimer = fallbackTimer;
}

// Back button logic
function closeEmbeddedGame() {
  const container = document.getElementById('game-frame-container');
  const iframe = document.getElementById('game-frame');
  if (!container || !iframe) return;

  // clear any fallback timer
  if (container._embedFallbackTimer) {
    clearTimeout(container._embedFallbackTimer);
    container._embedFallbackTimer = null;
  }

  // unload iframe
  iframe.src = '';
  container.setAttribute('aria-hidden', 'true');
}

// Attach listeners once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const back = document.getElementById('game-back');
  const container = document.getElementById('game-frame-container');
  const iframe = document.getElementById('game-frame');

  if (back && container && iframe) {
    back.addEventListener('click', (e) => {
      e.preventDefault();
      closeEmbeddedGame();
    });
  }

  // Attach listeners to play buttons (data-url + data-name)
  document.querySelectorAll('.play-btn').forEach(btn => {
    const url = btn.getAttribute('data-url');
    const name = btn.getAttribute('data-name') || btn.textContent.trim();
    if (!url) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      launchGame(url, name);
    });

    // keyboard support
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        launchGame(url, name);
      }
    });

    // make sure button is focusable
    if (!btn.hasAttribute('tabindex')) btn.setAttribute('tabindex', '0');
  });
});
