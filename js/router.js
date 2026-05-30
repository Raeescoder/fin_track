/* ============================================
   router.js — Page Navigation / SPA Router
   FinTrack AI Finance Suite
   ============================================ */

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

/**
 * Navigate to a page
 * @param {string} page  — page id
 * @param {Element|null} el — clicked nav item (for active state)
 */
function go(page, el) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(function (p) {
    p.classList.remove('active');
  });
  // Remove active from all nav items
  document.querySelectorAll('.nav-item').forEach(function (n) {
    n.classList.remove('active');
  });

  // Show target page
  var target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  // Set nav active
  if (el) el.classList.add('active');

  // Update state + title
  AppState.currentPage = page;
  document.getElementById('page-title').textContent = PAGE_TITLES[page] || page;

  // Call the page's render function
  var renderFns = {
    dashboard:    renderDashboard,
    transactions: renderTransactionsPage,
    budgets:      renderBudgetsPage,
    accounts:     renderAccountsPage,
    ai:           renderAIPage,
    balancesheet: renderBalanceSheetPage,
    reports:      renderReportsPage,
    admin:        renderAdminPage,
  };
  if (renderFns[page]) renderFns[page]();
}
