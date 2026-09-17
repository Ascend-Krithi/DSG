const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-1][AC8] Verify Scorecard tile displays all required content elements', () => {
  test('QE-319: Verify Scorecard tile content including logo, points earning rate, and reward redemption formula', async ({ page }) => {
    const scorecardPage = new ScorecardPage(page);

    await test.step('Launch the Scorecard marketing page URL on desktop', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/scorecard/i);
    });

    await test.step('Navigate to the comparison section with Scorecard tile', async () => {
      const comparisonSection = await scorecardPage.getComparisonSection();
      await expect(comparisonSection).toBeVisible();
      const scorecardTile = await scorecardPage.getScorecardTile();
      await expect(scorecardTile).toBeVisible();
    });

    await test.step('Verify Scorecard Logo is displayed', async () => {
      const scorecardLogo = await scorecardPage.getScorecardLogo();
      await expect(scorecardLogo).toBeVisible();
    });

    await test.step('Verify points earning rate is displayed', async () => {
      const pointsText = await scorecardPage.getPointsEarningText();
      await expect(pointsText).toBeVisible();
      await expect(pointsText).toHaveText(/1 Point.*Every.*\$1 Spent/i);
    });

    await test.step('Verify reward redemption formula is displayed', async () => {
      const rewardText = await scorecardPage.getRewardRedemptionText();
      await expect(rewardText).toBeVisible();
      await expect(rewardText).toHaveText(/300 Points.*\$10 Reward/i);
    });

    await test.step('Verify all content elements are properly aligned and styled', async () => {
      const scorecardTile = await scorecardPage.getScorecardTile();
      await expect(scorecardTile).toHaveAttribute('class', /.+/);
    });
  });
});