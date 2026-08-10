const TD = {
  urls: {
    marketingPage: 'https://scorecard.marketing.page',
    signInPage: 'https://auth.portal.com/signin',
    accountSummary: 'https://account.portal.com/summary'
  },

  urlPatterns: {
    marketingPage: /scorecard\.marketing\.page/,
    signInPage: /auth\.portal\.com\/signin/,
    accountSummary: /account\.portal\.com\/summary/
  },

  resolutions: {
    desktop: { width: 1920, height: 1080 },
    desktopMin: { width: 1366, height: 768 },
    desktop4K: { width: 3840, height: 2160 },
    iphone8: { width: 375, height: 667 },
    ipad: { width: 768, height: 1024 },
    ipadLandscape: { width: 1024, height: 768 },
    android: { width: 360, height: 640 }
  },

  credentials: {
    validUser: {
      username: 'testuser@scorecard.com',
      password: 'SecurePass123!'
    },
    invalidUser: {
      username: 'invalid@test.com',
      password: 'WrongPass123!'
    }
  },

  content: {
    sectionHeading: 'Score the Right Membership for You',
    pointsEarning: '1 Point Per Every $1 Spent',
    rewardsRedemption: '300 Points = $10 Reward',
    annualMembership: '$99 Annual Membership',
    benefitsValue: "That's $350 in Benefits!",
    benefitsValueInitial: '$350',
    benefitsValueUpdated: '$400'
  },

  buttons: {
    signInJoinNow: 'Sign In / Join Now',
    viewAccount: 'View Account',
    joinNow: 'Join Now',
    signIn: 'Sign In'
  },

  errors: {
    invalidCredentials: 'Invalid username or password',
    sessionExpired: 'Your session has expired. Please sign in again.'
  },

  browsers: {
    chrome: 'chromium',
    firefox: 'firefox',
    edge: 'chromium',
    safari: 'webkit'
  }
};

module.exports = TD;