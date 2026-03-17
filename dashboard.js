// ── GoCodeIt Dashboard ────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  if (!GCI.requireAuth()) return;

  const user = GCI.getCurrentUser();

  // ── Greeting ──────────────────────────────────────────────────
  const greetEl = document.getElementById('dash-name');
  if (greetEl) greetEl.textContent = user.firstName;

  // ── Setup Items Config ────────────────────────────────────────
  const setupItems = [
    {
      key: 'phone',
      emoji: '📱',
      title: 'Add your phone number',
      placeholder: '+1 (555) 000-0000',
      type: 'tel'
    },
    {
      key: 'github',
      emoji: '🐙',
      title: 'Connect your GitHub username',
      placeholder: 'your-github-username',
      type: 'text'
    },
    {
      key: 'projectType',
      emoji: '🎮',
      title: 'What kind of projects do you make?',
      placeholder: null,
      type: 'select',
      options: ['Games', 'Web Apps', 'Mobile Apps', 'Tools / Scripts', 'Websites', 'Other']
    },
    {
      key: 'location',
      emoji: '🌍',
      title: 'Where are you from?',
      placeholder: 'City, Country',
      type: 'text'
    },
    {
      key: 'avatar',
      emoji: '🖼️',
      title: 'Set a profile picture URL',
      placeholder: 'https://...',
      type: 'url'
    }
  ];

  // ── Render Setup Items ─────────────────────────────────────────
  const setupList = document.getElementById('setup-items');
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');

  function updateProgress() {
    const u = GCI.getCurrentUser();
    const pct = GCI.setupProgress(u);
    progressFill.style.width = pct + '%';
    progressText.textContent = pct + '% complete';
  }

  function renderSetup() {
    const u = GCI.getCurrentUser();
    setupList.innerHTML = '';

    setupItems.forEach(item => {
      const isComplete = u[item.key] && u[item.key].toString().trim() !== '';
      const div = document.createElement('div');
      div.className = 'setup-item' + (isComplete ? ' completed' : '');
      div.dataset.key = item.key;

      // Build input/select
      let inputHtml = '';
      if (item.type === 'select') {
        const opts = item.options.map(o =>
          `<option value="${o}" ${u[item.key] === o ? 'selected' : ''}>${o}</option>`
        ).join('');
        inputHtml = `<select id="setup-input-${item.key}"><option value="">Select...</option>${opts}</select>`;
      } else {
        inputHtml = `<input id="setup-input-${item.key}" type="${item.type}" placeholder="${item.placeholder}" value="${u[item.key] || ''}">`;
      }

      div.innerHTML = `
        <div class="setup-item-header" onclick="toggleSetup('${item.key}')">
          <div class="setup-check">${isComplete ? '✓' : ''}</div>
          <span class="setup-item-emoji">${item.emoji}</span>
          <span class="setup-item-title">${item.title}</span>
          <span style="color:var(--muted); font-size:0.75rem; font-family:'Share Tech Mono',monospace">
            ${isComplete ? u[item.key] : 'click to add →'}
          </span>
        </div>
        <div class="setup-expand" id="expand-${item.key}">
          ${inputHtml}
          <button class="btn btn-primary" style="padding:0.5rem 1rem; font-size:0.8rem;"
            onclick="saveSetup('${item.key}')">Save</button>
        </div>
      `;
      setupList.appendChild(div);
    });

    updateProgress();
  }

  // ── Toggle expand ──────────────────────────────────────────────
  window.toggleSetup = function(key) {
    const expand = document.getElementById('expand-' + key);
    expand.classList.toggle('open');
  };

  // ── Save setup field ───────────────────────────────────────────
  window.saveSetup = function(key) {
    const input = document.getElementById('setup-input-' + key);
    const val = input.value.trim();
    if (!val) return;
    const u = GCI.getCurrentUser();
    GCI.updateUser(u.email, { [key]: val });
    renderSetup();
  };

  // ── Init ───────────────────────────────────────────────────────
  if (setupList) renderSetup();

  // ── Nav sign out ───────────────────────────────────────────────
  const signOutBtn = document.getElementById('signout-btn');
  if (signOutBtn) signOutBtn.addEventListener('click', () => GCI.signOut());

});
