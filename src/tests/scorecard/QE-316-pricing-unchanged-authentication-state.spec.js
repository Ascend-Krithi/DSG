const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-1][AC7] Verify membership pricing remains unchanged regardless of authentication state', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
  });

  test('QE-316: Verify pricing remains unchanged in both authentication states', async ({ page, context }) => {
    let guestPricing;

    await test.step('Access Scorecard marketing page as guest user', async () => {
      await context.clearCookies();
      await context.clearPermissions();
      await scorecardPage.goto();
      const unavailable = await scorecardPage.isUnavailablePageVisible();
      if (unavailable) {
        test.skip('Site is currently unavailable');
      }
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
      const authenticatedPricing = await scorecardPage.getScorecardPlusPriceText();
      expect(authenticatedPricing).toMatch(/\$99 annual membership\./i);
    });

    await test.step('Compare pricing information between guest and authenticated states', async () => {
      const authenticatedPricing = await scorecardPage.getScorecardPlusPriceText();
      expect(authenticatedPricing).toBe(guestPricing);
    });
  });
});