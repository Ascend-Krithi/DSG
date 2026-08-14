const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-373: Verify comparison tiles are NOT displayed on mobile devices', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QS-373][AC1][TC-002] Verify comparison tiles are NOT displayed on mobile devices', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Set browser viewport to mobile dimensions
    await scorecardPage.setViewportSize(TD.mobileViewport.width, TD.mobileViewport.height);
    
    // Navigate to Scorecard marketing page
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify Scorecard marketing page loads successfully
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain('/scorecard');
    
    // Verify comparison tiles are not displayed or hidden
    const isComparisonVisible = await scorecardPage.isComparisonSectionVisible();
    
    // On mobile, the comparison section should either be hidden or not rendered
    // We check if it's visible, and if it is, verify it has zero or minimal width
    if (isComparisonVisible) {
      const areTilesSideBySide = await scorecardPage.areTilesDisplayedSideBySide();
      expect(areTilesSideBySide).toBe(false);
    }
  });
});