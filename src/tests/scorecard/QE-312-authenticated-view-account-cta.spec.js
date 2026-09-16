const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-312] Verify View Account button is displayed and clickable on Scorecard+ tile for authenticated user', () => {
  test('[QE-312][AC5] Verify View Account button on Scorecard+ tile for authenticated user', async ({ page }) => {
    const scorecardPage = new ScorecardPage(page);

    await test.step('Sign in with valid user credentials', async () => {
      await scorecardPage.goto();
      await scorecardPage.signInUser();
    });

    await test.step('Navigate to the Scorecard marketing page', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/ScoreCard/i);
    });

    await test.step('Locate the Scorecard+ tile in the comparison section', async () => {
      await scorecardPage.waitForComparisonSection();
      await expect(page.locator('.header-tile--scorecard-plus').first()).toBeVisible();
    });

    await test.step('Verify View Account button is displayed on the Scorecard+ tile', async () => {
      const viewAccountBtn = page.locator('.header-tile--scorecard-plus').locator('button, a').filter({ hasText: /view account/i }).first();
      await expect(viewAccountBtn).toBeVisible();
    });

    await test.step('Verify button is clickable', async () => {
      const viewAccountBtn = page.locator('.header-tile--scorecard-plus').locator('button, a').filter({ hasText: /view account/i }).first();
      await expect(viewAccountBtn).toBeEnabled();
    });

    await test.step('Click the View Account button', async () => {
      const viewAccountBtn = page.locator('.header-tile--scorecard-plus').locator('button, a').filter({ hasText: /view account/i }).first();
      await viewAccountBtn.click();
      await page.waitForLoadState('domcontentloaded', { timeout: 30000 });
    });
  });
});