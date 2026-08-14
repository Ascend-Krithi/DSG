const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const Auth0LoginPage = require('../../pages/auth0-login.page');
const CommonHeaderPage = require('../../pages/common-header.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC1-AC10] End-to-end guest user journey', { tag: ['@e2e', '@regression'] }, () => {
  let scorecardPage;
  let auth0Page;
  let headerPage;

  test('[QS-410][TC-039] End-to-end test: Guest user journey from viewing tiles to signing in and viewing account', async ({ page }) => {
    await page.setViewportSize(TD.DESKTOP_VIEWPORT);
    
    headerPage = new CommonHeaderPage(page);
    scorecardPage = new ScorecardMarketingPage(page);
    auth0Page = new Auth0LoginPage(page);
    
    // Clear all browser cookies and navigate to Scorecard marketing page as guest
    await headerPage.clearAllAuthData();
    await scorecardPage.goto();
    await expect(page).toHaveURL(/scorecard/);
    
    // Verify both comparison tiles are displayed side by side
    const areSideBySide = await scorecardPage.areTilesDisplayedSideBySide();
    expect(areSideBySide).toBeTruthy();
    
    // Verify section heading is displayed
    const headingText = await scorecardPage.getSectionHeadingText();
    expect(headingText).toContain(TD.SECTION_HEADING);
    
    // Verify Scorecard tile content
    const pointsText = await scorecardPage.getScorecardPointsText();
    const redemptionText = await scorecardPage.getScorecardRedemptionText();
    const isSignInVisible = await scorecardPage.isScorecardSignInButtonVisible();
    expect(pointsText).toContain('1 Point');
    expect(redemptionText).toContain('300 Points');
    expect(isSignInVisible).toBeTruthy();
    
    // Verify Scorecard+ tile content
    const pricingText = await scorecardPage.getScorecardPlusPricingText();
    const benefitsText = await scorecardPage.getScorecardPlusBenefitsText();
    const isJoinVisible = await scorecardPage.isScorecardPlusJoinButtonVisible();
    expect(pricingText).toContain('$99');
    expect(benefitsText).toContain('$350');
    expect(isJoinVisible).toBeTruthy();
    
    // Click 'Sign In / Join Now' button on Scorecard tile
    await scorecardPage.clickScorecardSignInButton();
    
    // Verify redirect to Auth0 and sign in
    await auth0Page.isOnAuth0LoginPage();
    await auth0Page.signIn(TD.VALID_EMAIL, TD.VALID_PASSWORD);
    
    // Verify user is redirected back to Scorecard marketing page
    await page.waitForURL(/scorecard/, { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Verify both comparison tiles are still displayed side by side
    const areSideBySideAuth = await scorecardPage.areTilesDisplayedSideBySide();
    expect(areSideBySideAuth).toBeTruthy();
    
    // Verify all static content remains unchanged
    const headingTextAuth = await scorecardPage.getSectionHeadingText();
    const pricingTextAuth = await scorecardPage.getScorecardPlusPricingText();
    const benefitsTextAuth = await scorecardPage.getScorecardPlusBenefitsText();
    expect(headingTextAuth).toBe(headingText);
    expect(pricingTextAuth).toBe(pricingText);
    expect(benefitsTextAuth).toBe(benefitsText);
    
    // Verify Scorecard tile now displays 'View Account' button
    const isViewAccountScorecardVisible = await scorecardPage.isScorecardViewAccountButtonVisible();
    expect(isViewAccountScorecardVisible).toBeTruthy();
    
    // Verify Scorecard+ tile now displays 'View Account' button
    const isViewAccountPlusVisible = await scorecardPage.isScorecardPlusViewAccountButtonVisible();
    expect(isViewAccountPlusVisible).toBeTruthy();
    
    // Click 'View Account' button on Scorecard tile
    await scorecardPage.clickScorecardViewAccountButton();
    await page.waitForTimeout(2000);
    
    // Verify navigation to account page
    const currentUrl = page.url();
    const isAccountPage = currentUrl.includes('account') || currentUrl.includes('my-account') || currentUrl.includes('profile');
    expect(isAccountPage).toBeTruthy();
  });
});