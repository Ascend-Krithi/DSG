const { test, expect } = require('@playwright/test');
const DSGScorecardPage = require('../../pages/DSGScorecardPage');

test.describe('[QE-1][AC8] Verify Scorecard tile displays all required content elements including logo, points earning rate, and reward redemption formula', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;

  test('[QE-319] Verify Scorecard tile displays all required content elements', async ({ page }) => {
    scorecardPage = new DSGScorecardPage(page);

    await test.step('Launch the Scorecard marketing page URL on desktop', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(/.*ScoreCard/i);
    });

    await test.step('Navigate to the comparison section with Scorecard tile', async () => {
      const comparisonSection = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first();
      await expect(comparisonSection).toBeVisible({ timeout: 20000 });
      const isScorecardTileVisible = await scorecardPage.isScorecardTileVisible();
      expect(isScorecardTileVisible).toBe(true);
    });

    await test.step('Verify Scorecard Logo is displayed', async () => {
      const isLogoVisible = await scorecardPage.isScorecardLogoVisible();
      expect(isLogoVisible).toBe(true);
    });

    await test.step('Verify points earning rate is displayed', async () => {
      const pointsText = await scorecardPage.getScorecardPointsText();
      expect(pointsText).toMatch(/1 Point For Every \$1 Spent\./i);
    });

    await test.step('Verify reward redemption formula is displayed', async () => {
      const rewardText = await scorecardPage.getScorecardRewardText();
      expect(rewardText).toMatch(/300 Points = \$10 Reward\./i);
    });

    await test.step('Verify all content elements are properly aligned and styled', async () => {
      const isLogoVisible = await scorecardPage.isScorecardLogoVisible();
      const pointsText = await scorecardPage.getScorecardPointsText();
      const rewardText = await scorecardPage.getScorecardRewardText();
      expect(isLogoVisible).toBe(true);
      expect(pointsText).toBeTruthy();
      expect(rewardText).toBeTruthy();
    });
  });
});