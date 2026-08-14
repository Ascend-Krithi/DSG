const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-374: Verify comparison tiles display behavior at tablet breakpoint', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QS-374][AC1][TC-003] Verify comparison tiles display behavior at tablet breakpoint (768px-1023px)', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Set browser viewport to tablet dimensions
    await scorecardPage.setViewportSize(TD.tabletViewport.width, TD.tabletViewport.height);
    
    // Navigate to Scorecard marketing page
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify Scorecard marketing page loads successfully
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain('/scorecard');
    
    // Verify comparison tiles display behavior
    const isComparisonVisible = await scorecardPage.isComparisonSectionVisible();
    expect(isComparisonVisible).toBe(true);
    
    // Verify content readability and layout
    const isSectionHeadingVisible = await scorecardPage.isSectionHeadingVisible();
    expect(isSectionHeadingVisible).toBe(true);
    
    const headingText = await scorecardPage.getSectionHeadingText();
    expect(headingText).toContain(TD.sectionHeading);
    
    // Verify both tiles are present
    const isScorecardLogoVisible = await scorecardPage.isScorecardLogoVisible();
    expect(isScorecardLogoVisible).toBe(true);
    
    const isScorecardPlusLogoVisible = await scorecardPage.isScorecardPlusLogoVisible();
    expect(isScorecardPlusLogoVisible).toBe(true);
  });
});