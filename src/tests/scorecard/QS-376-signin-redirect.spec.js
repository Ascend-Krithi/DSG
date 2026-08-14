const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const Auth0LoginPage = require('../../pages/auth0-login.page');
const CommonHeaderPage = require('../../pages/common-header.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC2] Sign In button redirects to Auth0', { tag: ['@regression'] }, () => {
  let scorecardPage;
  let auth0Page;
  let headerPage;

  test('[QS-376][TC-005] Verify clicking \'Sign In / Join Now\' button redirects guest user to Sign In page', async ({ page }) => {
    await page.setViewportSize(TD.DESKTOP_VIEWPORT);
    
    headerPage = new CommonHeaderPage(page);
    scorecardPage = new ScorecardMarketingPage(page);
    auth0Page = new Auth0LoginPage(page);
    
    // Navigate to Scorecard marketing page as guest user
    await headerPage.clearAllAuthData();
    await scorecardPage.goto();
    
    // Click 'Sign In / Join Now' button on Scorecard tile
    await scorecardPage.clickScorecardSignInButton();
    
    // Verify redirect to Auth0 Sign In page
    const isOnAuth0 = await auth0Page.isOnAuth0LoginPage();
    expect(isOnAuth0).toBeTruthy();
    
    // Verify Sign In page elements are displayed
    const isHeadingVisible = await auth0Page.isHeadingVisible();
    expect(isHeadingVisible).toBeTruthy();
    
    const headingText = await auth0Page.getHeadingText();
    expect(headingText).toContain(TD.AUTH0_HEADING);
    
    const isEmailVisible = await auth0Page.isEmailInputVisible();
    expect(isEmailVisible).toBeTruthy();
    
    const isContinueVisible = await auth0Page.isContinueButtonVisible();
    expect(isContinueVisible).toBeTruthy();
  });
});