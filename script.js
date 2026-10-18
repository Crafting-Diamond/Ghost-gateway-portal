function launchGame(gameURL) {
    var newTab = window.open('about:blank', '_blank');

    if (!newTab) {
        alert('Please allow pop-ups for this site to launch the program!');
        return;
    }

    var codeToInject = `
      <!DOCTYPE html>
      <html style="margin:0;padding:0;overflow:hidden;height:100%;">
      <head>
          <title>Application Workspace</title>
      </head>
      <body style="margin:0;padding:0;overflow:hidden;height:100%;background:#000;">
        <iframe src="${gameURL}" style="border:none;width:100vw;height:100vh;margin:0;padding:0;display:block;" allow="pointer-lock; fullscreen;"></iframe>
      </body>
      </html>
    `;

    newTab.document.write(codeToInject);
    newTab.document.close();
}

function applyTheme(theme) {
    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');

    root.classList.toggle('theme-light', theme === 'light');
    localStorage.setItem('theme', theme);

    if (!toggle) return;

    const icon = toggle.querySelector('.toggle-icon');
    const label = toggle.querySelector('.toggle-label');

    if (theme === 'light') {
        icon.textContent = '☀️';
        label.textContent = 'Day';
        toggle.setAttribute('aria-label', 'Switch to night mode');
    } else {
        icon.textContent = '🌙';
        label.textContent = 'Night';
        toggle.setAttribute('aria-label', 'Switch to day mode');
    }
}

function toggleTheme() {
    const saved = localStorage.getItem('theme');
    const nextTheme = saved === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
}

function initTheme() {
    const saved = localStorage.getItem('theme');
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const theme = saved || (prefersLight ? 'light' : 'dark');
    applyTheme(theme);
}

window.addEventListener('DOMContentLoaded', initTheme);
