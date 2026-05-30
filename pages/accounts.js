/* ================================================================
   pages/accounts.js — Accounts Page
   FinTrack AI Finance Suite
   ================================================================
   Renders all financial accounts in a 3-column card grid.
   Each card shows:
   - Account emoji icon
   - Account name
   - Account type badge (color-coded)
   - Current balance (red if negative = debt/liability)

   Exported functions:
   - renderAccountsPage() — builds full page HTML + account cards
   ================================================================ */


/* ── renderAccountsPage() ────────────────────────────────────────
   Builds the accounts page including the "Add Account" button
   and a 3-column grid of account cards.
   Called by router.js when navigating to the accounts page.
   ──────────────────────────────────────────────────────────────── */
function renderAccountsPage() {
  var el = document.getElementById('page-accounts');

  /* Page shell: action button + card grid container */
  el.innerHTML =
    '<div class="flex ic gap2 mb14">' +
      /* Opens addAcc modal defined in modals.js */
      '<button class="btn btn-primary" onclick="openM(\'addAcc\')">+ Add Account</button>' +
    '</div>' +
    /* Grid container — account cards injected below */
    '<div class="grid-3" id="acc-cards"></div>';

  /* Build and inject account cards */
  document.getElementById('acc-cards').innerHTML = AppState.accounts.map(function (a) {

    /* Get badge CSS class for this account type (from utils.js)
       e.g. Checking → 'bb' (blue badge), Credit Card → 'br' (red badge) */
    var bc = ACC_BADGE[a.type] || 'bb';

    /* Make balance red if negative (represents debt/liability) */
    var balanceStyle = a.balance < 0 ? 'color:var(--danger)' : '';

    return '<div class="card">' +
      /* Large emoji icon at top of card */
      '<div style="font-size:26px;margin-bottom:7px">' + a.icon + '</div>' +
      /* Account display name */
      '<div style="font-size:14px;font-weight:600">' + a.name + '</div>' +
      /* Account type badge */
      '<div style="margin:4px 0"><span class="badge ' + bc + '">' + a.type + '</span></div>' +
      /* Balance — formatUSD removes sign, we style negative separately */
      '<div style="font-size:22px;font-weight:700;' + balanceStyle + ';margin-top:9px">' +
        formatUSD(a.balance) +  /* From utils.js — always positive display */
      '</div>' +
    '</div>';
  }).join('');
}
