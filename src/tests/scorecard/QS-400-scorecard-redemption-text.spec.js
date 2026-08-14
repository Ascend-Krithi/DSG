const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC8] Scorecard tile displays redemption text', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-400][TC-029] Verify Scorecard tile displays \'300 Points = $10 Reward.\' text', async ({ page }) => {
    await page.setViewportSize(TD.DESKTOP_VIEWPORT);
    
    scorecardPage = new ScorecardMarketingPage(page);
    
    // Navigate to Scorecard marketing page on desktop
    await scorecardPage.goto();
    await expect(page).toHaveURL(/scorecard/);
    
    // Verify Scorecard tile is visible
    const isTileVisible = await scorecardPage.isScorecardTileVisible();
    expect(isTileVisible).toBeTruthy();
    
    // Verify redemption text is displayed
    const redemptionText = await scorecardPage.getScorecardRedemptionText();
    expect(redemptionText).toContain('300 Points');
    expect(redemptionText).toContain('$10 Reward');
  });
});