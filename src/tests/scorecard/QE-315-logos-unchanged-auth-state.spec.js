const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-315] Verify logos remain unchanged regardless of authentication state', () => {
  test('[QE-315][AC7] Verify logos unchanged in guest and authenticated states', async ({ page }) => {
    const scorecardPage = new ScorecardPage(page);
    let guestScorecardLogo, guestScorecardPlusLogo;

    await test.step('Access Scorecard marketing page as guest user', async () => {
      await page.context().clearCookies();
      await scorecardPage.goto();
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Capture Scorecard logo and Scorecard+ Dark Logo in guest state', async () => {
      guestScorecardLogo = await scorecardPage.getScorecardLogoAlt();
      guestScorecardPlusLogo = await scorecardPage.getScorecardPlusLogoAlt();
    });

    await test.step('Sign in with valid user credentials', async () => {
      await scorecardPage.signInUser();
    });

    await test.step('Navigate to Scorecard marketing page as authenticated user', async () => {
      await scorecardPage.goto();
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Verify Scorecard logo is identical to guest state', async () => {
      const authScorecardLogo = await scorecardPage.getScorecardLogoAlt();
      expect(authScorecardLogo).toBe(guestScorecardLogo);
    });

    await test.step('Verify Scorecard+ Dark Logo is identical to guest state', async () => {
      const authScorecardPlusLogo = await scorecardPage.getScorecardPlusLogoAlt();
      expect(authScorecardPlusLogo).toBe(guestScorecardPlusLogo);
    });
  });
});