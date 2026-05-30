/* ================================================================
   pages/budgets.js — Budgets Page
   FinTrack AI Finance Suite
   ================================================================
   Renders budget cards in a 3-column grid.
   Each card shows:
   - Category emoji + name
   - Spent vs limit (dollar amounts)
   - Color-coded progress bar (green/amber/red)
   - Remaining amount
   - Percentage badge

   Exported functions:
   - renderBudgetsPage() — builds full page HTML + budget cards
   ================================================================ */


/* ── renderBudgetsPage() ─────────────────────────────────────────
   Builds the budgets page including the "New Budget" button
   and a 3-column grid of budget cards.
   Called by router.js when navigating to the budgets page.
   ──────────────────────────────────────────────────────────────── */
function renderBudgetsPage() {
  var el = document.getElementById('page-budgets');

  /* Page shell: action button + card grid container */
  el.innerHTML =
    '<div class="flex ic gap2 mb14">' +
      /* Opens addBudget modal defined in modals.js */
      '<button class="btn btn-primary" onclick="openM(\'addBudget\')">+ New Budget</button>' +
    '</div>' +
    /* Grid container — budget cards injected below */
    '<div class="grid-3" id="bud-cards"></div>';

  /* Build and inject budget cards */
  document.getElementById('bud-cards').innerHTML = AppState.budgets.map(function (b) {

    /* Calculate percentage of budget used */
    var pct  = Math.round(b.spent / b.limit * 100);

    /* Color and badge class based on usage level (from utils.js) */
    var c    = pctColor(pct);   /* CSS color for progress bar */
    var bc   = pctBadge(pct);   /* Badge CSS class */

    /* Get category emoji icon (fallback to box emoji) */
    var icon = CAT_ICONS[b.cat] || '📦';

    return '<div class="card">' +
      /* Header: emoji icon on left, percentage badge on right */
      '<div class="ch">' +
        '<span style="font-size:22px">' + icon + '</span>' +
        '<span class="badge ' + bc + '">' + pct + '%</span>' +
      '</div>' +
      /* Category name */
      '<div style="font-size:14px;font-weight:600;margin-bottom:3px">' + b.cat + '</div>' +
      /* Spent vs limit */
      '<div style="font-size:11px;color:var(--text3);margin-bottom:11px">$' + b.spent + ' of $' + b.limit + ' spent</div>' +
      /* Progress bar — width clamped to 100% even if over budget */
      '<div class="pr-track">' +
        '<div class="pr-fill" style="width:' + clamp(pct, 0, 100) + '%;background:' + c + '"></div>' +
      '</div>' +
      /* Remaining amount (can be negative if over budget) */
      '<div style="font-size:11px;color:var(--text3);margin-top:7px">$' + (b.limit - b.spent) + ' remaining</div>' +
    '</div>';
  }).join('');
}
