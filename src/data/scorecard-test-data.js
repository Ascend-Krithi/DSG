const TD = {
  urls: {
    scorecardMarketing: process.env.SCORECARD_MARKETING_URL || 'https://example.com/scorecard',
    signIn: process.env.SIGNIN_URL || 'https://example.com/signin',
    mauiAccountSummary: process.env.MAUI_ACCOUNT_URL || 'https://example.com/account-summary',
    joinNow: process.env.JOIN_URL || 'https://example.com/join'
  },

  urlPatterns: {
    scorecardMarketing: /scorecard/i,
    signIn: /sign-?in/i,
    mauiAccountSummary: /account.*summary/i,
    joinNow: /join/i
  },

  viewportSizes: {
    desktop1920: { width: 1920, height: 1080 },
    desktopMin: { width: 1024, height: 768 },
    ultraWide: { width: 2560, height: 1440 },
    iPhoneSE: { width: 375, height: 667 },
    iPadPortrait: { width: 768, height: 1024 },
    iPadLandscape: { width: 1024, height: 768 },
    smallMobile: { width: 320, height: 568 }
  },

  credentials: {
    valid: {
      username: process.env.TEST_USERNAME || 'testuser@example.com',
      password: process.env.TEST_PASSWORD || 'Test@123'
    },
    invalid: {
      username: 'wronguser@example.com',
      password: 'WrongPass123'
    }
  },

  scorecardTile: {
    logo: 'Scorecard Logo',
    pointsText: '1 Point Per Every $1 Spent',
    rewardText: '300 Points = $10 Reward',
    signInButtonText: 'Sign In / Join Now',
    viewAccountButtonText: 'View Account'
  },

  scorecardPlusTile: {
    logo: 'Scorecard Plus Logo',
    pricing: '$99 Annual Membership',
    benefitsValue: '$350',
    benefitsText: "That's $350 in Benefits!",
    joinButtonText: 'Join Now',
    viewAccountButtonText: 'View Account'
  },

  sectionHeading: {
    text: 'Score the Right Membership for You'
  },

  errors: {
    invalidCredentials: /invalid.*credentials|incorrect.*username.*password/i
  },

  pageTitles: {
    scorecardMarketing: /scorecard/i,
    signIn: /sign.*in/i,
    accountSummary: /account.*summary/i
  }
};

module.exports = TD;