const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const AuthPage = require('../../pages/auth.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-1][AC7] Benefits Messaging Unchanged Across States', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;
  let authPage;
  let guestBenefitsText;

  test('[QE-293] Verify benefits messaging remains unchanged across guest and authenticated states', async ({ page }) => {
    scorecardPage = new ScorecardMarketingPage(page);
    authPage = new AuthPage(page);

    await test.step('Navigate to Scorecard marketing page as guest user', async () => {
      await scorecardPage.goto();
    });

    await test.step('Capture benefits messaging text in guest state', async () => {
      guestBenefitsText = await scorecardPage.getBenefitsText();
      expect(guestBenefitsText).toMatch(TD.BENEFITS_VALUE_PATTERN);
    });

    await test.step('Authenticate user with valid credentials', async () => {
      await authPage.authenticate(TD.TEST_USER_EMAIL, TD.TEST_USER_PASSWORD);
    });

    await test.step('Navigate to Scorecard marketing page as authenticated user', async () => {
      await scorecardPage.goto();
    });

    await test.step('Verify benefits messaging text remains unchanged in authenticated state', async () => {
      const authBenefitsText = await scorecardPage.getBenefitsText();
      expect(authBenefitsText).toMatch(TD.BENEFITS_VALUE_PATTERN);
      expect(authBenefitsText).toBe(guestBenefitsText);
    });
  });
});