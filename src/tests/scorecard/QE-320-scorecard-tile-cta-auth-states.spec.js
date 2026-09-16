const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-1][AC8] Verify Scorecard tile displays appropriate CTA based on authentication state', () => {
  test('QE-320: Verify Scorecard tile CTA changes based on authentication state', async ({ page }) => {
    const scorecardPage = new ScorecardPage(page);

    await test.step('Access Scorecard marketing page as guest user', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/scorecard/i);
    });

    await test.step('Verify Sign In / Join Now CTA is displayed on Scorecard tile for guest user', async () => {
      const guestCta = await scorecardPage.getScorecardGuestCta();
      await expect(guestCta).toBeVisible();
      await expect(guestCta).toHaveText(/sign in\s*\/\s*join now/i);
    });

    await test.step('Sign in with valid user credentials', async () => {
      await scorecardPage.signIn();
    });

    await test.step('Navigate to Scorecard marketing page as authenticated user', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/scorecard/i);
    });

    await test.step('Verify View Account CTA is displayed on Scorecard tile for authenticated user', async () => {
      const viewAccountCta = await scorecardPage.getViewAccountScorecardTile();
      await expect(viewAccountCta).toBeVisible();
      await expect(viewAccountCta).toHaveText(/view account/i);
    });

    await test.step('Verify CTA changes appropriately based on authentication state', async () => {
      const viewAccountCta = await scorecardPage.getViewAccountScorecardTile();
      await expect(viewAccountCta).toBeVisible();
      await expect(viewAccountCta).toBeEnabled();
    });
  });
});