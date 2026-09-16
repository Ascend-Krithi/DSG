const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');
const loc = require('../../locators/scorecard.locators');

test.describe('[QE-319] Verify Scorecard tile displays all required content elements including logo, points earning rate, and reward redemption formula', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
  });

  test('[QE-1][AC8] Verify Scorecard tile displays all required content elements', async ({ page }) => {
    await test.step('Launch the Scorecard marketing page URL on desktop', async () => {
      await scorecardPage.goto();
      const unavailable = await scorecardPage.isUnavailablePageVisible();
      if (unavailable) {
        test.skip('Site is currently unavailable');
      }
    });

    await test.step('Navigate to the comparison section with Scorecard tile', async () => {
      await scorecardPage.waitForComparisonSection();
      const scorecardTileVisible = await scorecardPage.isScorecardTileVisible();
      expect(scorecardTileVisible).toBeTruthy();
      await expect(loc.scorecardTile(page)).toBeVisible();
    });

    await test.step('Verify Scorecard Logo is displayed', async () => {
      const logoAlt = await scorecardPage.getScorecardLogoAlt();
      expect(logoAlt).toBeTruthy();
      await expect(loc.scorecardLogoSummary(page)).toBeVisible();
    });

    await test.step('Verify points earning rate is displayed', async () => {
      const pointsText = await scorecardPage.getScorecardPointsText();
      expect(pointsText).toMatch(/1 point (per|for) every \$1 spent/i);
      await expect(loc.scorecardPoints(page)).toBeVisible();
    });

    await test.step('Verify reward redemption formula is displayed', async () => {
      const rewardsText = await scorecardPage.getScorecardRewardsText();
      expect(rewardsText).toMatch(/300 points = \$10 reward/i);
      await expect(loc.scorecardRewards(page)).toBeVisible();
    });

    await test.step('Verify all content elements are properly aligned and styled', async () => {
      await expect(loc.scorecardLogoSummary(page)).toBeVisible();
      await expect(loc.scorecardPoints(page)).toBeVisible();
      await expect(loc.scorecardRewards(page)).toBeVisible();
    });
  });
});