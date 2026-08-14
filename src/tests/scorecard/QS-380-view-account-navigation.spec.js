const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const Auth0LoginPage = require('../../pages/auth0-login.page');
const CommonHeaderPage = require('../../pages/common-header.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC3] View Account button navigates to account page', { tag: ['@regression'] }, () => {
  let scorecardPage;
  let auth0Page;
  let headerPage;

  test('[QS-380][TC-009] Verify clicking \'View Account\' button navigates authenticated user to MAUI Account Summary page', async ({ page }) => {
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
    
    // Click 'View Account' button on Scorecard tile
    await scorecardPage.clickScorecardViewAccountButton();
    
    // Verify navigation to account page
    await page.waitForTimeout(2000);
    const currentUrl = page.url();
    const isAccountPage = currentUrl.includes('account') || currentUrl.includes('my-account') || currentUrl.includes('profile');
    expect(isAccountPage).toBeTruthy();
  });
});