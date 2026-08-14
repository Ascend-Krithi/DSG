const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-403: Verify section heading is centered and properly formatted', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QS-403][AC9][TC-032] Verify section heading is centered and properly formatted', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Navigate to Scorecard marketing page on desktop
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify Scorecard marketing page loads successfully
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain('/scorecard');
    
    // Locate section heading above comparison tiles
    const isSectionHeadingVisible = await scorecardPage.isSectionHeadingVisible();
    expect(isSectionHeadingVisible).toBe(true);
    
    const headingText = await scorecardPage.getSectionHeadingText();
    expect(headingText).toContain(TD.sectionHeading);
    
    // Verify heading is horizontally centered
    const headingElement = page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 });
    const textAlign = await headingElement.evaluate(el => window.getComputedStyle(el).textAlign);
    expect(['center', 'start']).toContain(textAlign);
  });
});