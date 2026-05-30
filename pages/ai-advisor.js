/* ============================================
   pages/ai-advisor.js — AI Financial Advisor
   FinTrack AI Finance Suite
   ============================================ */

function renderAIPage() {
  var el = document.getElementById('page-ai');
  el.innerHTML = [
    // Header card
    '<div class="card mb14" style="margin-bottom:18px">',
      '<div class="flex ic gap2">',
        '<div class="si ai" style="width:42px;height:42px;font-size:20px">🤖</div>',
        '<div><div style="font-size:14px;font-weight:600">AI Financial Advisor</div>',
        '<div class="subtitle">Personalized insights based on your spending patterns</div></div>',
        '<div style="margin-left:auto;padding:5px 12px;border-radius:20px;font-size:12px;color:#c4b5fd;font-weight:500;background:rgba(139,92,246,.15);border:1px solid rgba(139,92,246,.3)">✨ Powered by AI</div>',
      '</div>',
    '</div>',
    // Tabs
    '<div class="ai-tabs">',
      '<button class="ai-tab on"  onclick="aiTab(\'alerts\',this)">🚨 Alerts</button>',
      '<button class="ai-tab"     onclick="aiTab(\'savings\',this)">💰 Savings Tips</button>',
      '<button class="ai-tab"     onclick="aiTab(\'goals\',this)">🎯 Goals</button>',
      '<button class="ai-tab"     onclick="aiTab(\'score\',this)">📊 Health Score</button>',
      '<button class="ai-tab"     onclick="aiTab(\'predict\',this)">🔮 Predictions</button>',
    '</div>',
    // Tab panels
    buildAlertsTab(),
    '<div id="aitab-savings"  style="display:none">' + buildSavingsTab()  + '</div>',
    '<div id="aitab-goals"    style="display:none">' + buildGoalsTab()    + '</div>',
    '<div id="aitab-score"    style="display:none">' + buildScoreTab()    + '</div>',
    '<div id="aitab-predict"  style="display:none">' + buildPredictTab()  + '</div>',
    // Chat panel
    '<div id="ai-chat-panel" style="display:none;margin-top:16px">',
      '<div class="card">',
        '<div class="ch"><span class="ct" style="color:#c4b5fd">🤖 AI Response</span>',
          '<button class="btn btn-ghost" style="font-size:11px;padding:4px 8px" onclick="document.getElementById(\'ai-chat-panel\').style.display=\'none\'">✕ Close</button>',
        '</div>',
        '<div id="ai-chat-content" style="font-size:13px;color:var(--text2);line-height:1.7;min-height:60px"></div>',
      '</div>',
    '</div>',
  ].join('');
}

/* ---- Tab builders ---- */
function aiCard(iconClass, icon, title, pill, pillClass, desc, btnLabel, question) {
  return '<div class="aicard">' +
    '<div class="aico ' + iconClass + '">' + icon + '</div>' +
    '<div><div class="aititle">' + title + (pill ? '<span class="pill ' + pillClass + '">' + pill + '</span>' : '') + '</div>' +
    '<div class="aidesc">' + desc + '</div>' +
    '<div class="aiact"><button onclick="showAIChat(\'' + question.replace(/'/g,"\\'") + '\')">' + btnLabel + ' →</button></div>' +
    '</div></div>';
}

function buildAlertsTab() {
  return '<div id="aitab-alerts">' +
    aiCard('warn','⚠️','Food budget at 88%','Warning','pill-warn',
      'You\'ve spent $352 of your $400 food budget with 3 days left. Consider cooking at home this weekend.',
      'Get tips','How can I reduce my food spending this month with quick practical tips?') +
    aiCard('info','🔄','3 recurring subscriptions detected','Info','pill-info',
      'Netflix ($15), Gym ($45), and Amazon Prime ($14) total $74/month. Review if all are actively used.',
      'Audit subscriptions','Help me audit my subscriptions and decide which to cut to save money.') +
    aiCard('good','📈','Savings rate improved to 40%','Great','pill-good',
      'You exceeded your 35% savings goal. At this rate you\'ll add ~$30,720 to savings over 12 months.',
      'Invest surplus','What should I do with my extra monthly savings of $2580?') +
    aiCard('bad','💳','Credit card balance growing','Action needed','pill-bad',
      'Chase Sapphire balance is $3,280. At 24% APR you pay ~$65/month interest. A payoff plan saves $780/year.',
      'Make payoff plan','Create a step-by-step debt payoff plan for my $3280 credit card balance.') +
    aiCard('warn','🚗','Car loan refinancing opportunity','Review','pill-warn',
      'Rates have dropped since your $12,500 car loan originated. Refinancing could reduce monthly payment by $60-80.',
      'Learn more','How do I refinance a car loan and what are the steps?') +
  '</div>';
}

function buildSavingsTab() {
  return aiCard('good','🏦','Move savings to a high-yield account','','',
    'Your $22,800 earns ~0.5% APY. Moving to a HYSA at 4.8% APY earns an extra <strong class="green">$987/year</strong> effortlessly.',
    'Compare accounts','What are the best high-yield savings accounts available right now?') +
  aiCard('info','🍽️','Optimize dining — save up to $120/month','','',
    'Your restaurant average is $65/visit. Cutting from 4 to 2 visits/week saves ~$130/month without big lifestyle changes.',
    'Meal plan ideas','Give me a simple meal prep plan to cut my food costs by $100 per month.') +
  aiCard('good','📈','Start investing your monthly surplus','','',
    'You have ~$2,580 surplus/month. Investing $1,000/month in index funds at 8% avg return = <strong class="green">$185,000</strong> in 10 years.',
    'Start investing','How should a beginner start investing $1000 per month in index funds?') +
  aiCard('warn','⚡','Max out your 401k contributions','','',
    'Increasing your 401k by 3% ($192/month) saves ~$45 in taxes now and adds $180k+ to retirement by age 65.',
    'Calculate mine','How do I calculate the ideal 401k contribution for my income and age?');
}

function buildGoalsTab() {
  var goalRows = [
    ['Emergency fund',   76, 'var(--success)', 'green'],
    ['Debt payoff',      38, 'var(--warn)',    'amber'],
    ['Retirement (65)',  22, 'var(--accent)',  'blue'],
    ['Home down payment',14, 'var(--danger)',  'red'],
    ['Education fund',    8, 'var(--purple)',  'purple'],
  ];
  var bars = goalRows.map(function (r) {
    return '<div class="gr-row"><div class="gr-label">' + r[0] + '</div>' +
      '<div class="gr-track"><div class="gr-fill" style="width:' + r[1] + '%;background:' + r[2] + '"></div></div>' +
      '<div class="gr-val ' + r[3] + '">' + r[1] + '%</div></div>';
  }).join('');

  return '<div class="card mb14"><div class="ch"><span class="ct">Goal Progress Tracker</span></div>' + bars + '</div>' +
    aiCard('good','🛡️','Emergency fund: almost there!','','',
      'You have $22,800 saved. A 6-month emergency cushion is $22,920 — just $120 away. Top it off this month!',
      'What\'s next','I am close to completing my emergency fund. What should I prioritize next?') +
    aiCard('info','🏠','Home down payment: set a target','','',
      'Based on your $2,580 monthly surplus, you can save a 20% down payment (~$60k) on a $300k home in ~2.5 years.',
      'Plan it','Create a detailed savings plan for a $60000 home down payment in 2.5 years.') +
    aiCard('warn','⏰','Retire on time: action needed','','',
      'At your current rate you are behind by ~$42,000 vs recommended milestones for your age group.',
      'Catch-up plan','I am behind on retirement savings. What is the fastest way to catch up?');
}

function buildScoreTab() {
  var grades = [
    ['Savings rate (40%)', 90, 'var(--success)', 'green', 'A'],
    ['Debt-to-income',     60, 'var(--warn)',    'amber', 'C+'],
    ['Emergency fund',     85, 'var(--success)', 'green', 'B+'],
    ['Budget adherence',   55, 'var(--warn)',    'amber', 'C'],
    ['Retirement progress',28, 'var(--danger)',  'red',   'D'],
  ];
  var gradeRows = grades.map(function (g) {
    return '<div class="gr-row">' +
      '<div class="gr-label" style="width:140px">' + g[0] + '</div>' +
      '<div class="gr-track"><div class="gr-fill" style="width:' + g[1] + '%;background:' + g[2] + '"></div></div>' +
      '<div class="gr-val ' + g[3] + '" style="font-weight:700">' + g[4] + '</div></div>';
  }).join('');

  return '<div class="card mb14">' +
    '<div style="text-align:center;padding:14px 0 10px">' +
      '<div class="ai-score-num">72</div>' +
      '<div class="ai-score-sub">Financial Health Score</div>' +
      '<div class="ai-sbar"><div class="ai-sbar-fill" style="width:72%"></div></div>' +
      '<div style="font-size:11px;color:var(--text3);margin-top:5px">Good · Room to improve</div>' +
    '</div></div>' +
    '<div class="card mb14"><div class="ch"><span class="ct">Score Breakdown</span></div>' + gradeRows + '</div>' +
    aiCard('ai','🤖','How to reach score 90+','','',
      'Focus on 3 things: (1) pay off credit card, (2) increase retirement contributions by 3%, (3) stick to food budget for 3 months. This pushes your score to ~88.',
      'Get 90-day plan','Give me a 90-day action plan to improve my financial health score from 72 to 90.');
}

function buildPredictTab() {
  return '<div class="grid-2 mb14">' +
    '<div class="card"><div class="ch"><span class="ct">Net Worth in 12 Months</span></div><div class="cv green">$65,820</div><div style="font-size:11px;color:var(--text2)">Based on current savings rate</div></div>' +
    '<div class="card"><div class="ch"><span class="ct">Projected Annual Savings</span></div><div class="cv blue">$30,720</div><div style="font-size:11px;color:var(--text2)">At $2,560/month average</div></div>' +
  '</div>' +
  '<div class="grid-2 mb14">' +
    '<div class="card"><div class="ch"><span class="ct">Credit Card Free By</span></div><div class="cv amber">Aug 2025</div><div style="font-size:11px;color:var(--text2)">Paying $500/month</div></div>' +
    '<div class="card"><div class="ch"><span class="ct">Emergency Fund Complete</span></div><div class="cv green">June 2025</div><div style="font-size:11px;color:var(--text2)">Just $120 remaining</div></div>' +
  '</div>' +
  aiCard('ai','🔮','Best-case scenario: +$6,200 net worth boost','','',
    'Pay off credit card (+$780), move savings to HYSA (+$987), invest $500/month extra → net worth reaches <strong class="green">$72,050</strong> in 12 months instead of $65,820.',
    'Build optimal plan','Show me a detailed financial plan to maximize my net worth growth over the next year.') +
  aiCard('info','📅','Home ownership timeline','','',
    'At current pace you\'ll have a 20% down payment for a $300k home by <strong>Dec 2027</strong>. Saving $300/month extra shortens this to <strong class="green">Mar 2027</strong> — 9 months earlier.',
    'Speed it up','How can I shorten my home buying timeline by saving more aggressively?');
}

/* ---- Tab switching ---- */
function aiTab(id, btn) {
  ['alerts','savings','goals','score','predict'].forEach(function (t) {
    var el = document.getElementById('aitab-' + t);
    if (el) el.style.display = 'none';
  });
  var target = document.getElementById('aitab-' + id);
  if (target) target.style.display = 'block';
  document.querySelectorAll('.ai-tab').forEach(function (b) { b.classList.remove('on'); });
  if (btn) btn.classList.add('on');
  document.getElementById('ai-chat-panel').style.display = 'none';
}

/* ---- AI Chat ---- */
function showAIChat(question) {
  var panel   = document.getElementById('ai-chat-panel');
  var content = document.getElementById('ai-chat-content');
  panel.style.display = 'block';
  content.innerHTML = '<div style="color:var(--text3);font-style:italic">Analyzing your financial data...</div>';
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  setTimeout(function () {
    var ans = AI_RESPONSES[AI_IDX % AI_RESPONSES.length];
    AI_IDX++;
    content.innerHTML =
      '<div style="font-size:11px;color:var(--purple);margin-bottom:8px;font-weight:500">📋 Re: ' + question + '</div>' +
      '<div style="color:var(--text2);line-height:1.7">' + ans + '</div>' +
      '<div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border);font-size:11px;color:var(--text3)">💡 This advice is based on your transaction data. For personalized planning, consult a certified financial advisor.</div>';
  }, 1200);
}
