const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-1][AC6] Verify Join Now button is displayed after user signs out and returns to Scorecard marketing page', () => {
  test('QE-313: Verify Join Now button after sign out', async ({ page }) => {
    const scorecardPage = new ScorecardPage(page);

    await test.step('Sign in with valid user credentials', async () => {
      await scorecardPage.signIn();
    });

    await test.step('Navigate to the Scorecard marketing page while authenticated', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/scorecard/i);
      const viewAccountCta = await scorecardPage.getViewAccountScorecardTile();
      await expect(viewAccountCta).toBeVisible();
    });

    await test.step('Sign out from the application', async () => {
      await scorecardPage.signOut();
    });

    await test.step('Navigate back to the Scorecard marketing page', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/scorecard/i);
    });

    await test.step('Verify Join Now button is displayed on Scorecard tile', async () => {
      const scorecardGuestCta = await scorecardPage.getScorecardGuestCta();
      await expect(scorecardGuestCta).toBeVisible();
      await expect(scorecardGuestCta).toHaveText(/sign in\s*\/\s*join now|join now/i);
    });

    await test.step('Verify Join Now button is displayed on Scorecard+ tile', async () => {
      const scorecardPlusGuestCta = await scorecardPage.getScorecardPlusGuestCta();
      await expect(scorecardPlusGuestCta).toBeVisible();
      await expect(scorecardPlusGuestCta).toHaveText(/join now/i);
    });
  });
});