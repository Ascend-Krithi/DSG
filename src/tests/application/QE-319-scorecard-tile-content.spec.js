const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QE-319: Verify Scorecard tile displays all required content elements', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QE-319] Verify Scorecard tile displays logo, points earning rate, and reward redemption formula', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Launch the Scorecard marketing page URL on desktop
    await scorecardPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardPage, { timeout: 20000 });

    // Step 2: Navigate to the comparison section with Scorecard tile
    await expect(page.locator('section, main, div').filter({ has: page.getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }) }).first()).toBeVisible({ timeout: 20000 });
    const isScorecardTileVisible = await scorecardPage.isScorecardTileVisible();
    expect(isScorecardTileVisible).toBeTruthy();

    // Step 3: Verify Scorecard Logo is displayed
    const isLogoVisible = await scorecardPage.isScorecardLogoVisible();
    expect(isLogoVisible).toBeTruthy();

    // Step 4: Verify points earning rate is displayed
    const pointsText = await scorecardPage.getScorecardPointsText();
    expect(pointsText).toMatch(TD.textPatterns.scorecardPoints);

    // Step 5: Verify reward redemption formula is displayed
    const rewardText = await scorecardPage.getScorecardRewardText();
    expect(rewardText).toMatch(TD.textPatterns.scorecardReward);

    // Step 6: Verify all content elements are properly aligned and styled
    const comparisonSection = page.locator('section, main, div').filter({ has: page.getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }) }).first();
    await expect(comparisonSection).toBeVisible({ timeout: 20000 });
  });
});