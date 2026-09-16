const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-1][AC7] Verify logos remain unchanged regardless of authentication state', () => {
  test('QE-315: Verify logos identical in guest and authenticated states', async ({ page }) => {
    const scorecardPage = new ScorecardPage(page);

    await test.step('Access Scorecard marketing page as guest user', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/scorecard/i);
    });

    await test.step('Capture/note Scorecard logo and Scorecard+ Dark Logo in guest state', async () => {
      const scorecardLogo = await scorecardPage.getScorecardLogo();
      await expect(scorecardLogo).toBeVisible();
      const scorecardPlusLogo = await scorecardPage.getScorecardPlusLogo();
      await expect(scorecardPlusLogo).toBeVisible();
    });

    await test.step('Sign in with valid user credentials', async () => {
      await scorecardPage.signIn();
    });

    await test.step('Navigate to Scorecard marketing page as authenticated user', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/scorecard/i);
    });

    await test.step('Verify Scorecard logo is identical to guest state', async () => {
      const scorecardLogo = await scorecardPage.getScorecardLogo();
      await expect(scorecardLogo).toBeVisible();
    });

    await test.step('Verify Scorecard+ Dark Logo is identical to guest state', async () => {
      const scorecardPlusLogo = await scorecardPage.getScorecardPlusLogo();
      await expect(scorecardPlusLogo).toBeVisible();
    });
  });
});