const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-399: Verify Scorecard tile displays 1 Point Per Every $1 Spent text', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-399][AC8][TC-028] Verify Scorecard tile displays 1 Point Per Every $1 Spent text', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Navigate to Scorecard marketing page on desktop
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify Scorecard marketing page loads successfully
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain('/scorecard');
    
    // Locate Scorecard tile on the page
    const isScorecardPointsVisible = await scorecardPage.isScorecardPointsTextVisible();
    expect(isScorecardPointsVisible).toBe(true);
    
    // Verify '1 Point Per Every $1 Spent.' text is displayed
    const pointsText = await scorecardPage.getScorecardPointsText();
    expect(pointsText).toContain('1 Point');
    expect(pointsText).toContain('$1');
  });
});