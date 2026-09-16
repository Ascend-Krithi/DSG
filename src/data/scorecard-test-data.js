const TD = {
  urls: {
    scorecardMarketing: 'https://www.dickssportinggoods.com/ScoreCard'
  },

  urlPatterns: {
    scorecardPage: /scorecard/i,
    signIn: /sign-?in/i,
    accountSummary: /account.*summary/i
  },

  textPatterns: {
    sectionHeading: /score the right membership for you/i,
    scorecardPoints: /1 Point For Every \$1 Spent\./i,
    scorecardReward: /300 Points = \$10 Reward\./i,
    scorecardPlusPrice: /\$99 annual membership\./i,
    scorecardPlusBenefits: /that'?s \$350 in benefits!?/i,
    guestCtaScorecard: /sign in\s*\/\s*join now/i,
    guestCtaScorecardPlus: /join now|join scorecard\+\s*now/i,
    authCta: /view account/i
  },

  altText: {
    scorecardLogo: 'ScoreCard Logo Light None',
    scorecardPlusLogoSummary: /ScoreCard Plus New Logo/i,
    scorecardPlusLogoCard: /ScoreCard Logo \+ Light None/i
  },

  expectedText: {
    sectionHeading: 'Score the Right Membership for You',
    scorecardPoints: '1 Point For Every $1 Spent.',
    scorecardReward: '300 Points = $10 Reward.',
    scorecardPlusPrice: '$99 Annual Membership.',
    scorecardPlusBenefits: "That's $350 in Benefits!",
    guestCtaScorecard: 'Sign In / Join Now',
    guestCtaScorecardPlus: 'Join Now',
    authCta: 'View Account'
  }
};

module.exports = TD;