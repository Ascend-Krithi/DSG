const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const Auth0LoginPage = require('../../pages/auth0-login.page');
const CommonHeaderPage = require('../../pages/common-header.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC2] Invalid credentials prevent sign-in', { tag: ['@regression'] }, () => {
  let scorecardPage;
  let auth0Page;
  let headerPage;

  test('[QS-378][TC-007] Verify invalid credentials prevent sign-in and display error message', async ({ page }) => {
    await page.setViewportSize(TD.DESKTOP_VIEWPORT);
    
    headerPage = new CommonHeaderPage(page);
    scorecardPage = new ScorecardMarketingPage(page);
    auth0Page = new Auth0LoginPage(page);
    
    // Navigate to Scorecard marketing page and click Sign In
    await headerPage.clearAllAuthData();
    await scorecardPage.goto();
    await scorecardPage.clickScorecardSignInButton();
    
    // Wait for Auth0 page
    await auth0Page.isOnAuth0LoginPage();
    
    // Enter valid email address
    await auth0Page.enterEmail(TD.VALID_EMAIL);
    
    // Click 'CONTINUE' button
    await auth0Page.clickContinue();
    await page.waitForTimeout(2000);
    
    // Enter invalid password
    await auth0Page.enterPassword(TD.INVALID_PASSWORD);
    
    // Click 'Sign In' button
    await auth0Page.clickSignIn();
    await page.waitForTimeout(2000);
    
    // Verify error message is displayed
    const isErrorVisible = await auth0Page.isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();
    
    // Verify user remains on Sign In page
    const isStillOnAuth0 = page.url().includes('sso-nonprod.dickssportinggoods.com');
    expect(isStillOnAuth0).toBeTruthy();
  });
});