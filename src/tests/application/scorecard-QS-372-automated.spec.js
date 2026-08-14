const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-372: Verify Scorecard and Scorecard+ comparison tiles display side by side on desktop device', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-372][AC1][TC-001] Verify Scorecard and Scorecard+ comparison tiles display side by side on desktop device', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Set desktop viewport
    await scorecardPage.setViewportSize(TD.desktopViewport.width, TD.desktopViewport.height);
    
    // Navigate to Scorecard marketing page
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify Scorecard marketing page loads successfully
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain('/scorecard');
    
    // Verify Scorecard comparison tile is displayed
    const isScorecardLogoVisible = await scorecardPage.isScorecardLogoVisible();
    expect(isScorecardLogoVisible).toBe(true);
    
    const isScorecardPointsVisible = await scorecardPage.isScorecardPointsTextVisible();
    expect(isScorecardPointsVisible).toBe(true);
    
    const isScorecardRewardVisible = await scorecardPage.isScorecardRewardTextVisible();
    expect(isScorecardRewardVisible).toBe(true);
    
    // Verify Scorecard+ comparison tile is displayed
    const isScorecardPlusLogoVisible = await scorecardPage.isScorecardPlusLogoVisible();
    expect(isScorecardPlusLogoVisible).toBe(true);
    
    const isScorecardPlusPriceVisible = await scorecardPage.isScorecardPlusPriceVisible();
    expect(isScorecardPlusPriceVisible).toBe(true);
    
    const isScorecardPlusBenefitsVisible = await scorecardPage.isScorecardPlusBenefitsVisible();
    expect(isScorecardPlusBenefitsVisible).toBe(true);
    
    // Verify tiles are positioned side by side
    const areTilesSideBySide = await scorecardPage.areTilesDisplayedSideBySide();
    expect(areTilesSideBySide).toBe(true);
    
    // Verify section heading is displayed above tiles
    const isSectionHeadingVisible = await scorecardPage.isSectionHeadingVisible();
    expect(isSectionHeadingVisible).toBe(true);
    
    const headingText = await scorecardPage.getSectionHeadingText();
    expect(headingText).toContain(TD.sectionHeading);
  });
});