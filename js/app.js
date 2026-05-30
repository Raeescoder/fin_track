/* ============================================
   app.js — Bootstrap & Initialization
   FinTrack AI Finance Suite
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  // Render dashboard components
  renderBarChart();
  renderTxPreview();
  renderBudgetProgressBars();

  // Mark dashboard as the initial active page
  AppState.currentPage = 'dashboard';
});
