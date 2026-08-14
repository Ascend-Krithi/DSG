const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const Auth0LoginPage = require('../../pages/auth0-login.page');
const CommonHeaderPage = require('../../pages/common-header.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC2] User redirected back after successful sign-in', { tag: ['@regression'] }, () => {
  let scorecardPage;
  let auth0Page;
  let headerPage;

  test('[QS-377][TC-006] Verify guest user is redirected back to Scorecard marketing page after successful sign-in', async ({ page }) => {
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
    
    // Enter valid password
    await auth0Page.enterPassword(TD.VALID_PASSWORD);
    
    // Click 'Sign In' button
    await auth0Page.clickSignIn();
    
    // Verify user is redirected to Scorecard marketing page
    await page.waitForURL(/scorecard/, { timeout: 15000 });
    await expect(page).toHaveURL(/scorecard/);
    
    // Verify authenticated CTA is displayed on Scorecard tile
    await page.waitForTimeout(2000);
    const isViewAccountVisible = await scorecardPage.isScorecardViewAccountButtonVisible();
    expect(isViewAccountVisible).toBeTruthy();
  });
});