const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-320] Verify Scorecard tile displays appropriate CTA based on authentication state', () => {
  test('[QE-320][AC8] Verify Scorecard tile CTA changes based on authentication state', async ({ page }) => {
    const scorecardPage = new ScorecardPage(page);

    await test.step('Access Scorecard marketing page as guest user', async () => {
      await page.context().clearCookies();
      await scorecardPage.goto();
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Verify Sign In / Join Now CTA is displayed on Scorecard tile for guest user', async () => {
      const guestCta = page.locator('.header-tile--scorecard').locator('button, a').filter({ hasText: /sign in\s*\/\s*join now|join now|join scorecard\+\s*now/i }).first();
      await expect(guestCta).toBeVisible();
    });

    await test.step('Sign in with valid user credentials', async () => {
      await scorecardPage.signInUser();
    });

    await test.step('Navigate to Scorecard marketing page as authenticated user', async () => {
      await scorecardPage.goto();
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Verify View Account CTA is displayed on Scorecard tile for authenticated user', async () => {
      const authCta = page.locator('.header-tile--scorecard').locator('button, a').filter({ hasText: /view account/i }).first();
      await expect(authCta).toBeVisible();
    });

    await test.step('Verify CTA changes appropriately based on authentication state', async () => {
      const authCta = page.locator('.header-tile--scorecard').locator('button, a').filter({ hasText: /view account/i }).first();
      await expect(authCta).toBeVisible();
      const guestCta = page.locator('.header-tile--scorecard').locator('button, a').filter({ hasText: /sign in\s*\/\s*join now|join now|join scorecard\+\s*now/i }).first();
      await expect(guestCta).not.toBeVisible();
    });
  });
});