const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-402: Verify section heading Score the Right Membership for You is displayed', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-402][AC9][TC-031] Verify section heading Score the Right Membership for You is displayed', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Navigate to Scorecard marketing page on desktop
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify Scorecard marketing page loads successfully
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain('/scorecard');
    
    // Locate comparison section on the page
    const isComparisonVisible = await scorecardPage.isComparisonSectionVisible();
    expect(isComparisonVisible).toBe(true);
    
    // Verify section heading is displayed above comparison tiles
    const isSectionHeadingVisible = await scorecardPage.isSectionHeadingVisible();
    expect(isSectionHeadingVisible).toBe(true);
    
    const headingText = await scorecardPage.getSectionHeadingText();
    expect(headingText).toContain(TD.sectionHeading);
  });
});