const testData = {
  urls: {
    homepage: 'https://dickssportinggoods.dksxchange.com/',
    scorecardPage: 'https://dickssportinggoods.dksxchange.com/scorecard'
  },
  credentials: {
    validEmail: 'testuser@example.com',
    validPassword: 'TestPassword123!'
  },
  featureFlags: {
    promoExpirationDateEnabled: false
  },
  viewport: {
    desktop1920x1080: { width: 1920, height: 1080 }
  },
  expectedText: {
    scorecardHeading: 'Score the Right Membership for You'
  }
};

module.exports = testData;