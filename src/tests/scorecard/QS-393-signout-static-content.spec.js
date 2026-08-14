const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const Auth0LoginPage = require('../../pages/auth0-login.page');
const CommonHeaderPage = require('../../pages/common-header.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC6] Static content unchanged after sign out', { tag: ['@regression'] }, () => {
  let scorecardPage;
  let auth0Page;
  let headerPage;

  test('[QS-393][TC-022] Verify all static marketing content remains unchanged after sign out', async ({ page }) => {
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
    
    // Capture all static content elements
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
    
    // Verify all static content remains unchanged
    const headingGuest = await scorecardPage.getSectionHeadingText();
    expect(headingGuest).toBe(headingAuth);
    
    const pricingGuest = await scorecardPage.getScorecardPlusPricingText();
    expect(pricingGuest).toBe(pricingAuth);
    
    const benefitsGuest = await scorecardPage.getScorecardPlusBenefitsText();
    expect(benefitsGuest).toBe(benefitsAuth);
    
    const pointsGuest = await scorecardPage.getScorecardPointsText();
    expect(pointsGuest).toBe(pointsAuth);
    
    const redemptionGuest = await scorecardPage.getScorecardRedemptionText();
    expect(redemptionGuest).toBe(redemptionAuth);
    
    // Verify only CTA buttons have changed
    const isJoinButtonVisible = await scorecardPage.isScorecardPlusJoinButtonVisible();
    expect(isJoinButtonVisible).toBeTruthy();
  });
});