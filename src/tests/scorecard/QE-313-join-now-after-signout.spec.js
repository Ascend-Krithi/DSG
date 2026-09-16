const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');
const loc = require('../../locators/scorecard.locators');

test.describe('[QE-313] Verify Join Now button is displayed after user signs out and returns to Scorecard marketing page', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
  });

  test('[QE-1][AC6] Verify Join Now button after sign out', async ({ page, context }) => {
    await test.step('Sign in with valid user credentials', async () => {
      await scorecardPage.goto();
      const unavailable = await scorecardPage.isUnavailablePageVisible();
      if (unavailable) {
        test.skip('Site is currently unavailable');
      }
      await scorecardPage.signInUser();
    });

    await test.step('Navigate to the Scorecard marketing page while authenticated', async () => {
      await scorecardPage.goto();
      await scorecardPage.waitForComparisonSection();
      const viewAccountVisible = await loc.viewAccountScorecardTile(page).isVisible().catch(() => false);
      expect(viewAccountVisible).toBeTruthy();
    });

    await test.step('Sign out from the application', async () => {
      await context.clearCookies();
      await page.evaluate(() => {
        sessionStorage.clear();
        localStorage.clear();
      });
    });

    await test.step('Navigate back to the Scorecard marketing page', async () => {
      await scorecardPage.goto();
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Verify Join Now button is displayed on Scorecard tile', async () => {
      const scorecardGuestCta = loc.scorecardGuestCta(page);
      await expect(scorecardGuestCta).toBeVisible();
      const ctaText = await scorecardGuestCta.textContent();
      expect(ctaText).toMatch(/join now|sign in\s*\/\s*join now/i);
    });

    await test.step('Verify Join Now button is displayed on Scorecard+ tile', async () => {
      const scorecardPlusGuestCta = loc.scorecardPlusGuestCta(page);
      await expect(scorecardPlusGuestCta).toBeVisible();
      const ctaText = await scorecardPlusGuestCta.textContent();
      expect(ctaText).toMatch(/join now/i);
    });
  });
});