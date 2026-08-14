const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC9] Section heading displayed above tiles', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-402][TC-031] Verify section heading \'Score the Right Membership for You\' is displayed', async ({ page }) => {
    await page.setViewportSize(TD.DESKTOP_VIEWPORT);
    
    scorecardPage = new ScorecardMarketingPage(page);
    
    // Navigate to Scorecard marketing page on desktop
    await scorecardPage.goto();
    await expect(page).toHaveURL(/scorecard/);
    
    // Verify comparison section is visible
    const isScorecardVisible = await scorecardPage.isScorecardTileVisible();
    const isScorecardPlusVisible = await scorecardPage.isScorecardPlusTileVisible();
    expect(isScorecardVisible).toBeTruthy();
    expect(isScorecardPlusVisible).toBeTruthy();
    
    // Verify section heading is displayed above comparison tiles
    const isHeadingVisible = await scorecardPage.isSectionHeadingVisible();
    expect(isHeadingVisible).toBeTruthy();
    
    const headingText = await scorecardPage.getSectionHeadingText();
    expect(headingText).toContain(TD.SECTION_HEADING);
  });
});