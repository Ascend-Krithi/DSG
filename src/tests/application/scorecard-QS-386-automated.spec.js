const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-386: Verify Scorecard+ tile displays appropriate CTA for authenticated user', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-386][AC4][TC-015] Verify Scorecard+ tile displays appropriate CTA for authenticated user', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Authenticate user with valid credentials
    await scorecardPage.clearCookies();
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    await scorecardPage.clickSignInJoinNowButton();
    await page.waitForLoadState('domcontentloaded');
    await scorecardPage.signIn(TD.validEmail, TD.validPassword);
    await page.waitForTimeout(3000);
    
    // Navigate to Scorecard marketing page
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Locate Scorecard+ tile on the page
    const isScorecardPlusLogoVisible = await scorecardPage.isScorecardPlusLogoVisible();
    expect(isScorecardPlusLogoVisible).toBe(true);
    
    // Verify 'View Account' button is displayed
    const isViewAccountVisible = await scorecardPage.isViewAccountButtonVisible();
    expect(isViewAccountVisible).toBe(true);
    
    // Verify guest CTA button is NOT displayed
    const isJoinNowVisible = await scorecardPage.isJoinNowButtonVisible();
    expect(isJoinNowVisible).toBe(false);
  });
});