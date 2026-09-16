const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');
const loc = require('../../locators/scorecard.locators');

test.describe('[QE-311] Verify Scorecard+ tile displays appropriate CTA based on guest user authentication state', () => {
  let scorecardPage;

  test.beforeEach(async ({ page, context }) => {
    scorecardPage = new ScorecardPage(page);
    await context.clearCookies();
    await context.clearPermissions();
  });

  test('[QE-1][AC4] Verify Scorecard+ tile displays appropriate CTA for guest user', async ({ page }) => {
    await test.step('Ensure user is not authenticated', async () => {
      await page.context().clearCookies();
    });

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
      await expect(loc.scorecardPlusTile(page)).toBeVisible();
    });

    await test.step('Verify appropriate CTA button is displayed for guest user', async () => {
      const guestCta = loc.scorecardPlusGuestCta(page);
      await expect(guestCta).toBeVisible();
      const ctaText = await guestCta.textContent();
      expect(ctaText).toMatch(/join now|sign in\s*\/\s*join now/i);
    });

    await test.step('Verify button is clickable and properly styled', async () => {
      const guestCta = loc.scorecardPlusGuestCta(page);
      await expect(guestCta).toBeEnabled();
      await expect(guestCta).toBeVisible();
    });
  });
});