/* ============================================
   pages/transactions.js — Transactions Page
   FinTrack AI Finance Suite
   ============================================ */

function renderTransactionsPage() {
  var el = document.getElementById('page-transactions');
  el.innerHTML = [
    '<div class="flex ic gap2 mb14">',
      '<select class="fs" style="width:140px" id="fcat" onchange="renderTxTable()">',
        '<option value="">All Categories</option>',
        '<option>Food &amp; Dining</option><option>Income</option><option>Housing</option>',
        '<option>Transport</option><option>Shopping</option><option>Healthcare</option>',
      '</select>',
      '<select class="fs" style="width:120px" id="ftype" onchange="renderTxTable()">',
        '<option value="">All Types</option><option>Income</option><option>Expense</option>',
      '</select>',
      '<input class="fi" style="width:170px" placeholder="Search..." id="txsearch" oninput="renderTxTable()">',
      '<button class="btn btn-primary" style="margin-left:auto" onclick="openM(\'addTx\')">+ Add Transaction</button>',
    '</div>',
    '<div class="card"><div class="tw">',
      '<table><thead><tr>',
        '<th>Date</th><th>Description</th><th>Category</th><th>Account</th><th>Amount</th><th>Type</th><th></th>',
      '</tr></thead><tbody id="tx-tbody"></tbody></table>',
    '</div></div>',
  ].join('');

  renderTxTable();
}

function renderTxTable() {
  var tbody  = document.getElementById('tx-tbody');
  if (!tbody) return;
  var search = (document.getElementById('txsearch') || {value:''}).value.toLowerCase();
  var fcat   = (document.getElementById('fcat')     || {value:''}).value;
  var ftype  = (document.getElementById('ftype')    || {value:''}).value;

  var rows = AppState.transactions.filter(function (t) {
    return (!search || t.desc.toLowerCase().includes(search) || t.cat.toLowerCase().includes(search))
        && (!fcat   || t.cat  === fcat)
        && (!ftype  || t.type === ftype);
  });

  if (!rows.length) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--text3);padding:20px">No transactions found</td></tr>';
    return;
  }

  tbody.innerHTML = rows.map(function (t) {
    var sign = t.type === 'Income' ? '+' : '-';
    var cls  = t.type === 'Income' ? 'green' : 'red';
    var bc   = t.type === 'Income' ? 'bg' : 'br';
    return '<tr>' +
      '<td>' + t.date + '</td>' +
      '<td>' + t.desc + '</td>' +
      '<td><span class="badge bb">' + t.cat + '</span></td>' +
      '<td>' + t.acc + '</td>' +
      '<td class="' + cls + '" style="font-weight:600">' + sign + '$' + t.amount + '</td>' +
      '<td><span class="badge ' + bc + '">' + t.type + '</span></td>' +
      '<td><button class="btn btn-ghost" style="padding:2px 7px;font-size:10px" onclick="deleteTransaction(' + t.id + ')">✕</button></td>' +
    '</tr>';
  }).join('');
}

function deleteTransaction(id) {
  AppState.transactions = AppState.transactions.filter(function (t) { return t.id !== id; });
  renderTxTable();
  toast('🗑️', 'Transaction deleted');
}
