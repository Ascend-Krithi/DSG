const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-377: Verify guest user is redirected back to Scorecard marketing page after successful sign-in', { tag: ['@regression', '@e2e'] }, () => {
  let scorecardPage;

  test('[QS-377][AC2][TC-006] Verify guest user is redirected back to Scorecard marketing page after successful sign-in', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Navigate to Scorecard marketing page as guest and click 'Sign In / Join Now'
    await scorecardPage.clearCookies();
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    await scorecardPage.clickSignInJoinNowButton();
    await page.waitForLoadState('domcontentloaded');
    
    // Verify user is redirected to Auth0 Sign In page
    let currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain(TD.auth0SignInUrlPattern);
    
    // Enter valid email address and password, then sign in
    await scorecardPage.signIn(TD.validEmail, TD.validPassword);
    await page.waitForTimeout(3000);
    
    // Verify user is on Scorecard marketing page
    currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain('/scorecard');
    
    // Verify authenticated CTA is displayed on Scorecard tile
    const isViewAccountVisible = await scorecardPage.isViewAccountButtonVisible();
    expect(isViewAccountVisible).toBe(true);
  });
});