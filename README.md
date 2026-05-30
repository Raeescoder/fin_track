# FinTrack — AI Finance Suite

A fully client-side personal finance tracker with AI suggestions, premium balance sheet, and an admin panel. Built with vanilla HTML, CSS, and JavaScript — no frameworks or build tools required.

---

## 📁 Project Structure

```
fintrack/
├── index.html                  ← App entry point
│
├── css/
│   ├── base.css                ← CSS variables, reset, typography, utilities
│   ├── layout.css              ← Sidebar, topbar, main content, page grid
│   ├── components.css          ← Cards, buttons, badges, forms, table, modals, toast
│   └── pages.css               ← Page-specific styles (premium gate, AI advisor, balance sheet, admin)
│
├── js/
│   ├── data.js                 ← Application state, mock data, AI responses
│   ├── utils.js                ← Shared helpers (toast, formatUSD, pctColor, etc.)
│   ├── router.js               ← SPA page navigation
│   ├── modals.js               ← Modal rendering, open/close, form submission handlers
│   └── app.js                  ← Bootstrap — runs on DOMContentLoaded
│
├── pages/
│   ├── dashboard.js            ← Dashboard stats, bar chart, tx preview, budget progress
│   ├── transactions.js         ← Transaction table with search & filters
│   ├── budgets.js              ← Budget cards with progress bars
│   ├── accounts.js             ← Account cards
│   ├── ai-advisor.js           ← AI advisor with 5 tabs + AI chat panel
│   ├── balance-sheet.js        ← Balance sheet (Pro) + reports (Pro) + premiumGate helper
│   ├── reports.js              ← Reports page stub
│   └── admin.js                ← Admin KPIs, user table, payments, settings
│
└── assets/
    └── icons/                  ← Place any custom SVG icons here
```

---

## 🚀 Getting Started

1. **Open locally** — just open `index.html` in any modern browser. No server needed.
2. **Local server (recommended)** — avoids any browser module quirks:
   ```bash
   # Python
   python -m http.server 3000
   # OR Node
   npx serve .
   ```
   Then visit `http://localhost:3000`

---

## ✨ Features

### Free Plan
| Feature | Details |
|---|---|
| Dashboard | Net worth, income, expenses, savings rate, bar chart, budget progress |
| Transactions | Full CRUD with search, category & type filters |
| Budgets | Visual budget cards with color-coded progress |
| Accounts | Checking, savings, credit, investment, loan accounts |
| AI Quick Insights | 4 dashboard alert boxes |

### Pro Plan ($19.99/month)
| Feature | Details |
|---|---|
| Balance Sheet | Double-entry assets/liabilities/net worth |
| Advanced Reports | P&L, category analysis, CSV/PDF export |
| Full AI Advisor | 5 tabs: Alerts, Savings Tips, Goals, Health Score, Predictions |

### Admin Panel
| Feature | Details |
|---|---|
| KPI Cards | Total users, Pro users, MRR, churn rate |
| User Management | Searchable table with plan/status badges |
| Payments Log | Recent payment history |
| System Settings | Pricing, tier limits, maintenance mode |

---

## 🔧 Customization

### Change colors
Edit CSS variables in `css/base.css` under `:root {}`.

### Add a transaction category
1. Add to the `<option>` list in `js/modals.js` (addTx modal).
2. Add an emoji mapping in `js/data.js` → `CAT_ICONS`.

### Add a new page
1. Add a `<div id="page-yourpage" class="page"></div>` in `index.html`.
2. Add a nav item in the sidebar.
3. Add to `PAGE_TITLES` in `js/router.js`.
4. Create `pages/yourpage.js` with a `renderYourpagePage()` function.
5. Add to the `renderFns` map in `js/router.js`.
6. Include the script tag in `index.html`.

### Connect a real backend
Replace the `AppState` object in `js/data.js` with API calls (fetch/axios) to your backend. All render functions read from `AppState`, so swapping the data source requires minimal changes.

---

## 🛠 Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties, grid, flexbox (no framework)
- **Vanilla JS** — no dependencies, no build step
- **Fonts** — Segoe UI / system-ui stack

---

## 📄 License

MIT — free to use and modify.
