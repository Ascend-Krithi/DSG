const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC8] Scorecard tile displays logo correctly', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-398][TC-027] Verify Scorecard tile displays Scorecard Logo correctly', async ({ page }) => {
    await page.setViewportSize(TD.DESKTOP_VIEWPORT);
    
    scorecardPage = new ScorecardMarketingPage(page);
    
    // Navigate to Scorecard marketing page on desktop
    await scorecardPage.goto();
    await expect(page).toHaveURL(/scorecard/);
    
    // Verify Scorecard tile is visible
    const isTileVisible = await scorecardPage.isScorecardTileVisible();
    expect(isTileVisible).toBeTruthy();
    
    // Verify Scorecard Logo is displayed
    const isLogoVisible = await scorecardPage.isScorecardLogoVisible();
    expect(isLogoVisible).toBeTruthy();
    
    // Verify logo has proper alt text
    const altText = await scorecardPage.getScorecardLogoAltText();
    expect(altText).toBeTruthy();
    expect(altText.toLowerCase()).toContain('scorecard');
  });
});