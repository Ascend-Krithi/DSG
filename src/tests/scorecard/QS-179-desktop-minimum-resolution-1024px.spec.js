const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-001] Scorecard Minimum Desktop Resolution Tests', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize({ width: 1024, height: 768 });
    await scorecardPage.goto();
  });

  test('[QS-179][TC-002] Verify Scorecard and Scorecard+ tiles display correctly on desktop with minimum resolution 1024px', async ({ page }) => {
    // Verify both tiles are fully visible without horizontal scrolling
    const scorecardLogo = page.getByAltText('ScoreCard Logo Light None').nth(1);
    const scorecardPlusLogo = page.getByAltText('ScoreCard Plus New Logo');
    
    await expect(scorecardLogo).toBeVisible();
    await expect(scorecardPlusLogo).toBeVisible();

    // Verify no horizontal scrolling required
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(viewportWidth);

    // Verify all tile content is clearly readable
    const scorecardPointsText = page.getByText('Earn 1 Point for every $1 spent', { exact: false });
    const scorecardRewardText = page.getByText('300 Points = $10 Reward', { exact: false });
    const scorecardPlusPrice = page.getByText('$99 Annual Membership', { exact: false });
    const scorecardPlusBenefits = page.getByText("That's $350 in Benefits", { exact: false });
    
    await expect(scorecardPointsText).toBeVisible();
    await expect(scorecardRewardText).toBeVisible();
    await expect(scorecardPlusPrice).toBeVisible();
    await expect(scorecardPlusBenefits).toBeVisible();

    // Verify tiles maintain side-by-side layout
    const scorecardLogoBox = await scorecardLogo.boundingBox();
    const scorecardPlusLogoBox = await scorecardPlusLogo.boundingBox();
    
    expect(scorecardLogoBox).not.toBeNull();
    expect(scorecardPlusLogoBox).not.toBeNull();
    expect(scorecardLogoBox.x).toBeLessThan(scorecardPlusLogoBox.x);
  });
});