/* ============================================
   pages/accounts.js — Accounts Page
   FinTrack AI Finance Suite
   ============================================ */

function renderAccountsPage() {
  var el = document.getElementById('page-accounts');
  el.innerHTML =
    '<div class="flex ic gap2 mb14"><button class="btn btn-primary" onclick="openM(\'addAcc\')">+ Add Account</button></div>' +
    '<div class="grid-3" id="acc-cards"></div>';

  document.getElementById('acc-cards').innerHTML = AppState.accounts.map(function (a) {
    var bc    = ACC_BADGE[a.type] || 'bb';
    var color = a.balance >= 0 ? '' : 'color:var(--danger)';
    return '<div class="card">' +
      '<div style="font-size:26px;margin-bottom:7px">' + a.icon + '</div>' +
      '<div style="font-size:14px;font-weight:600">' + a.name + '</div>' +
      '<div style="margin:4px 0"><span class="badge ' + bc + '">' + a.type + '</span></div>' +
      '<div style="font-size:22px;font-weight:700;' + color + ';margin-top:9px">' + formatUSD(a.balance) + '</div>' +
    '</div>';
  }).join('');
}
