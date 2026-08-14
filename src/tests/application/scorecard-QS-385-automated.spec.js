const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-385: Verify Scorecard+ tile displays appropriate CTA for guest user', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-385][AC4][TC-014] Verify Scorecard+ tile displays appropriate CTA for guest user', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Clear all browser cookies and session data
    await scorecardPage.clearCookies();
    
    // Navigate to Scorecard marketing page as guest user
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify Scorecard marketing page loads successfully
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain('/scorecard');
    
    // Locate Scorecard+ tile on the page
    const isScorecardPlusLogoVisible = await scorecardPage.isScorecardPlusLogoVisible();
    expect(isScorecardPlusLogoVisible).toBe(true);
    
    const isScorecardPlusPriceVisible = await scorecardPage.isScorecardPlusPriceVisible();
    expect(isScorecardPlusPriceVisible).toBe(true);
    
    const isScorecardPlusBenefitsVisible = await scorecardPage.isScorecardPlusBenefitsVisible();
    expect(isScorecardPlusBenefitsVisible).toBe(true);
    
    // Verify guest-appropriate CTA button is displayed
    const isJoinNowVisible = await scorecardPage.isJoinNowButtonVisible();
    expect(isJoinNowVisible).toBe(true);
    
    // Verify 'View Account' button is NOT displayed
    const isViewAccountVisible = await scorecardPage.isViewAccountButtonVisible();
    expect(isViewAccountVisible).toBe(false);
  });
});