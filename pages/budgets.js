/* ============================================
   pages/budgets.js — Budgets Page
   FinTrack AI Finance Suite
   ============================================ */

function renderBudgetsPage() {
  var el = document.getElementById('page-budgets');
  el.innerHTML =
    '<div class="flex ic gap2 mb14"><button class="btn btn-primary" onclick="openM(\'addBudget\')">+ New Budget</button></div>' +
    '<div class="grid-3" id="bud-cards"></div>';

  document.getElementById('bud-cards').innerHTML = AppState.budgets.map(function (b) {
    var pct  = Math.round(b.spent / b.limit * 100);
    var c    = pctColor(pct);
    var bc   = pctBadge(pct);
    var icon = CAT_ICONS[b.cat] || '📦';
    return '<div class="card">' +
      '<div class="ch"><span style="font-size:22px">' + icon + '</span><span class="badge ' + bc + '">' + pct + '%</span></div>' +
      '<div style="font-size:14px;font-weight:600;margin-bottom:3px">' + b.cat + '</div>' +
      '<div style="font-size:11px;color:var(--text3);margin-bottom:11px">$' + b.spent + ' of $' + b.limit + ' spent</div>' +
      '<div class="pr-track"><div class="pr-fill" style="width:' + clamp(pct,0,100) + '%;background:' + c + '"></div></div>' +
      '<div style="font-size:11px;color:var(--text3);margin-top:7px">$' + (b.limit - b.spent) + ' remaining</div>' +
    '</div>';
  }).join('');
}
