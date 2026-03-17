# GoCodeIt 🚀

> **Build. Ship. Repeat.**

GoCodeIt is a community platform for young developers to compete in hackathons, share game projects, and connect with other coders. Inspired by [Hack Club](https://hackclub.com).

---

## 📁 File Structure

```
gocodeit/
├── index.html          ← Home page (hero, projects, hackathons)
├── signin.html         ← Sign in page
├── join.html           ← Sign up / create account page
├── dashboard.html      ← User dashboard + account setup
├── profile.html        ← User profile & info editor
├── styles/
│   └── main.css        ← All styles (dark theme, neon accents)
├── scripts/
│   ├── auth.js         ← Auth logic (signup, signin, session)
│   ├── dashboard.js    ← Dashboard + setup flow
│   └── profile.js      ← Profile inline editing
└── README.md
```

---

## 🚀 Getting Started

No build tools needed. Just open `index.html` in your browser, or serve locally:

```bash
# Option 1: Python
python -m http.server 3000

# Option 2: Node (npx)
npx serve .

# Option 3: VS Code
# Install the "Live Server" extension and click "Go Live"
```

Then open `http://localhost:3000` in your browser.

---

## ✨ Features

- **Home Page** — Hero section inspired by Hack Club, with featured projects and hackathon listings
- **Sign Up** — Create an account with first name, last name, email, age, and password (no phone # required here)
- **Sign In** — Email + password login, with "Don't have an account? Sign Up Here" link
- **Dashboard** — Personalized greeting, stats, and a step-by-step "Setup Your Account" checklist
  - Click any setup step to expand and fill it in
  - Progress bar tracks completion
  - Setup fields: phone, GitHub, project type, location, avatar
- **Profile Page** — View and edit all your info inline (click Edit next to any field)

---

## 🔐 Auth Notes

User data is stored in `localStorage` — great for development and demos. For production, replace with a real backend (e.g. Supabase, Firebase, or a custom API).

---

## 🎨 Design

- Dark theme (`#080b0f` base)
- Neon green (`#00ff88`) + electric blue (`#00c8ff`) accents
- Fonts: **Bebas Neue** (headings) + **Share Tech Mono** (labels) + **DM Sans** (body)
- CSS grid background for the hacker aesthetic
- Fully responsive

---

## 🛠 Tech Stack

- Plain HTML, CSS, JavaScript — no frameworks
- Google Fonts
- `localStorage` for user data

---

## 📌 Roadmap

- [ ] Projects submission & gallery
- [ ] Hackathon registration system
- [ ] Leaderboard
- [ ] Real backend / database
- [ ] Slack OAuth integration

---

Made with 💚 for coders everywhere.
