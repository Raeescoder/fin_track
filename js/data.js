/* ============================================
   data.js — Application State & Mock Data
   FinTrack AI Finance Suite
   ============================================ */

var AppState = {
  isPro: false,
  currentPage: 'dashboard',

  transactions: [
    {id:1, desc:'Salary',           amount:4200, type:'Income',  cat:'Salary',        date:'2025-05-01', acc:'Checking'},
    {id:2, desc:'Rent Payment',     amount:1200, type:'Expense', cat:'Housing',        date:'2025-05-02', acc:'Checking'},
    {id:3, desc:'Grocery Store',    amount:87,   type:'Expense', cat:'Food & Dining',  date:'2025-05-05', acc:'Checking'},
    {id:4, desc:'Freelance Project',amount:1400, type:'Income',  cat:'Freelance',      date:'2025-05-08', acc:'Savings'},
    {id:5, desc:'Netflix',          amount:15,   type:'Expense', cat:'Shopping',       date:'2025-05-10', acc:'Credit Card'},
    {id:6, desc:'Restaurant',       amount:65,   type:'Expense', cat:'Food & Dining',  date:'2025-05-12', acc:'Credit Card'},
    {id:7, desc:'Gas Station',      amount:55,   type:'Expense', cat:'Transport',      date:'2025-05-14', acc:'Checking'},
    {id:8, desc:'Doctor Visit',     amount:120,  type:'Expense', cat:'Healthcare',     date:'2025-05-18', acc:'Checking'},
    {id:9, desc:'Amazon',           amount:145,  type:'Expense', cat:'Shopping',       date:'2025-05-20', acc:'Credit Card'},
    {id:10,desc:'Gym Membership',   amount:45,   type:'Expense', cat:'Healthcare',     date:'2025-05-22', acc:'Checking'},
  ],

  budgets: [
    {cat:'Food & Dining', limit:400,  spent:352, color:'var(--accent)'},
    {cat:'Housing',       limit:1400, spent:1200,color:'var(--success)'},
    {cat:'Transport',     limit:200,  spent:55,  color:'var(--warn)'},
    {cat:'Shopping',      limit:300,  spent:160, color:'var(--purple)'},
    {cat:'Healthcare',    limit:200,  spent:165, color:'var(--danger)'},
  ],

  accounts: [
    {name:'Chase Checking',    type:'Checking',    balance:8240,   icon:'🏦'},
    {name:'High-Yield Savings',type:'Savings',     balance:22800,  icon:'💰'},
    {name:'Chase Sapphire',    type:'Credit Card', balance:-3280,  icon:'💳'},
    {name:'Vanguard 401k',     type:'Investment',  balance:18200,  icon:'📈'},
    {name:'Car Loan',          type:'Loan',        balance:-12500, icon:'🚗'},
  ],

  adminUsers: [
    {name:'Alice Johnson', email:'alice@mail.com', plan:'Pro',  joined:'Jan 2025', status:'Active'},
    {name:'Bob Smith',     email:'bob@mail.com',   plan:'Free', joined:'Feb 2025', status:'Active'},
    {name:'Carol White',   email:'carol@mail.com', plan:'Pro',  joined:'Mar 2025', status:'Active'},
    {name:'David Brown',   email:'david@mail.com', plan:'Free', joined:'Apr 2025', status:'Suspended'},
    {name:'Eva Martinez',  email:'eva@mail.com',   plan:'Pro',  joined:'May 2025', status:'Active'},
  ],

  adminPayments: [
    {user:'Alice Johnson', plan:'Pro Monthly', amount:'$19.99', date:'May 28'},
    {user:'Carol White',   plan:'Pro Monthly', amount:'$19.99', date:'May 27'},
    {user:'Eva Martinez',  plan:'Pro Monthly', amount:'$19.99', date:'May 25'},
    {user:'Frank Lee',     plan:'Pro Monthly', amount:'$19.99', date:'May 22'},
    {user:'Grace Kim',     plan:'Pro Monthly', amount:'$19.99', date:'May 20'},
  ],
};

// Category icon map
var CAT_ICONS = {
  'Food & Dining': '🍔',
  'Housing':       '🏠',
  'Transport':     '🚗',
  'Shopping':      '🛍️',
  'Healthcare':    '💊',
  'Salary':        '💼',
  'Freelance':     '💻',
  'Income':        '💵',
  'Entertainment': '🎬',
};

// AI canned responses (rotated on each question)
var AI_RESPONSES = [
  "Based on your current spending patterns: Your strongest habit is maintaining a <strong>40% savings rate</strong> — most advisors recommend 20%, so you're doubling best practice. Focus next on eliminating the $3,280 credit card balance — at $500/month you'll be debt-free in 7 months, saving $780 in interest.",
  "Looking at your data, the two areas dragging your health score down are <strong>retirement contributions (D grade)</strong> and <strong>debt-to-income ratio (C+)</strong>. Addressing these two items alone could push your score from 72 to 85+ within 6 months.",
  "With your $2,580 monthly surplus I recommend: <strong>40% ($1,032) to investments</strong>, 30% ($774) to debt payoff, 20% ($516) to down-payment fund, 10% ($258) discretionary buffer. This balanced approach grows net worth while eliminating debt simultaneously.",
  "Your food budget is at 88% with 3 days left. Quick wins: batch cook on Sunday (saves ~2 restaurant visits = $130), use grocery pickup to avoid impulse buys (~$40 savings), and pause the meal-delivery apps for the rest of the month.",
];
var AI_IDX = 0;
