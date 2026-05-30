/* ================================================================
   pages/admin.js — Admin Panel Page
   FinTrack AI Finance Suite
   ================================================================
   Renders the admin dashboard with:
   - 4 KPI metrics (total users, pro users, MRR, churn rate)
   - User management table with live search
   - Recent payments log
   - System settings (pricing, limits, maintenance mode)

   Exported functions:
   - renderAdminPage()      — builds full admin page HTML
   - renderAdminUsers()     — (re)renders user table with search filter
   - renderAdminPayments()  — renders recent payments table
   ================================================================ */


/* ── renderAdminPage() ───────────────────────────────────────────
   Builds the complete admin panel HTML and injects it into
   #page-admin, then calls sub-renderers to populate tables.
   ──────────────────────────────────────────────────────────────── */
function renderAdminPage() {
  var el = document.getElementById('page-admin');

  el.innerHTML = [

    /* ── KPI Cards Row ── */
    '<div class="grid-4">',
      /* Total registered users */
      '<div class="card"><div class="ch"><span class="ct">Total Users</span><div class="si blue">👤</div></div><div class="cv">1,284</div><div class="cc green">▲ +48 this week</div></div>',
      /* Users on Pro plan */
      '<div class="card"><div class="ch"><span class="ct">Pro Users</span><div class="si amber">⭐</div></div><div class="cv">341</div><div class="cc green">▲ +12 this week</div></div>',
      /* Monthly Recurring Revenue */
      '<div class="card"><div class="ch"><span class="ct">MRR</span><div class="si green">💵</div></div><div class="cv">$6,820</div><div class="cc green">▲ +$340 this week</div></div>',
      /* Percentage of Pro users who cancelled */
      '<div class="card"><div class="ch"><span class="ct">Churn Rate</span><div class="si red">📉</div></div><div class="cv">2.1%</div><div class="cc green">▼ -0.3% vs last mo</div></div>',
    '</div>',

    '<div class="spacer"></div>',

    /* ── User Management & Payments Row ── */
    '<div class="grid-2">',

      /* User Management Table */
      '<div class="card">',
        '<div class="ch">',
          '<span class="ct">User Management</span>',
          /* Live search input — filters by name or email */
          '<input class="fi" style="width:160px" placeholder="Search users..." id="admin-search" oninput="renderAdminUsers()">',
        '</div>',
        '<div class="tw">',  /* Scrollable table wrapper */
          '<table>',
            '<thead><tr>',
              '<th>User</th><th>Plan</th><th>Joined</th><th>Status</th><th>Action</th>',
            '</tr></thead>',
            /* Populated by renderAdminUsers() */
            '<tbody id="admin-users"></tbody>',
          '</table>',
        '</div>',
      '</div>',

      /* Recent Payments Table */
      '<div class="card">',
        '<div class="ch"><span class="ct">Recent Payments</span></div>',
        '<div class="tw">',
          '<table>',
            '<thead><tr>',
              '<th>User</th><th>Plan</th><th>Amount</th><th>Date</th>',
            '</tr></thead>',
            /* Populated by renderAdminPayments() */
            '<tbody id="admin-pays"></tbody>',
          '</table>',
        '</div>',
      '</div>',

    '</div>',  /* /grid-2 */

    '<div class="spacer"></div>',

    /* ── System Settings Card ── */
    '<div class="card">',
      '<div class="ch"><span class="ct">System Settings</span></div>',
      '<div class="grid-3" style="gap:12px">',

        /* Pro Plan Pricing Setting */
        '<div style="background:var(--bg3);border-radius:8px;padding:13px">',
          '<div style="font-size:12px;font-weight:500;margin-bottom:8px">Pro Plan Pricing</div>',
          '<div class="flex ic gap2">',
            '<span style="font-size:12px;color:var(--text2)">Monthly</span>',
            '<input class="fi" value="$19.99" style="width:80px">',
          '</div>',
        '</div>',

        /* Free Tier Limit Setting */
        '<div style="background:var(--bg3);border-radius:8px;padding:13px">',
          '<div style="font-size:12px;font-weight:500;margin-bottom:8px">Free Tier Limit</div>',
          '<div class="flex ic gap2">',
            '<span style="font-size:12px;color:var(--text2)">Max tx/month</span>',
            '<input class="fi" value="50" style="width:60px">',
          '</div>',
        '</div>',

        /* Maintenance Mode Toggle */
        '<div style="background:var(--bg3);border-radius:8px;padding:13px">',
          '<div style="font-size:12px;font-weight:500;margin-bottom:8px">Maintenance Mode</div>',
          '<label class="flex ic gap2" style="cursor:pointer;font-size:12px;color:var(--text2)">',
            '<input type="checkbox" style="width:14px;height:14px">',
            ' Enable maintenance',
          '</label>',
        '</div>',

      '</div>',  /* /grid-3 */

      /* Settings action buttons */
      '<div class="flex gap2 mt14">',
        '<button class="btn btn-primary" onclick="toast(\'✅\',\'Settings saved!\')">Save Settings</button>',
        '<button class="btn btn-ghost">Reset to defaults</button>',
      '</div>',

    '</div>',  /* /settings card */

  ].join('');

  /* Populate tables after HTML is injected */
  renderAdminUsers();
  renderAdminPayments();
}


/* ── renderAdminUsers() ──────────────────────────────────────────
   Builds the user management table rows.
   Filters by the #admin-search input (name or email match).
   Called on page load and on every keystroke in the search box.
   ──────────────────────────────────────────────────────────────── */
function renderAdminUsers() {
  var tbody = document.getElementById('admin-users');
  if (!tbody) return;

  /* Get search value (lowercase for case-insensitive match) */
  var search = (document.getElementById('admin-search') || { value: '' }).value.toLowerCase();

  /* Filter users by name or email */
  var rows = AppState.adminUsers.filter(function (u) {
    return !search ||
      u.name.toLowerCase().includes(search) ||
      u.email.toLowerCase().includes(search);
  });

  tbody.innerHTML = rows.map(function (u) {
    /* Plan badge: Pro = amber, Free = blue */
    var pb = u.plan === 'Pro' ? 'ba' : 'bb';
    /* Status badge: Active = green, Suspended = red */
    var sb = u.status === 'Active' ? 'bg' : 'br';

    return '<tr>' +
      /* User cell: name + email stacked */
      '<td>' +
        '<div style="font-size:12px;font-weight:500">' + u.name + '</div>' +
        '<div style="font-size:10px;color:var(--text3)">' + u.email + '</div>' +
      '</td>' +
      '<td><span class="badge ' + pb + '">' + u.plan + '</span></td>' +
      '<td style="color:var(--text3);font-size:11px">' + u.joined + '</td>' +
      '<td><span class="badge ' + sb + '">' + u.status + '</span></td>' +
      /* Manage button — placeholder action */
      '<td><button class="btn btn-ghost" style="padding:2px 7px;font-size:10px" onclick="toast(\'⚙️\',\'Managing user...\')">Manage</button></td>' +
    '</tr>';
  }).join('');
}


/* ── renderAdminPayments() ───────────────────────────────────────
   Builds the recent payments table rows.
   No filtering — always shows all recent payments.
   ──────────────────────────────────────────────────────────────── */
function renderAdminPayments() {
  var tbody = document.getElementById('admin-pays');
  if (!tbody) return;

  tbody.innerHTML = AppState.adminPayments.map(function (p) {
    return '<tr>' +
      '<td style="font-size:12px">' + p.user + '</td>' +
      /* Plan badge always amber (all payments are Pro plan) */
      '<td><span class="badge ba">' + p.plan + '</span></td>' +
      /* Amount in green to reinforce positive revenue */
      '<td class="green" style="font-weight:600">' + p.amount + '</td>' +
      '<td style="color:var(--text3);font-size:11px">' + p.date + '</td>' +
    '</tr>';
  }).join('');
}
