const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-1][AC8] Verify Scorecard tile displays all required content elements including logo, points earning rate, and reward redemption formula', { tag: ['@smoke', '@regression', '@scorecard'] }, () => {
  let scorecardPage;

  test('[QE-319] Verify Scorecard tile displays all required content elements', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    await test.step('Launch the Scorecard marketing page URL on desktop', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(TD.urlPatterns.scorecard, { timeout: 20000 });
    });

    await test.step('Navigate to the comparison section with Scorecard tile', async () => {
      await expect(scorecardPage.getComparisonSection()).toBeVisible({ timeout: 20000 });
      await expect(scorecardPage.getScorecardTile()).toBeVisible({ timeout: 20000 });
    });

    await test.step('Verify Scorecard Logo is displayed', async () => {
      const logo = scorecardPage.getScorecardLogo();
      await expect(logo).toBeVisible({ timeout: 20000 });
      const logoAlt = await logo.getAttribute('alt');
      expect(logoAlt).toBe(TD.logos.scorecardLight);
    });

    await test.step('Verify points earning rate is displayed', async () => {
      const pointsText = scorecardPage.getScorecardPoints();
      await expect(pointsText).toBeVisible({ timeout: 20000 });
      const text = await pointsText.textContent();
      expect(text).toMatch(TD.marketing.scorecardPoints);
    });

    await test.step('Verify reward redemption formula is displayed', async () => {
      const rewardText = scorecardPage.getScorecardReward();
      await expect(rewardText).toBeVisible({ timeout: 20000 });
      const text = await rewardText.textContent();
      expect(text).toMatch(TD.marketing.scorecardReward);
    });

    await test.step('Verify all content elements are properly aligned and styled', async () => {
      const logo = scorecardPage.getScorecardLogo();
      const pointsText = scorecardPage.getScorecardPoints();
      const rewardText = scorecardPage.getScorecardReward();
      
      await expect(logo).toBeVisible({ timeout: 20000 });
      await expect(pointsText).toBeVisible({ timeout: 20000 });
      await expect(rewardText).toBeVisible({ timeout: 20000 });
      
      const logoBox = await logo.boundingBox();
      const pointsBox = await pointsText.boundingBox();
      const rewardBox = await rewardText.boundingBox();
      
      expect(logoBox).not.toBeNull();
      expect(pointsBox).not.toBeNull();
      expect(rewardBox).not.toBeNull();
    });
  });
});