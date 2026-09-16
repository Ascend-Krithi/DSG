const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-1][AC6] Verify Join Now button is displayed after user signs out and returns to Scorecard marketing page', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
  });

  test('QE-313: Verify Join Now button after sign out', async ({ page, context }) => {
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
      const loc = require('../../locators/scorecard.locators');
      const viewAccountBtn = loc.viewAccountScorecardTile(page);
      await expect(viewAccountBtn).toBeVisible({ timeout: 30000 });
    });

    await test.step('Sign out from the application', async () => {
      await context.clearCookies();
      await context.clearPermissions();
    });

    await test.step('Navigate back to the Scorecard marketing page', async () => {
      await scorecardPage.goto();
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Verify Join Now button is displayed on Scorecard tile', async () => {
      const loc = require('../../locators/scorecard.locators');
      const guestCta = loc.scorecardGuestCta(page);
      await expect(guestCta).toBeVisible({ timeout: 30000 });
      const ctaText = await guestCta.textContent();
      expect(ctaText).toMatch(/join now|sign in\s*\/\s*join now/i);
    });

    await test.step('Verify Join Now button is displayed on Scorecard+ tile', async () => {
      const loc = require('../../locators/scorecard.locators');
      const guestCtaPlus = loc.scorecardPlusGuestCta(page);
      await expect(guestCtaPlus).toBeVisible({ timeout: 30000 });
      const ctaTextPlus = await guestCtaPlus.textContent();
      expect(ctaTextPlus).toMatch(/join now/i);
    });
  });
});