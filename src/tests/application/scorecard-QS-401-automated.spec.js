const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-401: Verify Scorecard tile displays appropriate CTA based on authentication state', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QS-401][AC8][TC-030] Verify Scorecard tile displays appropriate CTA based on authentication state', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Navigate to Scorecard marketing page as guest user
    await scorecardPage.clearCookies();
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify 'Sign In / Join Now' button is displayed on Scorecard tile
    const isSignInVisibleGuest = await scorecardPage.isSignInJoinNowButtonVisible();
    expect(isSignInVisibleGuest).toBe(true);
    
    // Authenticate user with valid credentials
    await scorecardPage.clickSignInJoinNowButton();
    await page.waitForLoadState('domcontentloaded');
    await scorecardPage.signIn(TD.validEmail, TD.validPassword);
    await page.waitForTimeout(3000);
    
    // Navigate to Scorecard marketing page as authenticated user
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify 'View Account' button is displayed on Scorecard tile
    const isViewAccountVisibleAuth = await scorecardPage.isViewAccountButtonVisible();
    expect(isViewAccountVisibleAuth).toBe(true);
    
    // Verify all other Scorecard tile content remains unchanged
    const isScorecardLogoVisible = await scorecardPage.isScorecardLogoVisible();
    expect(isScorecardLogoVisible).toBe(true);
    
    const isScorecardPointsVisible = await scorecardPage.isScorecardPointsTextVisible();
    expect(isScorecardPointsVisible).toBe(true);
    
    const isScorecardRewardVisible = await scorecardPage.isScorecardRewardTextVisible();
    expect(isScorecardRewardVisible).toBe(true);
  });
});