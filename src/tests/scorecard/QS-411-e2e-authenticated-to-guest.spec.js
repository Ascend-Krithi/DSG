const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const Auth0LoginPage = require('../../pages/auth0-login.page');
const CommonHeaderPage = require('../../pages/common-header.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC1-AC10] End-to-end authenticated to guest journey', { tag: ['@e2e', '@regression'] }, () => {
  let scorecardPage;
  let auth0Page;
  let headerPage;

  test('[QS-411][TC-040] End-to-end test: Authenticated user signs out and verifies guest state restoration', async ({ page }) => {
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
    
    // Verify both comparison tiles display 'View Account' buttons
    const isViewAccountScorecardVisible = await scorecardPage.isScorecardViewAccountButtonVisible();
    const isViewAccountPlusVisible = await scorecardPage.isScorecardPlusViewAccountButtonVisible();
    expect(isViewAccountScorecardVisible).toBeTruthy();
    expect(isViewAccountPlusVisible).toBeTruthy();
    
    // Capture all static content
    const headingAuth = await scorecardPage.getSectionHeadingText();
    const pricingAuth = await scorecardPage.getScorecardPlusPricingText();
    const benefitsAuth = await scorecardPage.getScorecardPlusBenefitsText();
    const pointsAuth = await scorecardPage.getScorecardPointsText();
    const redemptionAuth = await scorecardPage.getScorecardRedemptionText();
    
    // Sign out from the application
    await headerPage.clearAllAuthData();
    
    // Navigate back to Scorecard marketing page
    await scorecardPage.goto();
    await page.waitForTimeout(2000);
    
    // Verify both comparison tiles are still displayed side by side
    const areSideBySide = await scorecardPage.areTilesDisplayedSideBySide();
    expect(areSideBySide).toBeTruthy();
    
    // Verify section heading is still displayed
    const headingGuest = await scorecardPage.getSectionHeadingText();
    expect(headingGuest).toBe(headingAuth);
    
    // Verify Scorecard+ tile displays 'Join Now' button
    const isJoinButtonVisible = await scorecardPage.isScorecardPlusJoinButtonVisible();
    expect(isJoinButtonVisible).toBeTruthy();
    
    // Verify Scorecard tile displays 'Sign In / Join Now' button
    const isSignInButtonVisible = await scorecardPage.isScorecardSignInButtonVisible();
    expect(isSignInButtonVisible).toBeTruthy();
    
    // Verify Scorecard+ Dark Logo is still displayed
    const isLogoVisible = await scorecardPage.isScorecardPlusDarkLogoVisible();
    expect(isLogoVisible).toBeTruthy();
    
    // Verify all static content remains unchanged from authenticated state
    const pricingGuest = await scorecardPage.getScorecardPlusPricingText();
    const benefitsGuest = await scorecardPage.getScorecardPlusBenefitsText();
    const pointsGuest = await scorecardPage.getScorecardPointsText();
    const redemptionGuest = await scorecardPage.getScorecardRedemptionText();
    
    expect(pricingGuest).toBe(pricingAuth);
    expect(benefitsGuest).toBe(benefitsAuth);
    expect(pointsGuest).toBe(pointsAuth);
    expect(redemptionGuest).toBe(redemptionAuth);
  });
});