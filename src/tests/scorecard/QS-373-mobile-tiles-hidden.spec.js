const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC1] Comparison tiles NOT displayed on mobile', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QS-373][TC-002] Verify comparison tiles are NOT displayed on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize(TD.MOBILE_VIEWPORT);
    
    scorecardPage = new ScorecardMarketingPage(page);
    
    // Navigate to Scorecard marketing page
    await scorecardPage.goto();
    await expect(page).toHaveURL(/scorecard/);
    
    // Verify comparison tiles are not displayed
    const areTilesHidden = await scorecardPage.areComparisonTilesHidden();
    expect(areTilesHidden).toBeTruthy();
  });
});