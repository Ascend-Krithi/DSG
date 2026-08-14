const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-398: Verify Scorecard tile displays Scorecard Logo correctly', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-398][AC8][TC-027] Verify Scorecard tile displays Scorecard Logo correctly', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Navigate to Scorecard marketing page on desktop
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify Scorecard marketing page loads successfully
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain('/scorecard');
    
    // Locate Scorecard tile on the page
    const isScorecardLogoVisible = await scorecardPage.isScorecardLogoVisible();
    expect(isScorecardLogoVisible).toBe(true);
    
    // Verify logo has proper alt text
    const logoElement = page.getByAltText('ScoreCard Logo Light None').nth(1);
    const altText = await logoElement.getAttribute('alt');
    expect(altText).toMatch(/scorecard/i);
  });
});