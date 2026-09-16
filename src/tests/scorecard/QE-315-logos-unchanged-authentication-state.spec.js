const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-1][AC7] Verify logos remain unchanged regardless of authentication state', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
  });

  test('QE-315: Verify logos remain unchanged in both authentication states', async ({ page, context }) => {
    let guestScorecardLogo;
    let guestScorecardPlusLogo;

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

    await test.step('Capture/note Scorecard logo and Scorecard+ Dark Logo in guest state', async () => {
      guestScorecardLogo = await scorecardPage.getScorecardLogoAlt();
      guestScorecardPlusLogo = await scorecardPage.getScorecardPlusLogoAlt();
      expect(guestScorecardLogo).toBeTruthy();
      expect(guestScorecardPlusLogo).toBeTruthy();
    });

    await test.step('Sign in with valid user credentials', async () => {
      await scorecardPage.signInUser();
    });

    await test.step('Navigate to Scorecard marketing page as authenticated user', async () => {
      await scorecardPage.goto();
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Verify Scorecard logo is identical to guest state', async () => {
      const authenticatedScorecardLogo = await scorecardPage.getScorecardLogoAlt();
      expect(authenticatedScorecardLogo).toBe(guestScorecardLogo);
    });

    await test.step('Verify Scorecard+ Dark Logo is identical to guest state', async () => {
      const authenticatedScorecardPlusLogo = await scorecardPage.getScorecardPlusLogoAlt();
      expect(authenticatedScorecardPlusLogo).toBe(guestScorecardPlusLogo);
    });
  });
});