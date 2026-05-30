/* ================================================================
   pages/dashboard.js — Dashboard Page
   FinTrack AI Finance Suite
   ================================================================
   Renders the main dashboard with:
   - 4 KPI stat cards (net worth, income, expenses, savings rate)
   - Monthly spending bar chart
   - Recent transactions preview (last 5)
   - Budget progress bars
   - AI quick insight boxes

   Exported functions (called by router.js and app.js):
   - renderDashboard()         — builds full dashboard HTML
   - renderBarChart()          — draws income vs expense bar chart
   - renderTxPreview()         — shows last 5 transactions
   - renderBudgetProgressBars()— shows budget category progress
   ================================================================ */


/* ── renderDashboard() ───────────────────────────────────────────
   Main entry point — builds all dashboard HTML and injects it
   into #page-dashboard, then calls sub-renderers to populate
   dynamic elements (chart, tx list, budgets).
   ──────────────────────────────────────────────────────────────── */
function renderDashboard() {
  var el = document.getElementById('page-dashboard');

  el.innerHTML = [

    /* ── KPI Cards Row (4 columns) ── */
    '<div class="grid-4">',

      /* Net Worth — total assets minus liabilities */
      '<div class="card">',
        '<div class="ch"><span class="ct">Net Worth</span><div class="si blue">💰</div></div>',
        '<div class="cv">$48,250</div>',
        '<div class="cc green">▲ +$2,140 this month</div>',
      '</div>',

      /* Monthly Income — all income transactions this month */
      '<div class="card">',
        '<div class="ch"><span class="ct">Monthly Income</span><div class="si green">📥</div></div>',
        '<div class="cv">$6,400</div>',
        '<div class="cc green">▲ +8% vs last month</div>',
      '</div>',

      /* Monthly Expenses — all expense transactions this month */
      '<div class="card">',
        '<div class="ch"><span class="ct">Monthly Expenses</span><div class="si red">📤</div></div>',
        '<div class="cv">$3,820</div>',
        '<div class="cc red">▲ +$210 vs last month</div>',
      '</div>',

      /* Savings Rate — (income - expenses) / income */
      '<div class="card">',
        '<div class="ch"><span class="ct">Savings Rate</span><div class="si amber">🏦</div></div>',
        '<div class="cv">40.3%</div>',
        '<div class="cc green">▲ +2.1% vs last month</div>',
      '</div>',

    '</div>',  /* /grid-4 */

    /* ── Charts & Recent Transactions Row (2 columns) ── */
    '<div class="grid-2">',

      /* Bar Chart Card — income vs expenses per month */
      '<div class="card">',
        '<div class="ch"><span class="ct">Spending by Month</span></div>',
        /* #bar-chart is populated by renderBarChart() below */
        '<div class="barchart" id="bar-chart"></div>',
        /* Legend */
        '<div class="flex gap2 mt14" style="font-size:11px;color:var(--text3)">',
          '<span><span style="display:inline-block;width:8px;height:8px;background:var(--accent);border-radius:2px;margin-right:3px"></span>Income</span>',
          '<span><span style="display:inline-block;width:8px;height:8px;background:var(--danger);border-radius:2px;margin-right:3px"></span>Expenses</span>',
        '</div>',
      '</div>',

      /* Recent Transactions Card */
      '<div class="card">',
        '<div class="ch">',
          '<span class="ct">Recent Transactions</span>',
          /* "View all" link navigates to transactions page */
          '<span class="blue" style="font-size:11px;cursor:pointer" onclick="go(\'transactions\',null)">View all →</span>',
        '</div>',
        /* #tx-preview is populated by renderTxPreview() below */
        '<ul class="tx-list" id="tx-preview"></ul>',
      '</div>',

    '</div>',  /* /grid-2 */

    '<div class="spacer"></div>',

    /* ── Budget & AI Insights Row (2 columns) ── */
    '<div class="grid-2">',

      /* Budget Progress Card */
      '<div class="card">',
        '<div class="ch"><span class="ct">Budget Progress</span></div>',
        /* #bud-progress is populated by renderBudgetProgressBars() */
        '<div id="bud-progress"></div>',
      '</div>',

      /* AI Quick Insights Card — static insight boxes */
      '<div class="card">',
        '<div class="ch"><span class="ct">AI Quick Insights</span><div class="si ai">🤖</div></div>',
        /* Green insight — positive news */
        '<div class="insight good"><strong class="green">✓ On Track</strong> — Saving 40% of income, above your 35% goal!</div>',
        /* Amber insight — warning */
        '<div class="insight warn"><strong class="amber">⚠ Food Budget</strong> — Dining at 88% of monthly budget with 3 days left.</div>',
        /* Red insight — action needed */
        '<div class="insight bad"><strong class="red">⚡ Credit Card</strong> — $3,280 balance costing ~$65/month in interest.</div>',
        /* Blue insight — tip/suggestion */
        '<div class="insight info"><strong class="blue">💡 Tip</strong> — Upgrade Pro to unlock Balance Sheet &amp; full AI analysis.</div>',
      '</div>',

    '</div>',  /* /grid-2 */

  ].join('');

  /* Populate dynamic elements after HTML is injected */
  renderBarChart();
  renderTxPreview();
  renderBudgetProgressBars();
}


/* ── renderBarChart() ────────────────────────────────────────────
   Draws a simple CSS bar chart comparing income vs expenses
   over the last 6 months using inline-styled divs.

   Chart structure per month:
   .bw (bar wrapper)
     ├── blue bar  (income)
     ├── red bar   (expenses)
     └── .bl label (month name)

   Heights are calculated as a percentage of the max income value.
   ──────────────────────────────────────────────────────────────── */
function renderBarChart() {
  var el = document.getElementById('bar-chart');
  if (!el) return;  /* Guard: element may not exist on other pages */

  /* Mock data — last 6 months */
  var months  = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
  var income  = [5200, 5800, 6100, 5900, 6200, 6400];
  var expense = [3200, 3500, 3100, 3400, 3600, 3820];

  /* Find max value to scale all bars relative to it */
  var mx = Math.max.apply(null, income);

  el.innerHTML = months.map(function (m, i) {
    /* Calculate bar heights as percentage of max */
    var ih = Math.round(income[i]  / mx * 100);  /* Income bar height % */
    var eh = Math.round(expense[i] / mx * 100);  /* Expense bar height % */

    return '<div class="bw">' +
      '<div style="display:flex;gap:3px;align-items:flex-end;height:100px">' +
        /* Income bar — blue */
        '<div class="bar" style="background:var(--accent);height:' + ih + '%"></div>' +
        /* Expense bar — red */
        '<div class="bar" style="background:var(--danger);height:' + eh + '%"></div>' +
      '</div>' +
      /* Month label below bars */
      '<div class="bl">' + m + '</div>' +
    '</div>';
  }).join('');
}


/* ── renderTxPreview() ───────────────────────────────────────────
   Shows the 5 most recent transactions in the dashboard card.
   Reads from AppState.transactions (last 5, reversed = newest first).

   Also called by modals.js after adding a new transaction,
   so the preview stays up to date.
   ──────────────────────────────────────────────────────────────── */
function renderTxPreview() {
  var el = document.getElementById('tx-preview');
  if (!el) return;

  /* Take last 5 transactions, reverse so newest appears at top */
  var recent = AppState.transactions.slice(-5).reverse();

  el.innerHTML = recent.map(function (t) {
    var sign = t.type === 'Income' ? '+' : '-';       /* Sign prefix */
    var cls  = t.type === 'Income' ? 'green' : 'red'; /* Color class */

    return '<li class="tx-item">' +
      /* Category emoji icon */
      '<div class="tx-cat-icon">' + (CAT_ICONS[t.cat] || '💳') + '</div>' +
      /* Description and metadata */
      '<div class="tx-info">' +
        '<div class="tx-name">' + t.desc + '</div>' +
        '<div class="tx-meta">' + t.date + ' · ' + t.cat + '</div>' +
      '</div>' +
      /* Amount with color coding */
      '<div class="tx-amt ' + cls + '">' + sign + '$' + t.amount + '</div>' +
    '</li>';
  }).join('');
}


/* ── renderBudgetProgressBars() ──────────────────────────────────
   Renders a progress bar for each budget category.
   Color changes based on how much of the budget is used:
   - Green  = safe  (< 60%)
   - Amber  = caution (60–85%)
   - Red    = danger (> 85%)

   Also called by modals.js after creating a new budget.
   ──────────────────────────────────────────────────────────────── */
function renderBudgetProgressBars() {
  var el = document.getElementById('bud-progress');
  if (!el) return;

  el.innerHTML = AppState.budgets.map(function (b) {
    /* Calculate percentage and clamp to 100% for visual */
    var pct = Math.round(b.spent / b.limit * 100);
    var c   = pctColor(pct);   /* From utils.js */

    return '<div class="pr">' +
      /* Category name on left, spent/limit on right */
      '<div class="pr-meta">' +
        '<span style="font-size:12px;color:var(--text2)">' + b.cat + '</span>' +
        '<span style="font-size:11px;color:var(--text3)">$' + b.spent + ' / $' + b.limit + '</span>' +
      '</div>' +
      /* Progress track with colored fill */
      '<div class="pr-track">' +
        '<div class="pr-fill" style="width:' + clamp(pct, 0, 100) + '%;background:' + c + '"></div>' +
      '</div>' +
    '</div>';
  }).join('');
}
