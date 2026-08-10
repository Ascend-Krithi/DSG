const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-001] Scorecard Ultra-Wide Resolution Tests', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize({ width: 2560, height: 1440 });
    await scorecardPage.goto();
  });

  test('[QS-181][TC-003] Verify tiles display correctly on desktop with ultra-wide resolution (2560x1440)', async ({ page }) => {
    const scorecardLogo = page.getByAltText('ScoreCard Logo Light None').nth(1);
    const scorecardPlusLogo = page.getByAltText('ScoreCard Plus New Logo');
    
    await expect(scorecardLogo).toBeVisible();
    await expect(scorecardPlusLogo).toBeVisible();

    // Verify tiles are properly centered horizontally
    const scorecardLogoBox = await scorecardLogo.boundingBox();
    const scorecardPlusLogoBox = await scorecardPlusLogo.boundingBox();
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    
    expect(scorecardLogoBox).not.toBeNull();
    expect(scorecardPlusLogoBox).not.toBeNull();
    
    const tilesCenter = (scorecardLogoBox.x + scorecardPlusLogoBox.x + scorecardPlusLogoBox.width) / 2;
    const viewportCenter = viewportWidth / 2;
    const centerTolerance = 200;
    
    expect(Math.abs(tilesCenter - viewportCenter)).toBeLessThan(centerTolerance);

    // Verify tile sizing is appropriate (not excessively stretched)
    const tileWidth = scorecardPlusLogoBox.x + scorecardPlusLogoBox.width - scorecardLogoBox.x;
    expect(tileWidth).toBeLessThan(viewportWidth * 0.8);

    // Verify spacing between tiles is proportional
    const spacing = scorecardPlusLogoBox.x - (scorecardLogoBox.x + scorecardLogoBox.width);
    expect(spacing).toBeGreaterThan(0);

    // Verify all content remains readable
    const scorecardPointsText = page.getByText('Earn 1 Point for every $1 spent', { exact: false });
    const scorecardRewardText = page.getByText('300 Points = $10 Reward', { exact: false });
    const scorecardPlusPrice = page.getByText('$99 Annual Membership', { exact: false });
    const scorecardPlusBenefits = page.getByText("That's $350 in Benefits", { exact: false });
    
    await expect(scorecardPointsText).toBeVisible();
    await expect(scorecardRewardText).toBeVisible();
    await expect(scorecardPlusPrice).toBeVisible();
    await expect(scorecardPlusBenefits).toBeVisible();
  });
});