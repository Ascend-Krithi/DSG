const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC8] Scorecard tile displays points earning text', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-399][TC-028] Verify Scorecard tile displays \'1 Point Per Every $1 Spent.\' text', async ({ page }) => {
    await page.setViewportSize(TD.DESKTOP_VIEWPORT);
    
    scorecardPage = new ScorecardMarketingPage(page);
    
    // Navigate to Scorecard marketing page on desktop
    await scorecardPage.goto();
    await expect(page).toHaveURL(/scorecard/);
    
    // Verify Scorecard tile is visible
    const isTileVisible = await scorecardPage.isScorecardTileVisible();
    expect(isTileVisible).toBeTruthy();
    
    // Verify points earning text is displayed
    const pointsText = await scorecardPage.getScorecardPointsText();
    expect(pointsText).toContain('1 Point');
    expect(pointsText).toContain('$1 Spent');
  });
});