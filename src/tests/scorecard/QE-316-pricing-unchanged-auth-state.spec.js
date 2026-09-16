const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-316] Verify membership pricing remains unchanged regardless of authentication state', () => {
  test('[QE-316][AC7] Verify pricing unchanged in guest and authenticated states', async ({ page }) => {
    const scorecardPage = new ScorecardPage(page);
    let guestPricing;

    await test.step('Access Scorecard marketing page as guest user', async () => {
      await page.context().clearCookies();
      await scorecardPage.goto();
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Verify pricing information on Scorecard+ tile in guest state', async () => {
      guestPricing = await scorecardPage.getScorecardPlusPriceText();
      expect(guestPricing).toMatch(/\$99 annual membership\./i);
    });

    await test.step('Sign in with valid user credentials', async () => {
      await scorecardPage.signInUser();
    });

    await test.step('Navigate to Scorecard marketing page as authenticated user', async () => {
      await scorecardPage.goto();
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Verify pricing information on Scorecard+ tile in authenticated state', async () => {
      const authPricing = await scorecardPage.getScorecardPlusPriceText();
      expect(authPricing).toMatch(/\$99 annual membership\./i);
    });

    await test.step('Compare pricing information between guest and authenticated states', async () => {
      const authPricing = await scorecardPage.getScorecardPlusPriceText();
      expect(authPricing).toBe(guestPricing);
    });
  });
});