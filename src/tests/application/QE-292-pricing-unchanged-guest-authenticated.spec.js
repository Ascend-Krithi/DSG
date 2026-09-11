const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const AuthPage = require('../../pages/auth.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-1][AC7] Membership Pricing Unchanged Across States', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;
  let authPage;
  let guestPricingText;

  test('[QE-292] Verify membership pricing remains unchanged across guest and authenticated states', async ({ page }) => {
    scorecardPage = new ScorecardMarketingPage(page);
    authPage = new AuthPage(page);

    await test.step('Navigate to Scorecard marketing page as guest user', async () => {
      await scorecardPage.goto();
    });

    await test.step('Capture membership pricing text in guest state', async () => {
      guestPricingText = await scorecardPage.getPricingText();
      expect(guestPricingText).toContain(TD.SCORECARD_PLUS_PRICING);
    });

    await test.step('Authenticate user with valid credentials', async () => {
      await authPage.authenticate(TD.TEST_USER_EMAIL, TD.TEST_USER_PASSWORD);
    });

    await test.step('Navigate to Scorecard marketing page as authenticated user', async () => {
      await scorecardPage.goto();
    });

    await test.step('Verify membership pricing text remains unchanged in authenticated state', async () => {
      const authPricingText = await scorecardPage.getPricingText();
      expect(authPricingText).toContain(TD.SCORECARD_PLUS_PRICING);
      expect(authPricingText).toBe(guestPricingText);
    });
  });
});