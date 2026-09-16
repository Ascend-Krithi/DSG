const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-1][AC4] Verify Scorecard+ tile displays appropriate CTA based on guest user authentication state', () => {
  let scorecardPage;

  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await context.clearPermissions();
    scorecardPage = new ScorecardPage(page);
  });

  test('QE-311: Verify Scorecard+ tile displays appropriate CTA for guest user', async ({ page }) => {
    await test.step('Launch the Scorecard marketing page URL on desktop', async () => {
      await scorecardPage.goto();
      const unavailable = await scorecardPage.isUnavailablePageVisible();
      if (unavailable) {
        test.skip('Site is currently unavailable');
      }
    });

    await test.step('Navigate to the Scorecard+ tile in the comparison section', async () => {
      await scorecardPage.waitForComparisonSection();
      const scorecardPlusTileVisible = await scorecardPage.isScorecardPlusTileVisible();
      expect(scorecardPlusTileVisible).toBeTruthy();
    });

    await test.step('Verify appropriate CTA button is displayed for guest user', async () => {
      const loc = require('../../locators/scorecard.locators');
      const guestCta = loc.scorecardPlusGuestCta(page);
      await expect(guestCta).toBeVisible({ timeout: 30000 });
      const ctaText = await guestCta.textContent();
      expect(ctaText).toMatch(/join now|sign in\s*\/\s*join now/i);
    });

    await test.step('Verify button is clickable and properly styled', async () => {
      const loc = require('../../locators/scorecard.locators');
      const guestCta = loc.scorecardPlusGuestCta(page);
      await expect(guestCta).toBeEnabled();
      await expect(guestCta).toBeVisible();
    });
  });
});