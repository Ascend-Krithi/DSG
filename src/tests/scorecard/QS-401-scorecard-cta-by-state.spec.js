const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const Auth0LoginPage = require('../../pages/auth0-login.page');
const CommonHeaderPage = require('../../pages/common-header.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC8] Scorecard tile displays appropriate CTA by state', { tag: ['@regression'] }, () => {
  let scorecardPage;
  let auth0Page;
  let headerPage;

  test('[QS-401][TC-030] Verify Scorecard tile displays appropriate CTA based on authentication state', async ({ page }) => {
    await page.setViewportSize(TD.DESKTOP_VIEWPORT);
    
    headerPage = new CommonHeaderPage(page);
    scorecardPage = new ScorecardMarketingPage(page);
    auth0Page = new Auth0LoginPage(page);
    
    // Navigate to Scorecard marketing page as guest user
    await headerPage.clearAllAuthData();
    await scorecardPage.goto();
    await page.waitForTimeout(2000);
    
    // Verify 'Sign In / Join Now' button is displayed on Scorecard tile
    const isSignInButtonVisible = await scorecardPage.isScorecardSignInButtonVisible();
    expect(isSignInButtonVisible).toBeTruthy();
    
    // Authenticate user with valid credentials
    await scorecardPage.clickScorecardSignInButton();
    await auth0Page.isOnAuth0LoginPage();
    await auth0Page.signIn(TD.VALID_EMAIL, TD.VALID_PASSWORD);
    await page.waitForURL(/scorecard/, { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Verify 'View Account' button is displayed on Scorecard tile
    const isViewAccountVisible = await scorecardPage.isScorecardViewAccountButtonVisible();
    expect(isViewAccountVisible).toBeTruthy();
    
    // Verify all other Scorecard tile content remains unchanged
    const pointsText = await scorecardPage.getScorecardPointsText();
    const redemptionText = await scorecardPage.getScorecardRedemptionText();
    expect(pointsText).toContain('1 Point');
    expect(redemptionText).toContain('300 Points');
  });
});