// ── GoCodeIt Auth ──────────────────────────────────────────────
// Manages sign up, sign in, session, and user data via localStorage

const GCI = {

  // ── Storage Keys ──────────────────────────────────────────────
  USERS_KEY: 'gci_users',
  SESSION_KEY: 'gci_session',

  // ── Helpers ───────────────────────────────────────────────────
  getUsers() {
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '{}');
  },

  saveUsers(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  },

  getSession() {
    const s = localStorage.getItem(this.SESSION_KEY);
    return s ? JSON.parse(s) : null;
  },

  setSession(email) {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify({ email, ts: Date.now() }));
  },

  clearSession() {
    localStorage.removeItem(this.SESSION_KEY);
  },

  getCurrentUser() {
    const session = this.getSession();
    if (!session) return null;
    const users = this.getUsers();
    return users[session.email] || null;
  },

  updateUser(email, data) {
    const users = this.getUsers();
    if (users[email]) {
      users[email] = { ...users[email], ...data };
      this.saveUsers(users);
    }
  },

  // ── Sign Up ───────────────────────────────────────────────────
  signUp({ firstName, lastName, email, password, age }) {
    const users = this.getUsers();
    if (users[email]) {
      return { ok: false, error: 'An account with that email already exists.' };
    }
    if (password.length < 6) {
      return { ok: false, error: 'Password must be at least 6 characters.' };
    }
    users[email] = {
      firstName,
      lastName,
      email,
      password, // In production: hash this!
      age,
      createdAt: Date.now(),
      // Setup fields (filled on dashboard)
      phone: '',
      github: '',
      avatar: '',
      projectType: '',
      location: '',
    };
    this.saveUsers(users);
    this.setSession(email);
    return { ok: true };
  },

  // ── Sign In ───────────────────────────────────────────────────
  signIn({ email, password }) {
    const users = this.getUsers();
    const user = users[email];
    if (!user) {
      return { ok: false, error: "No account found with that email." };
    }
    if (user.password !== password) {
      return { ok: false, error: "Incorrect password. Try again." };
    }
    this.setSession(email);
    return { ok: true };
  },

  // ── Sign Out ──────────────────────────────────────────────────
  signOut() {
    this.clearSession();
    window.location.href = 'index.html';
  },

  // ── Guard: must be logged in ──────────────────────────────────
  requireAuth() {
    if (!this.getSession()) {
      window.location.href = 'signin.html';
      return false;
    }
    return true;
  },

  // ── Guard: redirect if already logged in ──────────────────────
  redirectIfLoggedIn(dest = 'dashboard.html') {
    if (this.getSession()) {
      window.location.href = dest;
    }
  },

  // ── Setup completion % ────────────────────────────────────────
  setupProgress(user) {
    const fields = ['phone', 'github', 'avatar', 'projectType', 'location'];
    const filled = fields.filter(f => user[f] && user[f].toString().trim() !== '').length;
    return Math.round((filled / fields.length) * 100);
  }

};

// Expose globally
window.GCI = GCI;
