/* ================================================================
   utils.js — Shared Helper Functions
   FinTrack AI Finance Suite
   ================================================================
   Pure utility functions used across ALL page scripts.
   No DOM dependencies except toast() which needs #toast.
   Load AFTER data.js, BEFORE all page scripts.

   Contents:
   1. toast()      — Show a temporary notification
   2. formatUSD()  — Format a number as a dollar string
   3. pctColor()   — Return a CSS color based on percentage
   4. pctBadge()   — Return a badge CSS class based on percentage
   5. ACC_BADGE    — Account type → badge class map
   6. ACC_ICONS    — Account type → emoji map
   7. clamp()      — Clamp a value between min and max
   ================================================================ */


/* ── 1. Toast Notification ───────────────────────────────────────
   Displays a small notification at the bottom-right of the screen.
   Auto-hides after 3 seconds. Calling again resets the timer.

   @param {string} icon  — emoji to show on the left (e.g. "✅")
   @param {string} msg   — message text (e.g. "Transaction added!")

   Usage:
     toast('✅', 'Transaction saved!');
     toast('⚠️', 'Please fill all fields');
     toast('🗑️', 'Item deleted');
   ──────────────────────────────────────────────────────────────── */
var _toastTimer;  /* Module-level timer reference so we can clear it */

function toast(icon, msg) {
  var el = document.getElementById('toast');
  document.getElementById('t-icon').textContent = icon;
  document.getElementById('t-msg').textContent  = msg;

  /* Add .show to make toast visible (CSS handles display:flex) */
  el.classList.add('show');

  /* Reset timer if called again before previous toast hides */
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(function () {
    el.classList.remove('show');
  }, 3000);
}


/* ── 2. Format USD ───────────────────────────────────────────────
   Converts a number to a formatted dollar string.
   Always positive (sign handled by caller).

   @param  {number} n  — the number to format
   @return {string}    — e.g. 1234 → "$1,234"

   Usage:
     formatUSD(8240)   → "$8,240"
     formatUSD(-3280)  → "$3,280"  (abs value, no sign)
   ──────────────────────────────────────────────────────────────── */
function formatUSD(n) {
  return '$' + Math.abs(n).toLocaleString();
}


/* ── 3. Progress Bar Color ───────────────────────────────────────
   Returns a CSS color string based on how full a budget/progress
   bar is. Uses traffic-light color coding.

   @param  {number} pct  — percentage (0–100+)
   @return {string}      — CSS color value

   Thresholds:
     > 85% → danger (red)    — over budget warning
     > 60% → warn  (amber)   — approaching limit
     else  → success (green) — safe range
   ──────────────────────────────────────────────────────────────── */
function pctColor(pct) {
  if (pct > 85) return 'var(--danger)';
  if (pct > 60) return 'var(--warn)';
  return 'var(--success)';
}


/* ── 4. Progress Badge Class ─────────────────────────────────────
   Returns the CSS badge class that matches the percentage level.
   Used alongside pctColor() for the badge on budget cards.

   @param  {number} pct  — percentage (0–100+)
   @return {string}      — badge CSS class

   Classes defined in components.css:
     .br → red badge
     .ba → amber badge
     .bg → green badge
   ──────────────────────────────────────────────────────────────── */
function pctBadge(pct) {
  if (pct > 85) return 'br';   /* Red */
  if (pct > 60) return 'ba';   /* Amber */
  return 'bg';                 /* Green */
}


/* ── 5. Account Type → Badge Class Map ───────────────────────────
   Maps account type strings to their badge color CSS class.
   Used by accounts.js and balance-sheet.js.
   ──────────────────────────────────────────────────────────────── */
var ACC_BADGE = {
  'Checking':    'bb',   /* Blue  */
  'Savings':     'bg',   /* Green */
  'Credit Card': 'br',   /* Red   */
  'Investment':  'bp',   /* Purple */
  'Loan':        'ba',   /* Amber */
};


/* ── 6. Account Type → Emoji Icon Map ────────────────────────────
   Maps account type strings to representative emoji.
   Used by modals.js when adding a new account.
   ──────────────────────────────────────────────────────────────── */
var ACC_ICONS = {
  'Checking':    '🏦',
  'Savings':     '💰',
  'Credit Card': '💳',
  'Investment':  '📈',
  'Loan':        '📋',
};


/* ── 7. Clamp ────────────────────────────────────────────────────
   Constrains a value between a minimum and maximum.
   Used to prevent progress bars from exceeding 100%.

   @param  {number} val  — the value to clamp
   @param  {number} min  — minimum allowed value
   @param  {number} max  — maximum allowed value
   @return {number}      — clamped value

   Usage:
     clamp(110, 0, 100)  → 100
     clamp(-5,  0, 100)  → 0
     clamp(75,  0, 100)  → 75
   ──────────────────────────────────────────────────────────────── */
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}
