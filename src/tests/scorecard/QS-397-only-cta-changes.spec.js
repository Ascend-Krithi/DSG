const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const Auth0LoginPage = require('../../pages/auth0-login.page');
const CommonHeaderPage = require('../../pages/common-header.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC7] Only CTA buttons change based on authentication', { tag: ['@regression'] }, () => {
  let scorecardPage;
  let auth0Page;
  let headerPage;

  test('[QS-397][TC-026] Verify only CTA buttons change based on authentication status', async ({ page }) => {
    await page.setViewportSize(TD.DESKTOP_VIEWPORT);
    
    headerPage = new CommonHeaderPage(page);
    scorecardPage = new ScorecardMarketingPage(page);
    auth0Page = new Auth0LoginPage(page);
    
    // Navigate to Scorecard marketing page as guest user
    await headerPage.clearAllAuthData();
    await scorecardPage.goto();
    await page.waitForTimeout(2000);
    
    // Verify guest CTAs are displayed
    const isSignInButtonVisible = await scorecardPage.isScorecardSignInButtonVisible();
    const isJoinButtonVisible = await scorecardPage.isScorecardPlusJoinButtonVisible();
    expect(isSignInButtonVisible).toBeTruthy();
    expect(isJoinButtonVisible).toBeTruthy();
    
    // Capture all static content elements
    const headingGuest = await scorecardPage.getSectionHeadingText();
    const pricingGuest = await scorecardPage.getScorecardPlusPricingText();
    const benefitsGuest = await scorecardPage.getScorecardPlusBenefitsText();
    
    // Authenticate user with valid credentials
    await scorecardPage.clickScorecardSignInButton();
    await auth0Page.isOnAuth0LoginPage();
    await auth0Page.signIn(TD.VALID_EMAIL, TD.VALID_PASSWORD);
    await page.waitForURL(/scorecard/, { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Verify authenticated CTAs are displayed
    const isViewAccountScorecardVisible = await scorecardPage.isScorecardViewAccountButtonVisible();
    const isViewAccountPlusVisible = await scorecardPage.isScorecardPlusViewAccountButtonVisible();
    expect(isViewAccountScorecardVisible).toBeTruthy();
    expect(isViewAccountPlusVisible).toBeTruthy();
    
    // Verify all static content remains unchanged
    const headingAuth = await scorecardPage.getSectionHeadingText();
    expect(headingAuth).toBe(headingGuest);
    
    const pricingAuth = await scorecardPage.getScorecardPlusPricingText();
    expect(pricingAuth).toBe(pricingGuest);
    
    const benefitsAuth = await scorecardPage.getScorecardPlusBenefitsText();
    expect(benefitsAuth).toBe(benefitsGuest);
  });
});