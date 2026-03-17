document.addEventListener('DOMContentLoaded', () => {
  if (!GCI.requireAuth()) return;
  const user = GCI.getCurrentUser();

  const nameEl = document.getElementById('dash-name');
  if (nameEl) nameEl.textContent = user.firstName;

  const setupItems = [
    { key:'phone',       emoji:'📱', title:'Add your phone number',             placeholder:'+1 (555) 000-0000', type:'tel' },
    { key:'github',      emoji:'🐙', title:'Connect your GitHub username',      placeholder:'your-username',      type:'text' },
    { key:'projectType', emoji:'🎮', title:'What kind of projects do you make?',placeholder:null,                 type:'select',
      options:['Games','Web Apps','Mobile Apps','Tools / Scripts','Websites','Other'] },
    { key:'location',    emoji:'🌍', title:'Where are you from?',               placeholder:'City, Country',      type:'text' },
    { key:'avatar',      emoji:'🖼️', title:'Set a profile picture URL',         placeholder:'https://...',        type:'url' },
  ];

  const list  = document.getElementById('setup-items');
  const bar   = document.getElementById('progress-bar');
  const pct   = document.getElementById('setup-pct');

  function updateProgress() {
    const u = GCI.getCurrentUser();
    const p = GCI.setupProgress(u);
    if (bar) bar.style.width = p + '%';
    if (pct) pct.textContent = p + '% complete';
  }

  function render() {
    const u = GCI.getCurrentUser();
    if (!list) return;
    list.innerHTML = '';
    setupItems.forEach(item => {
      const done = u[item.key] && u[item.key].toString().trim() !== '';
      const div  = document.createElement('div');
      div.className = 'setup-item' + (done ? ' done' : '');

      let inputHtml = '';
      if (item.type === 'select') {
        const opts = item.options.map(o => `<option value="${o}" ${u[item.key]===o?'selected':''}>${o}</option>`).join('');
        inputHtml = `<select id="si-${item.key}"><option value="">Select…</option>${opts}</select>`;
      } else {
        inputHtml = `<input id="si-${item.key}" type="${item.type}" placeholder="${item.placeholder}" value="${u[item.key]||''}">`;
      }

      div.innerHTML = `
        <div class="setup-hd" onclick="toggleSetup('${item.key}')">
          <div class="check-ring">${done?'✓':''}</div>
          <span class="setup-em">${item.emoji}</span>
          <span class="setup-txt">${item.title}</span>
          <span class="setup-hint">${done ? u[item.key] : 'click to add →'}</span>
        </div>
        <div class="setup-expand" id="se-${item.key}">
          ${inputHtml}
          <button class="btn btn-primary" style="padding:0.5rem 1rem;font-size:0.8rem;border-radius:8px" onclick="saveSetup('${item.key}')">Save</button>
        </div>`;
      list.appendChild(div);
    });
    updateProgress();
  }

  window.toggleSetup = key => {
    document.getElementById('se-' + key)?.classList.toggle('open');
  };
  window.saveSetup = key => {
    const el  = document.getElementById('si-' + key);
    const val = el?.value.trim();
    if (!val) return;
    GCI.updateUser(GCI.getCurrentUser().email, { [key]: val });
    render();
  };

  render();
});
