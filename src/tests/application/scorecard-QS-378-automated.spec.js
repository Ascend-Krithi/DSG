const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-378: Verify invalid credentials prevent sign-in and display error message', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QS-378][AC2][TC-007] Verify invalid credentials prevent sign-in and display error message', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Navigate to Scorecard marketing page and click 'Sign In / Join Now'
    await scorecardPage.clearCookies();
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    await scorecardPage.clickSignInJoinNowButton();
    await page.waitForLoadState('domcontentloaded');
    
    // Enter valid email and invalid password
    await scorecardPage.signIn(TD.validEmail, TD.invalidPassword);
    await page.waitForTimeout(2000);
    
    // Verify error message is displayed indicating invalid credentials
    const isErrorVisible = await scorecardPage.isAuthErrorMessageVisible();
    expect(isErrorVisible).toBe(true);
    
    // Verify user remains on Sign In page
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain(TD.auth0SignInUrlPattern);
  });
});