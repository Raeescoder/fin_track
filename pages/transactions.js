/* ================================================================
   pages/transactions.js — Transactions Page
   FinTrack AI Finance Suite
   ================================================================
   Renders a full transaction management interface with:
   - Category filter dropdown
   - Income/Expense type filter
   - Live search input
   - Sortable table with all transactions
   - Delete button per row
   - "Add Transaction" button (opens modal from modals.js)

   Exported functions:
   - renderTransactionsPage() — builds the full page HTML
   - renderTxTable()          — (re)renders just the table body
   - deleteTransaction(id)    — removes a transaction by id
   ================================================================ */


/* ── renderTransactionsPage() ────────────────────────────────────
   Builds the full transactions page HTML including filter controls
   and the table shell. Calls renderTxTable() to populate rows.
   ──────────────────────────────────────────────────────────────── */
function renderTransactionsPage() {
  var el = document.getElementById('page-transactions');

  el.innerHTML = [

    /* ── Filter Bar ── */
    '<div class="flex ic gap2 mb14">',

      /* Category filter — filters by transaction category */
      '<select class="fs" style="width:140px" id="fcat" onchange="renderTxTable()">',
        '<option value="">All Categories</option>',
        '<option>Food &amp; Dining</option>',
        '<option>Income</option>',
        '<option>Housing</option>',
        '<option>Transport</option>',
        '<option>Shopping</option>',
        '<option>Healthcare</option>',
      '</select>',

      /* Type filter — Income or Expense only */
      '<select class="fs" style="width:120px" id="ftype" onchange="renderTxTable()">',
        '<option value="">All Types</option>',
        '<option>Income</option>',
        '<option>Expense</option>',
      '</select>',

      /* Live search — filters by description or category text */
      '<input class="fi" style="width:170px" placeholder="Search..." id="txsearch" oninput="renderTxTable()">',

      /* Add Transaction button — opens the addTx modal */
      '<button class="btn btn-primary" style="margin-left:auto" onclick="openM(\'addTx\')">+ Add Transaction</button>',

    '</div>',  /* /filter bar */

    /* ── Transactions Table ── */
    '<div class="card">',
      '<div class="tw">',  /* .tw = scrollable table wrapper */
        '<table>',
          '<thead><tr>',
            '<th>Date</th>',
            '<th>Description</th>',
            '<th>Category</th>',
            '<th>Account</th>',
            '<th>Amount</th>',
            '<th>Type</th>',
            '<th></th>',  /* Delete action column — no header */
          '</tr></thead>',
          /* tbody is populated by renderTxTable() */
          '<tbody id="tx-tbody"></tbody>',
        '</table>',
      '</div>',
    '</div>',

  ].join('');

  /* Populate table rows after HTML is injected */
  renderTxTable();
}


/* ── renderTxTable() ─────────────────────────────────────────────
   Rebuilds the table body rows based on current filter values.
   Called on:
   - Initial page render
   - Any filter/search input change (oninput / onchange)
   - After adding or deleting a transaction
   ──────────────────────────────────────────────────────────────── */
function renderTxTable() {
  var tbody = document.getElementById('tx-tbody');
  if (!tbody) return;  /* Guard: table may not exist yet */

  /* Read current filter values (default to "" if elements missing) */
  var search = (document.getElementById('txsearch') || { value: '' }).value.toLowerCase();
  var fcat   = (document.getElementById('fcat')     || { value: '' }).value;
  var ftype  = (document.getElementById('ftype')    || { value: '' }).value;

  /* Filter transactions based on all active filters */
  var rows = AppState.transactions.filter(function (t) {
    /* Text search: match description OR category name */
    var matchSearch = !search || t.desc.toLowerCase().includes(search) || t.cat.toLowerCase().includes(search);
    /* Category filter: exact match or no filter selected */
    var matchCat    = !fcat   || t.cat  === fcat;
    /* Type filter: exact match or no filter selected */
    var matchType   = !ftype  || t.type === ftype;
    return matchSearch && matchCat && matchType;
  });

  /* Show "no results" row if nothing matches */
  if (!rows.length) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--text3);padding:20px">No transactions found</td></tr>';
    return;
  }

  /* Build table rows for each matching transaction */
  tbody.innerHTML = rows.map(function (t) {
    var sign      = t.type === 'Income' ? '+' : '-';    /* Amount sign */
    var amtColor  = t.type === 'Income' ? 'green' : 'red';  /* Amount color */
    var typeBadge = t.type === 'Income' ? 'bg' : 'br';       /* Badge class */

    return '<tr>' +
      '<td>' + t.date + '</td>' +
      '<td>' + t.desc + '</td>' +
      /* Category shown as a blue badge */
      '<td><span class="badge bb">' + t.cat + '</span></td>' +
      '<td>' + t.acc + '</td>' +
      /* Amount colored green (income) or red (expense) */
      '<td class="' + amtColor + '" style="font-weight:600">' + sign + '$' + t.amount + '</td>' +
      /* Income/Expense type badge */
      '<td><span class="badge ' + typeBadge + '">' + t.type + '</span></td>' +
      /* Delete button — calls deleteTransaction with this row's id */
      '<td><button class="btn btn-ghost" style="padding:2px 7px;font-size:10px" onclick="deleteTransaction(' + t.id + ')">✕</button></td>' +
    '</tr>';
  }).join('');
}


/* ── deleteTransaction(id) ───────────────────────────────────────
   Removes a transaction from AppState by its unique id,
   then re-renders the table to reflect the deletion.

   @param {number} id — the transaction's unique id
   ──────────────────────────────────────────────────────────────── */
function deleteTransaction(id) {
  /* Filter out the transaction with matching id */
  AppState.transactions = AppState.transactions.filter(function (t) {
    return t.id !== id;
  });

  /* Re-render table to show updated list */
  renderTxTable();

  /* Show confirmation toast */
  toast('🗑️', 'Transaction deleted');
}
