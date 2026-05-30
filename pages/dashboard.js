/* ============================================
   pages/dashboard.js — Dashboard Page
   FinTrack AI Finance Suite
   ============================================ */

function renderDashboard() {
  var el = document.getElementById('page-dashboard');
  el.innerHTML = [
    // Stats row
    '<div class="grid-4">',
      '<div class="card"><div class="ch"><span class="ct">Net Worth</span><div class="si blue">💰</div></div><div class="cv">$48,250</div><div class="cc green">▲ +$2,140 this month</div></div>',
      '<div class="card"><div class="ch"><span class="ct">Monthly Income</span><div class="si green">📥</div></div><div class="cv">$6,400</div><div class="cc green">▲ +8% vs last month</div></div>',
      '<div class="card"><div class="ch"><span class="ct">Monthly Expenses</span><div class="si red">📤</div></div><div class="cv">$3,820</div><div class="cc red">▲ +$210 vs last month</div></div>',
      '<div class="card"><div class="ch"><span class="ct">Savings Rate</span><div class="si amber">🏦</div></div><div class="cv">40.3%</div><div class="cc green">▲ +2.1% vs last month</div></div>',
    '</div>',
    // Charts row
    '<div class="grid-2">',
      '<div class="card">',
        '<div class="ch"><span class="ct">Spending by Month</span></div>',
        '<div class="barchart" id="bar-chart"></div>',
        '<div class="flex gap2 mt14" style="font-size:11px;color:var(--text3)">',
          '<span><span style="display:inline-block;width:8px;height:8px;background:var(--accent);border-radius:2px;margin-right:3px"></span>Income</span>',
          '<span><span style="display:inline-block;width:8px;height:8px;background:var(--danger);border-radius:2px;margin-right:3px"></span>Expenses</span>',
        '</div>',
      '</div>',
      '<div class="card">',
        '<div class="ch"><span class="ct">Recent Transactions</span>',
          '<span class="blue" style="font-size:11px;cursor:pointer" onclick="go(\'transactions\',null)">View all →</span>',
        '</div>',
        '<ul class="tx-list" id="tx-preview"></ul>',
      '</div>',
    '</div>',
    '<div class="spacer"></div>',
    // Bottom row
    '<div class="grid-2">',
      '<div class="card"><div class="ch"><span class="ct">Budget Progress</span></div><div id="bud-progress"></div></div>',
      '<div class="card">',
        '<div class="ch"><span class="ct">AI Quick Insights</span><div class="si ai">🤖</div></div>',
        '<div class="insight good"><strong class="green">✓ On Track</strong> — Saving 40% of income, above your 35% goal!</div>',
        '<div class="insight warn"><strong class="amber">⚠ Food Budget</strong> — Dining at 88% of monthly budget with 3 days left.</div>',
        '<div class="insight bad"><strong class="red">⚡ Credit Card</strong> — $3,280 balance costing ~$65/month in interest.</div>',
        '<div class="insight info"><strong class="blue">💡 Tip</strong> — Upgrade Pro to unlock Balance Sheet &amp; full AI analysis.</div>',
      '</div>',
    '</div>',
  ].join('');

  renderBarChart();
  renderTxPreview();
  renderBudgetProgressBars();
}

function renderBarChart() {
  var el = document.getElementById('bar-chart');
  if (!el) return;
  var months = ['Dec','Jan','Feb','Mar','Apr','May'];
  var income  = [5200,5800,6100,5900,6200,6400];
  var expense = [3200,3500,3100,3400,3600,3820];
  var mx = Math.max.apply(null, income);
  el.innerHTML = months.map(function (m, i) {
    var ih = Math.round(income[i]  / mx * 100);
    var eh = Math.round(expense[i] / mx * 100);
    return '<div class="bw">' +
      '<div style="display:flex;gap:3px;align-items:flex-end;height:100px">' +
        '<div class="bar" style="background:var(--accent);height:' + ih + '%"></div>' +
        '<div class="bar" style="background:var(--danger);height:' + eh + '%"></div>' +
      '</div>' +
      '<div class="bl">' + m + '</div>' +
    '</div>';
  }).join('');
}

function renderTxPreview() {
  var el = document.getElementById('tx-preview');
  if (!el) return;
  var recent = AppState.transactions.slice(-5).reverse();
  el.innerHTML = recent.map(function (t) {
    var sign = t.type === 'Income' ? '+' : '-';
    var cls  = t.type === 'Income' ? 'green' : 'red';
    return '<li class="tx-item">' +
      '<div class="tx-cat-icon">' + (CAT_ICONS[t.cat] || '💳') + '</div>' +
      '<div class="tx-info">' +
        '<div class="tx-name">' + t.desc + '</div>' +
        '<div class="tx-meta">' + t.date + ' · ' + t.cat + '</div>' +
      '</div>' +
      '<div class="tx-amt ' + cls + '">' + sign + '$' + t.amount + '</div>' +
    '</li>';
  }).join('');
}

function renderBudgetProgressBars() {
  var el = document.getElementById('bud-progress');
  if (!el) return;
  el.innerHTML = AppState.budgets.map(function (b) {
    var pct = Math.round(b.spent / b.limit * 100);
    var c   = pctColor(pct);
    return '<div class="pr">' +
      '<div class="pr-meta">' +
        '<span style="font-size:12px;color:var(--text2)">' + b.cat + '</span>' +
        '<span style="font-size:11px;color:var(--text3)">$' + b.spent + ' / $' + b.limit + '</span>' +
      '</div>' +
      '<div class="pr-track"><div class="pr-fill" style="width:' + clamp(pct,0,100) + '%;background:' + c + '"></div></div>' +
    '</div>';
  }).join('');
}
