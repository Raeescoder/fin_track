/* ============================================
   utils.js — Shared Helper Functions
   FinTrack AI Finance Suite
   ============================================ */

/**
 * Show a toast notification
 * @param {string} icon  — emoji icon
 * @param {string} msg   — message text
 */
var _toastTimer;
function toast(icon, msg) {
  var el = document.getElementById('toast');
  document.getElementById('t-icon').textContent = icon;
  document.getElementById('t-msg').textContent  = msg;
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(function () { el.classList.remove('show'); }, 3000);
}

/**
 * Format a number as USD currency string
 * @param {number} n
 * @returns {string}  e.g. "$1,234"
 */
function formatUSD(n) {
  return '$' + Math.abs(n).toLocaleString();
}

/**
 * Return progress-bar color based on percentage
 * @param {number} pct
 * @returns {string}  CSS color value
 */
function pctColor(pct) {
  if (pct > 85) return 'var(--danger)';
  if (pct > 60) return 'var(--warn)';
  return 'var(--success)';
}

/**
 * Return badge class based on percentage
 * @param {number} pct
 * @returns {string}
 */
function pctBadge(pct) {
  if (pct > 85) return 'br';
  if (pct > 60) return 'ba';
  return 'bg';
}

/**
 * Account type → badge class map
 */
var ACC_BADGE = {
  'Checking':    'bb',
  'Savings':     'bg',
  'Credit Card': 'br',
  'Investment':  'bp',
  'Loan':        'ba',
};

/**
 * Account type → icon map
 */
var ACC_ICONS = {
  'Checking':    '🏦',
  'Savings':     '💰',
  'Credit Card': '💳',
  'Investment':  '📈',
  'Loan':        '📋',
};

/**
 * Clamp a value between min and max
 */
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

// Close any modal when clicking its backdrop
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.mo').forEach(function (m) {
    m.addEventListener('click', function (e) {
      if (e.target === m) m.classList.remove('open');
    });
  });
});
