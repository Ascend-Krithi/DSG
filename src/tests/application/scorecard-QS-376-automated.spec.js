const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-376: Verify clicking Sign In / Join Now button redirects guest user to Sign In page', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QS-376][AC2][TC-005] Verify clicking Sign In / Join Now button redirects guest user to Sign In page', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Navigate to Scorecard marketing page as guest user
    await scorecardPage.clearCookies();
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Click 'Sign In / Join Now' button on Scorecard tile
    await scorecardPage.clickSignInJoinNowButton();
    await page.waitForLoadState('domcontentloaded');
    
    // Verify redirect to Auth0 Sign In page
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain(TD.auth0SignInUrlPattern);
    
    // Verify Sign In page elements are displayed
    const isAuth0PageVisible = await scorecardPage.isAuth0SignInPageVisible();
    expect(isAuth0PageVisible).toBe(true);
  });
});