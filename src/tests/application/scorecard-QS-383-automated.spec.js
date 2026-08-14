const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-383: Verify Scorecard+ tile displays $99 Annual Membership text', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-383][AC4][TC-012] Verify Scorecard+ tile displays $99 Annual Membership text', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Navigate to Scorecard marketing page on desktop
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify Scorecard marketing page loads successfully
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain('/scorecard');
    
    // Locate Scorecard+ tile on the page
    const isScorecardPlusPriceVisible = await scorecardPage.isScorecardPlusPriceVisible();
    expect(isScorecardPlusPriceVisible).toBe(true);
    
    // Verify '$99 Annual Membership.' text is displayed
    const priceText = await scorecardPage.getScorecardPlusPriceText();
    expect(priceText).toContain('$99');
    expect(priceText).toContain('Annual Membership');
  });
});