const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const Auth0LoginPage = require('../../pages/auth0-login.page');
const CommonHeaderPage = require('../../pages/common-header.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC5] Scorecard+ View Account button is clickable', { tag: ['@regression'] }, () => {
  let scorecardPage;
  let auth0Page;
  let headerPage;

  test('[QS-387][TC-016] Verify authenticated user\'s \'View Account\' button on Scorecard+ tile is clickable', async ({ page }) => {
    await page.setViewportSize(TD.DESKTOP_VIEWPORT);
    
    headerPage = new CommonHeaderPage(page);
    scorecardPage = new ScorecardMarketingPage(page);
    auth0Page = new Auth0LoginPage(page);
    
    // Authenticate user and navigate to Scorecard marketing page
    await headerPage.clearAllAuthData();
    await scorecardPage.goto();
    await scorecardPage.clickScorecardSignInButton();
    await auth0Page.isOnAuth0LoginPage();
    await auth0Page.signIn(TD.VALID_EMAIL, TD.VALID_PASSWORD);
    await page.waitForURL(/scorecard/, { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Verify 'View Account' button is enabled
    const isButtonVisible = await scorecardPage.isScorecardPlusViewAccountButtonVisible();
    expect(isButtonVisible).toBeTruthy();
    
    // Click 'View Account' button on Scorecard+ tile
    await scorecardPage.clickScorecardPlusViewAccountButton();
    await page.waitForTimeout(2000);
    
    // Verify navigation is triggered
    const currentUrl = page.url();
    const hasNavigated = !currentUrl.includes('/scorecard');
    expect(hasNavigated).toBeTruthy();
  });
});