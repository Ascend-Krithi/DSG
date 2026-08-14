const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-397: Verify only CTA buttons change based on authentication status', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QS-397][AC7][TC-026] Verify only CTA buttons change based on authentication status', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Navigate to Scorecard marketing page as guest user
    await scorecardPage.clearCookies();
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify guest CTAs are displayed
    const isSignInVisibleGuest = await scorecardPage.isSignInJoinNowButtonVisible();
    expect(isSignInVisibleGuest).toBe(true);
    
    const isJoinNowVisibleGuest = await scorecardPage.isJoinNowButtonVisible();
    expect(isJoinNowVisibleGuest).toBe(true);
    
    // Capture all static content elements
    const headingGuest = await scorecardPage.getSectionHeadingText();
    const scorecardPointsGuest = await scorecardPage.getScorecardPointsText();
    const scorecardRewardGuest = await scorecardPage.getScorecardRewardText();
    const priceGuest = await scorecardPage.getScorecardPlusPriceText();
    const benefitsGuest = await scorecardPage.getScorecardPlusBenefitsText();
    
    // Authenticate user with valid credentials
    await scorecardPage.clickSignInJoinNowButton();
    await page.waitForLoadState('domcontentloaded');
    await scorecardPage.signIn(TD.validEmail, TD.validPassword);
    await page.waitForTimeout(3000);
    
    // Navigate to Scorecard marketing page as authenticated user
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify authenticated CTAs are displayed
    const isViewAccountVisibleAuth = await scorecardPage.isViewAccountButtonVisible();
    expect(isViewAccountVisibleAuth).toBe(true);
    
    // Verify all static content remains unchanged
    const headingAuth = await scorecardPage.getSectionHeadingText();
    expect(headingAuth).toBe(headingGuest);
    
    const scorecardPointsAuth = await scorecardPage.getScorecardPointsText();
    expect(scorecardPointsAuth).toBe(scorecardPointsGuest);
    
    const scorecardRewardAuth = await scorecardPage.getScorecardRewardText();
    expect(scorecardRewardAuth).toBe(scorecardRewardGuest);
    
    const priceAuth = await scorecardPage.getScorecardPlusPriceText();
    expect(priceAuth).toBe(priceGuest);
    
    const benefitsAuth = await scorecardPage.getScorecardPlusBenefitsText();
    expect(benefitsAuth).toBe(benefitsGuest);
  });
});