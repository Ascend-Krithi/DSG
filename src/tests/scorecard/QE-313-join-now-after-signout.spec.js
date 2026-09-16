const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-313] Verify Join Now button is displayed after user signs out and returns to Scorecard marketing page', () => {
  test('[QE-313][AC6] Verify Join Now button after sign out', async ({ page }) => {
    const scorecardPage = new ScorecardPage(page);

    await test.step('Sign in with valid user credentials', async () => {
      await scorecardPage.goto();
      await scorecardPage.signInUser();
    });

    await test.step('Navigate to the Scorecard marketing page while authenticated', async () => {
      await scorecardPage.goto();
      await scorecardPage.waitForComparisonSection();
      const viewAccountBtn = page.locator('.header-tile--scorecard-plus').locator('button, a').filter({ hasText: /view account/i }).first();
      await expect(viewAccountBtn).toBeVisible();
    });

    await test.step('Sign out from the application', async () => {
      await page.context().clearCookies();
    });

    await test.step('Navigate back to the Scorecard marketing page', async () => {
      await scorecardPage.goto();
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Verify Join Now button is displayed on Scorecard tile', async () => {
      const scorecardGuestCta = page.locator('.header-tile--scorecard').locator('button, a').filter({ hasText: /sign in\s*\/\s*join now|join now|join scorecard\+\s*now/i }).first();
      await expect(scorecardGuestCta).toBeVisible();
    });

    await test.step('Verify Join Now button is displayed on Scorecard+ tile', async () => {
      const scorecardPlusGuestCta = page.locator('.header-tile--scorecard-plus').locator('button, a').filter({ hasText: /join now|join scorecard\+\s*now|sign in\s*\/\s*join now/i }).first();
      await expect(scorecardPlusGuestCta).toBeVisible();
    });
  });
});