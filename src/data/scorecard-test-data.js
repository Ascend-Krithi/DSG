module.exports = {
  urls: {
    scorecardMarketing: 'https://www.dickssportinggoods.com/ScoreCard',
    signInPattern: /sign-?in/i,
    accountPattern: /account.*summary/i
  },
  viewports: {
    desktop: { width: 1920, height: 1080 },
    desktopMin: { width: 1024, height: 768 },
    mobile: { width: 375, height: 667 },
    mobileMax: { width: 767, height: 1024 }
  },
  credentials: {
    validEmail: process.env.TEST_EMAIL || 'test@example.com',
    validPassword: process.env.TEST_PASSWORD || 'ValidPass123'
  },
  expectedText: {
    sectionHeading: /score the right membership for you/i,
    guestCta: /sign in\s*\/\s*join now/i,
    viewAccountCta: /view account/i,
    scorecardPlusPrice: /\$99 annual membership/i,
    scorecardPlusBenefits: /\$350 in benefits/i
  }
};