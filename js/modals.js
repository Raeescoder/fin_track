/* ============================================
   modals.js — Modal Rendering & Logic
   FinTrack AI Finance Suite
   ============================================ */

/** Open a modal by id */
function openM(id) {
  var el = document.getElementById('m-' + id);
  if (el) el.classList.add('open');
}

/** Close a modal by id */
function closeM(id) {
  var el = document.getElementById('m-' + id);
  if (el) el.classList.remove('open');
}

/* ---- Build modal HTML on DOMContentLoaded ---- */
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('modals-root').innerHTML = [

    // Add Transaction
    '<div class="mo" id="m-addTx"><div class="md">',
      '<div class="mh"><span class="mt-modal">Add Transaction</span><button class="mc" onclick="closeM(\'addTx\')">✕</button></div>',
      '<div class="fr"><div class="fg"><label class="fl">Description</label><input class="fi" id="ntd" placeholder="e.g. Grocery Store"></div>',
      '<div class="fg"><label class="fl">Amount ($)</label><input class="fi" id="nta" type="number" placeholder="0.00"></div></div>',
      '<div class="fr"><div class="fg"><label class="fl">Type</label><select class="fs" id="ntt"><option>Expense</option><option>Income</option></select></div>',
      '<div class="fg"><label class="fl">Category</label><select class="fs" id="ntc"><option>Food &amp; Dining</option><option>Housing</option><option>Transport</option><option>Shopping</option><option>Healthcare</option><option>Salary</option><option>Freelance</option></select></div></div>',
      '<div class="fr"><div class="fg"><label class="fl">Date</label><input class="fi" id="ntdt" type="date" value="2025-05-28"></div>',
      '<div class="fg"><label class="fl">Account</label><select class="fs" id="ntac"><option>Checking</option><option>Savings</option><option>Credit Card</option></select></div></div>',
      '<div class="fe"><button class="btn btn-ghost" onclick="closeM(\'addTx\')">Cancel</button><button class="btn btn-primary" onclick="addTransaction()">Add Transaction</button></div>',
    '</div></div>',

    // Add Budget
    '<div class="mo" id="m-addBudget"><div class="md">',
      '<div class="mh"><span class="mt-modal">Create Budget</span><button class="mc" onclick="closeM(\'addBudget\')">✕</button></div>',
      '<div class="fg"><label class="fl">Category</label><select class="fs" id="nbc"><option>Food &amp; Dining</option><option>Housing</option><option>Transport</option><option>Shopping</option><option>Healthcare</option><option>Entertainment</option></select></div>',
      '<div class="fg"><label class="fl">Monthly Limit ($)</label><input class="fi" id="nbl" type="number" placeholder="500"></div>',
      '<div class="fe"><button class="btn btn-ghost" onclick="closeM(\'addBudget\')">Cancel</button><button class="btn btn-primary" onclick="addBudget()">Create Budget</button></div>',
    '</div></div>',

    // Add Account
    '<div class="mo" id="m-addAcc"><div class="md">',
      '<div class="mh"><span class="mt-modal">Add Account</span><button class="mc" onclick="closeM(\'addAcc\')">✕</button></div>',
      '<div class="fg"><label class="fl">Account Name</label><input class="fi" id="nan" placeholder="e.g. Chase Checking"></div>',
      '<div class="fr"><div class="fg"><label class="fl">Type</label><select class="fs" id="nat"><option>Checking</option><option>Savings</option><option>Credit Card</option><option>Investment</option><option>Loan</option></select></div>',
      '<div class="fg"><label class="fl">Balance ($)</label><input class="fi" id="nab" type="number" placeholder="0.00"></div></div>',
      '<div class="fe"><button class="btn btn-ghost" onclick="closeM(\'addAcc\')">Cancel</button><button class="btn btn-primary" onclick="addAccount()">Add Account</button></div>',
    '</div></div>',

    // Upgrade to Pro
    '<div class="mo" id="m-upgrade"><div class="md">',
      '<div class="mh"><span class="mt-modal">⚡ Upgrade to Pro</span><button class="mc" onclick="closeM(\'upgrade\')">✕</button></div>',
      '<div style="text-align:center;padding:6px 0 14px">',
        '<div style="font-size:38px;margin-bottom:8px">⭐</div>',
        '<div style="font-size:13px;color:var(--text2)">Unlock the full power of FinTrack</div>',
        '<div style="font-size:32px;font-weight:800;color:var(--gold);margin:12px 0 3px">$19.99</div>',
        '<div style="font-size:11px;color:var(--text3);margin-bottom:14px">per month · cancel anytime</div>',
      '</div>',
      '<div class="pay-feats">',
        '<div class="pf">✓ Balance Sheet</div><div class="pf">✓ Advanced Reports</div>',
        '<div class="pf">✓ Full AI Advisor</div><div class="pf">✓ Tax PDF Export</div>',
        '<div class="pf">✓ Unlimited Transactions</div><div class="pf">✓ Priority Support</div>',
      '</div>',
      '<div class="paycard">',
        '<div style="font-size:11px;color:var(--text2);margin-bottom:9px;font-weight:500">Card Details</div>',
        '<div class="fg" style="margin-bottom:9px"><input class="fi" placeholder="1234 5678 9012 3456" id="pnum"></div>',
        '<div class="fr"><input class="fi" placeholder="MM/YY" id="pexp"><input class="fi" placeholder="CVV" id="pcvv"></div>',
      '</div>',
      '<button class="btn btn-gold" style="width:100%;padding:11px;font-size:14px;font-weight:600;border-radius:10px" onclick="completePurchase()">🔒 Pay $19.99/month</button>',
      '<div style="text-align:center;font-size:10px;color:var(--text3);margin-top:9px">Secured by SSL · 256-bit encryption</div>',
    '</div></div>',

  ].join('');

  // Backdrop click to close
  document.querySelectorAll('.mo').forEach(function (m) {
    m.addEventListener('click', function (e) {
      if (e.target === m) m.classList.remove('open');
    });
  });
});

/* ---- Modal Action Handlers ---- */

function addTransaction() {
  var desc = document.getElementById('ntd').value.trim();
  var amt  = parseFloat(document.getElementById('nta').value);
  if (!desc || !amt) { toast('⚠️', 'Fill in all fields'); return; }
  AppState.transactions.push({
    id:   Date.now(),
    desc: desc,
    amount: amt,
    type: document.getElementById('ntt').value,
    cat:  document.getElementById('ntc').value,
    date: document.getElementById('ntdt').value,
    acc:  document.getElementById('ntac').value,
  });
  closeM('addTx');
  toast('✅', 'Transaction added!');
  renderTxPreview();
  if (AppState.currentPage === 'transactions') renderTransactionsPage();
}

function addBudget() {
  var lim = parseFloat(document.getElementById('nbl').value);
  if (!lim) { toast('⚠️', 'Enter a limit amount'); return; }
  AppState.budgets.push({ cat: document.getElementById('nbc').value, limit: lim, spent: 0 });
  closeM('addBudget');
  toast('✅', 'Budget created!');
  if (AppState.currentPage === 'budgets') renderBudgetsPage();
  renderBudgetProgressBars();
}

function addAccount() {
  var name = document.getElementById('nan').value.trim();
  var type = document.getElementById('nat').value;
  if (!name) { toast('⚠️', 'Enter an account name'); return; }
  AppState.accounts.push({
    name: name,
    type: type,
    balance: parseFloat(document.getElementById('nab').value) || 0,
    icon: ACC_ICONS[type] || '🏦',
  });
  closeM('addAcc');
  toast('✅', 'Account added!');
  if (AppState.currentPage === 'accounts') renderAccountsPage();
}

function completePurchase() {
  if (!document.getElementById('pnum').value.trim()) { toast('⚠️', 'Enter card number'); return; }
  closeM('upgrade');
  AppState.isPro = true;
  document.getElementById('plan-label').textContent = '⭐ Pro Plan';
  document.getElementById('plan-label').style.color = '#FCD34D';
  document.getElementById('free-badge').style.display = 'none';
  toast('🎉', 'Welcome to Pro! All features unlocked!');
  // Re-render if on a gated page
  if (AppState.currentPage === 'balancesheet') renderBalanceSheetPage();
  if (AppState.currentPage === 'reports')      renderReportsPage();
}
