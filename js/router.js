/* ================================================================
   router.js — SPA Page Navigation
   FinTrack AI Finance Suite
   ================================================================
   Implements a simple Single-Page Application router.
   No URL changes or browser history — purely DOM-based.

   How it works:
   1. All .page divs are hidden (display:none) by default
   2. go(page) removes "active" from all pages and nav items
   3. Adds "active" to the target page and clicked nav item
   4. Calls the page's render function to build its HTML
   5. Updates the topbar title

   Pages are rendered LAZILY — only when navigated to.
   This keeps initial load fast.
   ================================================================ */


/* ── Page Title Map ──────────────────────────────────────────────
   Maps page IDs to human-readable titles shown in the topbar.
   Update here if you rename a page.
   ──────────────────────────────────────────────────────────────── */
var PAGE_TITLES = {
  dashboard:    'Dashboard',
  transactions: 'Transactions',
  budgets:      'Budgets',
  accounts:     'Accounts',
  ai:           'AI Financial Advisor',
  balancesheet: 'Balance Sheet',
  reports:      'Reports',
  admin:        'Admin Panel',
};


/* ── go() — Main Navigation Function ────────────────────────────
   Called by every nav item's onclick and by in-page links.

   @param {string}       page  — page ID (must match #page-{id} div)
   @param {Element|null} el    — the clicked nav item element
                                 (null when called programmatically)

   Usage:
     // From HTML: onclick="go('transactions', this)"
     // From JS:   go('budgets', null)
   ──────────────────────────────────────────────────────────────── */
function go(page, el) {

  /* Step 1: Hide ALL pages by removing "active" class */
  document.querySelectorAll('.page').forEach(function (p) {
    p.classList.remove('active');
  });

  /* Step 2: Remove "active" highlight from ALL nav items */
  document.querySelectorAll('.nav-item').forEach(function (n) {
    n.classList.remove('active');
  });

  /* Step 3: Show the target page */
  var target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  /* Step 4: Highlight the clicked nav item (if provided) */
  if (el) el.classList.add('active');

  /* Step 5: Update global state */
  AppState.currentPage = page;

  /* Step 6: Update topbar title */
  document.getElementById('page-title').textContent = PAGE_TITLES[page] || page;

  /* Step 7: Call the page's render function (lazy rendering)
     Each function is defined in its own pages/*.js file.
     The render function builds the page HTML from AppState data. */
  var renderFns = {
    dashboard:    renderDashboard,        /* pages/dashboard.js    */
    transactions: renderTransactionsPage, /* pages/transactions.js */
    budgets:      renderBudgetsPage,      /* pages/budgets.js      */
    accounts:     renderAccountsPage,     /* pages/accounts.js     */
    ai:           renderAIPage,           /* pages/ai-advisor.js   */
    balancesheet: renderBalanceSheetPage, /* pages/balance-sheet.js*/
    reports:      renderReportsPage,      /* pages/balance-sheet.js*/
    admin:        renderAdminPage,        /* pages/admin.js        */
  };

  if (renderFns[page]) renderFns[page]();
}
