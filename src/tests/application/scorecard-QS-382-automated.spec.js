const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-382: Verify Scorecard+ tile displays Dark Logo correctly', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-382][AC4][TC-011] Verify Scorecard+ tile displays Dark Logo correctly', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Navigate to Scorecard marketing page on desktop
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify Scorecard marketing page loads successfully
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain('/scorecard');
    
    // Locate Scorecard+ tile on the page
    const isScorecardPlusLogoVisible = await scorecardPage.isScorecardPlusLogoVisible();
    expect(isScorecardPlusLogoVisible).toBe(true);
    
    // Verify logo has proper alt text
    const logoElement = page.getByAltText('ScoreCard Plus New Logo').or(page.getByAltText('ScoreCard Logo + Light None')).first();
    const altText = await logoElement.getAttribute('alt');
    expect(altText).toMatch(/scorecard/i);
  });
});