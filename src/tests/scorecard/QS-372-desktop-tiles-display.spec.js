const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC1] Scorecard comparison tiles display on desktop', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-372][TC-001] Verify Scorecard and Scorecard+ comparison tiles display side by side on desktop device', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize(TD.DESKTOP_VIEWPORT);
    
    scorecardPage = new ScorecardMarketingPage(page);
    
    // Navigate to Scorecard marketing page
    await scorecardPage.goto();
    await expect(page).toHaveURL(/scorecard/);
    
    // Verify Scorecard comparison tile is displayed
    const isScorecardVisible = await scorecardPage.isScorecardTileVisible();
    expect(isScorecardVisible).toBeTruthy();
    
    // Verify Scorecard logo is visible
    const isLogoVisible = await scorecardPage.isScorecardLogoVisible();
    expect(isLogoVisible).toBeTruthy();
    
    // Verify Scorecard+ comparison tile is displayed
    const isScorecardPlusVisible = await scorecardPage.isScorecardPlusTileVisible();
    expect(isScorecardPlusVisible).toBeTruthy();
    
    // Verify Scorecard+ dark logo is visible
    const isPlusLogoVisible = await scorecardPage.isScorecardPlusDarkLogoVisible();
    expect(isPlusLogoVisible).toBeTruthy();
    
    // Verify tiles are positioned side by side
    const areSideBySide = await scorecardPage.areTilesDisplayedSideBySide();
    expect(areSideBySide).toBeTruthy();
    
    // Verify section heading is displayed above tiles
    const isHeadingVisible = await scorecardPage.isSectionHeadingVisible();
    expect(isHeadingVisible).toBeTruthy();
    
    const headingText = await scorecardPage.getSectionHeadingText();
    expect(headingText).toContain(TD.SECTION_HEADING);
  });
});