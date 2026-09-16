const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-1][AC8] Verify Scorecard tile displays appropriate CTA based on authentication state', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
  });

  test('QE-320: Verify Scorecard tile CTA changes based on authentication state', async ({ page, context }) => {
    await test.step('Access Scorecard marketing page as guest user', async () => {
      await context.clearCookies();
      await context.clearPermissions();
      await scorecardPage.goto();
      const unavailable = await scorecardPage.isUnavailablePageVisible();
      if (unavailable) {
        test.skip('Site is currently unavailable');
      }
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Verify Sign In / Join Now CTA is displayed on Scorecard tile for guest user', async () => {
      const loc = require('../../locators/scorecard.locators');
      const guestCta = loc.scorecardGuestCta(page);
      await expect(guestCta).toBeVisible({ timeout: 30000 });
      const ctaText = await guestCta.textContent();
      expect(ctaText).toMatch(/sign in\s*\/\s*join now|join now/i);
    });

    await test.step('Sign in with valid user credentials', async () => {
      await scorecardPage.signInUser();
    });

    await test.step('Navigate to Scorecard marketing page as authenticated user', async () => {
      await scorecardPage.goto();
      await scorecardPage.waitForComparisonSection();
    });

    await test.step('Verify View Account CTA is displayed on Scorecard tile for authenticated user', async () => {
      const loc = require('../../locators/scorecard.locators');
      const viewAccountBtn = loc.viewAccountScorecardTile(page);
      await expect(viewAccountBtn).toBeVisible({ timeout: 30000 });
      const btnText = await viewAccountBtn.textContent();
      expect(btnText).toMatch(/view account/i);
    });

    await test.step('Verify CTA changes appropriately based on authentication state', async () => {
      const loc = require('../../locators/scorecard.locators');
      const viewAccountBtn = loc.viewAccountScorecardTile(page);
      await expect(viewAccountBtn).toBeVisible();
      await expect(viewAccountBtn).toBeEnabled();
    });
  });
});