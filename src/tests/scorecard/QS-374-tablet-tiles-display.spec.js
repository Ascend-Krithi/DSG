const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC1] Comparison tiles display at tablet breakpoint', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QS-374][TC-003] Verify comparison tiles display behavior at tablet breakpoint (768px-1023px)', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize(TD.TABLET_VIEWPORT);
    
    scorecardPage = new ScorecardMarketingPage(page);
    
    // Navigate to Scorecard marketing page
    await scorecardPage.goto();
    await expect(page).toHaveURL(/scorecard/);
    
    // Verify comparison tiles display behavior
    const isScorecardVisible = await scorecardPage.isScorecardTileVisible();
    const isScorecardPlusVisible = await scorecardPage.isScorecardPlusTileVisible();
    
    expect(isScorecardVisible || isScorecardPlusVisible).toBeTruthy();
    
    // Verify section heading is displayed
    const isHeadingVisible = await scorecardPage.isSectionHeadingVisible();
    expect(isHeadingVisible).toBeTruthy();
  });
});