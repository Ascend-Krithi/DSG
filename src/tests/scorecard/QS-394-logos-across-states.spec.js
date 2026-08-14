const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const Auth0LoginPage = require('../../pages/auth0-login.page');
const CommonHeaderPage = require('../../pages/common-header.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC7] Logos unchanged across authentication states', { tag: ['@regression'] }, () => {
  let scorecardPage;
  let auth0Page;
  let headerPage;

  test('[QS-394][TC-023] Verify logos remain unchanged across different authentication states', async ({ page }) => {
    await page.setViewportSize(TD.DESKTOP_VIEWPORT);
    
    headerPage = new CommonHeaderPage(page);
    scorecardPage = new ScorecardMarketingPage(page);
    auth0Page = new Auth0LoginPage(page);
    
    // Navigate to Scorecard marketing page as guest user
    await headerPage.clearAllAuthData();
    await scorecardPage.goto();
    await page.waitForTimeout(2000);
    
    // Verify logos are visible in guest state
    const isScorecardLogoVisibleGuest = await scorecardPage.isScorecardLogoVisible();
    const isPlusLogoVisibleGuest = await scorecardPage.isScorecardPlusDarkLogoVisible();
    expect(isScorecardLogoVisibleGuest).toBeTruthy();
    expect(isPlusLogoVisibleGuest).toBeTruthy();
    
    // Authenticate user with valid credentials
    await scorecardPage.clickScorecardSignInButton();
    await auth0Page.isOnAuth0LoginPage();
    await auth0Page.signIn(TD.VALID_EMAIL, TD.VALID_PASSWORD);
    await page.waitForURL(/scorecard/, { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Verify logos remain visible in authenticated state
    const isScorecardLogoVisibleAuth = await scorecardPage.isScorecardLogoVisible();
    const isPlusLogoVisibleAuth = await scorecardPage.isScorecardPlusDarkLogoVisible();
    expect(isScorecardLogoVisibleAuth).toBeTruthy();
    expect(isPlusLogoVisibleAuth).toBeTruthy();
  });
});