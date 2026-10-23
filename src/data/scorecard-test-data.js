module.exports = {
  urls: {
    scorecardPage: 'https://www.dickssportinggoods.com/ScoreCard'
  },
  urlPatterns: {
    scorecard: /scorecard/i,
    signIn: /sign-?in/i,
    accountSummary: /account.*summary/i
  },
  pageTitles: {
    scorecard: /Score the Right Membership for You/i
  },
  scorecardText: {
    pointsEarned: '1 Point For Every $1 Spent.',
    rewardValue: '300 Points = $10 Reward.'
  },
  scorecardPlus: {
    price: /\$99 Annual Membership\./i,
    benefits: /\$\d+\s+in\s+Benefits!?/i,
    benefitsText: "That's $350 in Benefits!"
  },
  cta: {
    guest: {
      scorecard: /sign in\s*\/\s*join now/i,
      scorecardPlus: /^join now$/i
    },
    authenticated: {
      viewAccount: /view account/i
    }
  },
  testUsers: {
    validEmail: process.env.TEST_USER_EMAIL || 'testuser@dickssportinggoods.com',
    validPassword: process.env.TEST_USER_PASSWORD || 'ValidPass123!'
  }
};