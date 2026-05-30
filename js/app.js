/* ================================================================
   app.js — Application Bootstrap
   FinTrack AI Finance Suite
   ================================================================
   This is the LAST script to load (see index.html script order).
   It runs once when the DOM is fully ready.

   Responsibilities:
   - Render the initial dashboard page (which is active by default)
   - Set up any global event listeners that need the full DOM

   Why DOMContentLoaded?
   Even though this script loads last, using DOMContentLoaded is
   a safety net to ensure all DOM elements exist before we
   try to render into them.
   ================================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* Render the dashboard — it's the default active page.
     This populates #page-dashboard with its HTML content.
     All other pages render lazily when the user navigates to them. */
  renderDashboard();

  /* Track current page in state (matches the active .page div) */
  AppState.currentPage = 'dashboard';

  /* Note: modals.js sets up modal backdrop click listeners in its
     own DOMContentLoaded handler. No need to duplicate here. */
});
