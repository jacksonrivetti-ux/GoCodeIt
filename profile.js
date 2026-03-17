// ── GoCodeIt Profile ──────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  if (!GCI.requireAuth()) return;

  function loadProfile() {
    const user = GCI.getCurrentUser();

    // Avatar initials
    const av = document.getElementById('avatar-initials');
    if (av) av.textContent = (user.firstName[0] + user.lastName[0]).toUpperCase();

    // Name & email in sidebar
    const pName = document.getElementById('profile-name');
    const pEmail = document.getElementById('profile-email');
    if (pName) pName.textContent = user.firstName + ' ' + user.lastName;
    if (pEmail) pEmail.textContent = user.email;

    // Info rows
    const fields = [
      { id: 'info-firstname', key: 'firstName' },
      { id: 'info-lastname', key: 'lastName' },
      { id: 'info-email', key: 'email' },
      { id: 'info-age', key: 'age' },
      { id: 'info-phone', key: 'phone' },
      { id: 'info-github', key: 'github' },
      { id: 'info-location', key: 'location' },
      { id: 'info-projecttype', key: 'projectType' },
    ];

    fields.forEach(({ id, key }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const val = user[key];
      el.textContent = val && val.toString().trim() ? val : '—';
      el.className = 'info-value' + ((!val || val.toString().trim() === '') ? ' empty' : '');
    });
  }

  // ── Inline edit ────────────────────────────────────────────────
  window.startEdit = function(field) {
    const user = GCI.getCurrentUser();
    const valEl = document.getElementById('info-' + field);
    const editEl = document.getElementById('edit-' + field);
    const inputEl = document.getElementById('editinput-' + field);

    if (!editEl || !inputEl) return;

    // Toggle: if already open, close
    if (editEl.classList.contains('open')) {
      editEl.classList.remove('open');
      valEl.style.display = '';
      return;
    }

    inputEl.value = user[field] || '';
    editEl.classList.add('open');
    valEl.style.display = 'none';
    inputEl.focus();
  };

  window.saveEdit = function(field) {
    const inputEl = document.getElementById('editinput-' + field);
    const editEl = document.getElementById('edit-' + field);
    const valEl = document.getElementById('info-' + field);

    const val = inputEl.value.trim();
    const user = GCI.getCurrentUser();
    GCI.updateUser(user.email, { [field]: val });

    editEl.classList.remove('open');
    valEl.style.display = '';
    loadProfile();
  };

  // ── Sign out ───────────────────────────────────────────────────
  const signOutBtn = document.getElementById('signout-btn');
  if (signOutBtn) signOutBtn.addEventListener('click', () => GCI.signOut());

  // ── Init ───────────────────────────────────────────────────────
  loadProfile();

});
