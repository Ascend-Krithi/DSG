const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');
const loc = require('../../locators/scorecard.locators');

test.describe('[QE-312] Verify View Account button is displayed and clickable on Scorecard+ tile for authenticated user', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
  });

  test('[QE-1][AC5] Verify View Account button on Scorecard+ tile for authenticated user', async ({ page }) => {
    await test.step('Sign in with valid user credentials', async () => {
      await scorecardPage.goto();
      const unavailable = await scorecardPage.isUnavailablePageVisible();
      if (unavailable) {
        test.skip('Site is currently unavailable');
      }
      await scorecardPage.signInUser();
    });

    await test.step('Navigate to the Scorecard marketing page', async () => {
      await scorecardPage.goto();
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Locate the Scorecard+ tile in the comparison section', async () => {
      await scorecardPage.waitForComparisonSection();
      const scorecardPlusTileVisible = await scorecardPage.isScorecardPlusTileVisible();
      expect(scorecardPlusTileVisible).toBeTruthy();
      await expect(loc.scorecardPlusTile(page)).toBeVisible();
    });

    await test.step('Verify View Account button is displayed on the Scorecard+ tile', async () => {
      const viewAccountCta = loc.viewAccountScorecardPlusTile(page);
      await expect(viewAccountCta).toBeVisible();
      const ctaText = await viewAccountCta.textContent();
      expect(ctaText).toMatch(/view account/i);
    });

    await test.step('Verify button is clickable', async () => {
      const viewAccountCta = loc.viewAccountScorecardPlusTile(page);
      await expect(viewAccountCta).toBeEnabled();
    });

    await test.step('Click the View Account button', async () => {
      const viewAccountCta = loc.viewAccountScorecardPlusTile(page);
      await viewAccountCta.click();
      await page.waitForLoadState('domcontentloaded');
    });
  });
});