document.addEventListener('DOMContentLoaded', () => {
  if (!GCI.requireAuth()) return;

  function load() {
    const u = GCI.getCurrentUser();

    // Avatar
    const av = document.getElementById('avatar-initials');
    if (av) av.textContent = (u.firstName[0] + u.lastName[0]).toUpperCase();

    // Sidebar
    const pn = document.getElementById('p-name');
    const pe = document.getElementById('p-email');
    if (pn) pn.textContent = u.firstName + ' ' + u.lastName;
    if (pe) pe.textContent = u.email;

    // Rows
    [
      ['firstName','firstName'],['lastName','lastName'],['email','email'],
      ['age','age'],['phone','phone'],['github','github'],
      ['location','location'],['projectType','projectType'],
    ].forEach(([id, key]) => {
      const el = document.getElementById('info-' + id);
      if (!el) return;
      const v = u[key];
      const has = v && v.toString().trim() !== '';
      el.textContent = has ? v : '—';
      el.className   = 'info-val' + (has ? '' : ' empty');
    });
  }

  window.startEdit = field => {
    const u    = GCI.getCurrentUser();
    const valEl  = document.getElementById('info-' + field);
    const editEl = document.getElementById('edit-' + field);
    const inp    = document.getElementById('editinput-' + field);
    if (!editEl || !inp) return;
    if (editEl.classList.contains('open')) {
      editEl.classList.remove('open');
      if (valEl) valEl.style.display = '';
      return;
    }
    inp.value = u[field] || '';
    editEl.classList.add('open');
    if (valEl) valEl.style.display = 'none';
    inp.focus();
  };

  window.saveEdit = field => {
    const inp    = document.getElementById('editinput-' + field);
    const editEl = document.getElementById('edit-' + field);
    const valEl  = document.getElementById('info-' + field);
    const val    = inp?.value.trim();
    GCI.updateUser(GCI.getCurrentUser().email, { [field]: val });
    editEl?.classList.remove('open');
    if (valEl) valEl.style.display = '';
    load();
  };

  load();
});
