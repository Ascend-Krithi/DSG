const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-1][AC5] Verify View Account button is displayed and clickable on Scorecard+ tile for authenticated user', () => {
  test('QE-312: Verify View Account button on Scorecard+ tile for authenticated user', async ({ page }) => {
    const scorecardPage = new ScorecardPage(page);

    await test.step('Sign in with valid user credentials', async () => {
      await scorecardPage.signIn();
    });

    await test.step('Navigate to the Scorecard marketing page', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/scorecard/i);
    });

    await test.step('Locate the Scorecard+ tile in the comparison section', async () => {
      const scorecardPlusTile = await scorecardPage.getScorecardPlusTile();
      await expect(scorecardPlusTile).toBeVisible();
    });

    await test.step('Verify View Account button is displayed on the Scorecard+ tile', async () => {
      const viewAccountCta = await scorecardPage.getViewAccountScorecardPlusTile();
      await expect(viewAccountCta).toBeVisible();
      await expect(viewAccountCta).toHaveText(/view account/i);
    });

    await test.step('Verify button is clickable', async () => {
      const viewAccountCta = await scorecardPage.getViewAccountScorecardPlusTile();
      await expect(viewAccountCta).toBeEnabled();
    });

    await test.step('Click the View Account button', async () => {
      await scorecardPage.clickViewAccountScorecardPlus();
      await expect(page).toHaveURL(/account.*summary/i);
    });
  });
});