const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC4] Scorecard+ tile displays Dark Logo', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-382][TC-011] Verify Scorecard+ tile displays Dark Logo correctly', async ({ page }) => {
    await page.setViewportSize(TD.DESKTOP_VIEWPORT);
    
    scorecardPage = new ScorecardMarketingPage(page);
    
    // Navigate to Scorecard marketing page on desktop
    await scorecardPage.goto();
    await expect(page).toHaveURL(/scorecard/);
    
    // Verify Scorecard+ tile is visible
    const isTileVisible = await scorecardPage.isScorecardPlusTileVisible();
    expect(isTileVisible).toBeTruthy();
    
    // Verify Scorecard+ Dark Logo is displayed
    const isLogoVisible = await scorecardPage.isScorecardPlusDarkLogoVisible();
    expect(isLogoVisible).toBeTruthy();
    
    // Verify logo has proper alt text
    const altText = await scorecardPage.getScorecardPlusLogoAltText();
    expect(altText).toBeTruthy();
    expect(altText.toLowerCase()).toContain('scorecard');
  });
});