const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-379: Verify authenticated user sees View Account button on Scorecard tile', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-379][AC3][TC-008] Verify authenticated user sees View Account button on Scorecard tile', async ({ page }) => {
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
    
    // Locate Scorecard tile on the page
    const isScorecardLogoVisible = await scorecardPage.isScorecardLogoVisible();
    expect(isScorecardLogoVisible).toBe(true);
    
    // Verify 'View Account' button is displayed on Scorecard tile
    const isViewAccountVisible = await scorecardPage.isViewAccountButtonVisible();
    expect(isViewAccountVisible).toBe(true);
    
    // Verify 'Sign In / Join Now' button is NOT displayed
    const isSignInButtonVisible = await scorecardPage.isSignInJoinNowButtonVisible();
    expect(isSignInButtonVisible).toBe(false);
  });
});