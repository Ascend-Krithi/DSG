const TD = {
  urls: {
    scorecardPage: 'https://www.dickssportinggoods.com/ScoreCard',
    signIn: 'https://www.dickssportinggoods.com/sign-in',
    accountSummary: 'https://www.dickssportinggoods.com/account-summary'
  },

  urlPatterns: {
    scorecard: /scorecard/i,
    signIn: /sign-?in/i,
    accountSummary: /account.*summary/i
  },

  pageTitles: {
    sectionHeading: /score the right membership for you/i,
    signInHeading: /sign in/i,
    accountSummaryHeading: /account summary|my account/i
  },

  marketing: {
    scorecardPoints: /1 Point For Every \$1 Spent\./i,
    scorecardReward: /300 Points = \$10 Reward\./i,
    scorecardPlusPrice: /\$99 annual membership\./i,
    scorecardPlusBenefits: /that'?s \$350 in benefits!?/i
  },

  logos: {
    scorecardLight: 'ScoreCard Logo Light None',
    scorecardPlusNew: /ScoreCard Plus New Logo/i,
    scorecardPlusLight: /ScoreCard Logo \+ Light None/i
  },

  ctas: {
    guestScorecard: /sign in\s*\/\s*join now/i,
    guestScorecardPlus: /^join now$|join scorecard\+\s*now/i,
    viewAccount: /view account/i
  }
};

module.exports = TD;