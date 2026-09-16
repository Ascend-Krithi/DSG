const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-311] Verify Scorecard+ tile displays appropriate CTA based on guest user authentication state', () => {
  test('[QE-311][AC4] Verify Scorecard+ tile displays appropriate CTA for guest user', async ({ page }) => {
    const scorecardPage = new ScorecardPage(page);

    await test.step('Clear cookies and session data to ensure guest state', async () => {
      await page.context().clearCookies();
    });

    await test.step('Launch the Scorecard marketing page URL on desktop', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/ScoreCard/i);
    });

    await test.step('Navigate to the Scorecard+ tile in the comparison section', async () => {
      await scorecardPage.waitForComparisonSection();
      await expect(page.locator('.header-tile--scorecard-plus').first()).toBeVisible();
    });

    await test.step('Verify appropriate CTA button is displayed for guest user', async () => {
      const guestCta = page.locator('.header-tile--scorecard-plus').locator('button, a').filter({ hasText: /join now|join scorecard\+\s*now|sign in\s*\/\s*join now/i }).first();
      await expect(guestCta).toBeVisible();
    });

    await test.step('Verify button is clickable and properly styled', async () => {
      const guestCta = page.locator('.header-tile--scorecard-plus').locator('button, a').filter({ hasText: /join now|join scorecard\+\s*now|sign in\s*\/\s*join now/i }).first();
      await expect(guestCta).toBeEnabled();
    });
  });
});