const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const Auth0LoginPage = require('../../pages/auth0-login.page');
const CommonHeaderPage = require('../../pages/common-header.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC3] Authenticated user sees View Account button', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;
  let auth0Page;
  let headerPage;

  test('[QS-379][TC-008] Verify authenticated user sees \'View Account\' button on Scorecard tile', async ({ page }) => {
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
    
    // Wait for redirect back to Scorecard page
    await page.waitForURL(/scorecard/, { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Verify Scorecard tile is visible
    const isTileVisible = await scorecardPage.isScorecardTileVisible();
    expect(isTileVisible).toBeTruthy();
    
    // Verify 'View Account' button is displayed on Scorecard tile
    const isViewAccountVisible = await scorecardPage.isScorecardViewAccountButtonVisible();
    expect(isViewAccountVisible).toBeTruthy();
    
    // Verify 'Sign In / Join Now' button is NOT displayed
    const isSignInVisible = await scorecardPage.isScorecardSignInButtonVisible();
    expect(isSignInVisible).toBeFalsy();
  });
});