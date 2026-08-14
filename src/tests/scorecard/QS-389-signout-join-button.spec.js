const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const Auth0LoginPage = require('../../pages/auth0-login.page');
const CommonHeaderPage = require('../../pages/common-header.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC6] Join Now button displayed after sign out', { tag: ['@regression'] }, () => {
  let scorecardPage;
  let auth0Page;
  let headerPage;

  test('[QS-389][TC-018] Verify \'Join Now\' button is displayed after user signs out and returns to Scorecard marketing page', async ({ page }) => {
    await page.setViewportSize(TD.DESKTOP_VIEWPORT);
    
    headerPage = new CommonHeaderPage(page);
    scorecardPage = new ScorecardMarketingPage(page);
    auth0Page = new Auth0LoginPage(page);
    
    // Authenticate user with valid credentials
    await headerPage.clearAllAuthData();
    await scorecardPage.goto();
    await scorecardPage.clickScorecardSignInButton();
    await auth0Page.isOnAuth0LoginPage();
    await auth0Page.signIn(TD.VALID_EMAIL, TD.VALID_PASSWORD);
    await page.waitForURL(/scorecard/, { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Verify authenticated CTAs are visible
    const isViewAccountVisible = await scorecardPage.isScorecardPlusViewAccountButtonVisible();
    expect(isViewAccountVisible).toBeTruthy();
    
    // Sign out from the application
    await headerPage.clearAllAuthData();
    
    // Navigate back to Scorecard marketing page
    await scorecardPage.goto();
    await page.waitForTimeout(2000);
    
    // Verify 'Join Now' button is displayed on Scorecard+ tile
    const isJoinButtonVisible = await scorecardPage.isScorecardPlusJoinButtonVisible();
    expect(isJoinButtonVisible).toBeTruthy();
    
    // Verify 'View Account' button is NOT displayed
    const isViewAccountStillVisible = await scorecardPage.isScorecardPlusViewAccountButtonVisible();
    expect(isViewAccountStillVisible).toBeFalsy();
  });
});