/* ============================================
   pages/balance-sheet.js — Balance Sheet Page
   pages/reports.js       — Reports Page
   FinTrack AI Finance Suite
   ============================================ */

/* ---- Balance Sheet ---- */
function renderBalanceSheetPage() {
  var el = document.getElementById('page-balancesheet');

  if (!AppState.isPro) {
    el.innerHTML = premiumGate(
      '📋', 'Balance Sheet — Pro Feature',
      'Get a complete snapshot of your assets, liabilities, and net worth in a professional balance sheet format used by accountants.',
      ['Current & Fixed Assets breakdown', 'Short & Long-term Liabilities', 'Equity & Net Worth Calculation', 'PDF Export for tax filing']
    );
    return;
  }

  el.innerHTML = [
    '<div class="flex ic gap2 mb14">',
      '<span class="badge ba">⭐ Pro</span>',
      '<span style="font-size:12px;color:var(--text2)">As of May 28, 2025</span>',
      '<button class="btn btn-ghost" style="margin-left:auto;font-size:11px" onclick="toast(\'📄\',\'PDF export coming soon!\')">⬇ Export PDF</button>',
    '</div>',
    '<div class="grid-2">',
      // ASSETS
      '<div><div class="card">',
        '<div class="bsh"><span class="bst">Assets</span></div>',
        bsSubheader('Current Assets'),
        '<div class="bsr"><span>Cash &amp; Checking</span><span>$8,240</span></div>',
        '<div class="bsr"><span>Savings Account</span><span>$22,800</span></div>',
        '<div class="bstot"><span>Total Current Assets</span><span class="green">$31,040</span></div>',
        bsSubheader('Fixed Assets'),
        '<div class="bsr"><span>401k / Retirement</span><span>$18,200</span></div>',
        '<div class="bsr"><span>Vehicle (Est. Value)</span><span>$12,000</span></div>',
        '<div class="bstot"><span>Total Fixed Assets</span><span class="green">$30,200</span></div>',
        '<div class="bstot" style="background:rgba(16,185,129,.12);border:1px solid rgba(16,185,129,.2);margin-top:6px">',
          '<span>TOTAL ASSETS</span><span class="green" style="font-size:14px">$61,240</span>',
        '</div>',
      '</div></div>',
      // LIABILITIES
      '<div><div class="card">',
        '<div class="bsh"><span class="bst">Liabilities</span></div>',
        bsSubheader('Current Liabilities'),
        '<div class="bsr"><span>Credit Card Balance</span><span class="red">$3,280</span></div>',
        '<div class="bstot"><span>Total Current Liabilities</span><span class="red">$3,280</span></div>',
        bsSubheader('Long-term Liabilities'),
        '<div class="bsr"><span>Car Loan</span><span class="red">$12,500</span></div>',
        '<div class="bstot"><span>Total Long-term Liabilities</span><span class="red">$12,500</span></div>',
        '<div class="bstot" style="background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);margin-top:6px">',
          '<span>TOTAL LIABILITIES</span><span class="red" style="font-size:14px">$15,780</span>',
        '</div>',
      '</div></div>',
    '</div>',
    '<div class="bsnet mt14">',
      '<div><div style="font-size:12px;color:var(--text2);margin-bottom:3px">NET WORTH (Equity)</div>',
      '<div style="font-size:11px;color:var(--text3)">Total Assets − Total Liabilities</div></div>',
      '<div style="font-size:30px;font-weight:800;color:var(--accent)">$45,460</div>',
    '</div>',
  ].join('');
}

function bsSubheader(label) {
  return '<div style="font-size:10px;color:var(--text3);padding:8px 14px 4px;text-transform:uppercase;letter-spacing:.4px">' + label + '</div>';
}

/* ---- Reports ---- */
function renderReportsPage() {
  var el = document.getElementById('page-reports');
  if (!AppState.isPro) {
    el.innerHTML = premiumGate(
      '📈', 'Advanced Reports — Pro Feature',
      'Deep-dive analytics, spending trends, income tracking, and tax-ready exports for your financial data.',
      ['Monthly & Annual P&L Reports', 'Category Spend Analysis', 'Income Trend Charts', 'CSV & PDF Export']
    );
    return;
  }
  el.innerHTML = '<div class="card"><div style="font-size:14px;color:var(--text2);padding:24px;text-align:center">Full reports dashboard coming soon — you are all set with Pro access! 🎉</div></div>';
}

/* ---- Shared Premium Gate ---- */
function premiumGate(icon, title, desc, features) {
  return '<div class="pgate">' +
    '<div class="pgate-icon">' + icon + '</div>' +
    '<div class="pgate-title">' + title + '</div>' +
    '<div class="pgate-desc">' + desc + '</div>' +
    '<ul class="pgate-feats">' + features.map(function (f) { return '<li>' + f + '</li>'; }).join('') + '</ul>' +
    '<div class="pgate-price">$19.99<span style="font-size:15px">/mo</span></div>' +
    '<div class="pgate-period">Cancel anytime</div>' +
    '<button class="btn btn-gold" style="padding:11px 28px;font-size:14px;font-weight:600" onclick="openM(\'upgrade\')">⚡ Unlock Now</button>' +
  '</div>';
}
