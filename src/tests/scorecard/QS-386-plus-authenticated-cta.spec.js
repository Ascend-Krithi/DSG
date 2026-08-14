const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const Auth0LoginPage = require('../../pages/auth0-login.page');
const CommonHeaderPage = require('../../pages/common-header.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC4] Scorecard+ tile displays authenticated CTA', { tag: ['@regression'] }, () => {
  let scorecardPage;
  let auth0Page;
  let headerPage;

  test('[QS-386][TC-015] Verify Scorecard+ tile displays appropriate CTA for authenticated user', async ({ page }) => {
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
    
    // Verify Scorecard+ tile is visible
    const isTileVisible = await scorecardPage.isScorecardPlusTileVisible();
    expect(isTileVisible).toBeTruthy();
    
    // Verify 'View Account' button is displayed
    const isViewAccountVisible = await scorecardPage.isScorecardPlusViewAccountButtonVisible();
    expect(isViewAccountVisible).toBeTruthy();
    
    // Verify guest CTA button is NOT displayed
    const isJoinButtonVisible = await scorecardPage.isScorecardPlusJoinButtonVisible();
    expect(isJoinButtonVisible).toBeFalsy();
  });
});