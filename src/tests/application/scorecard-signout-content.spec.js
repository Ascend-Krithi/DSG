const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][TS-007] Post-Sign Out Content Display', { tag: ['@regression', '@scorecard'] }, () => {
  let marketingPage;

  test.beforeEach(async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    await marketingPage.setViewportSize(TD.resolutions.desktop.width, TD.resolutions.desktop.height);
  });

  test('[QS-146][TC-019] Verify Join Now button and static content display after user signs out', async ({ page }) => {
    // Authenticate user
    await marketingPage.gotoSignInPage();
    await marketingPage.signIn(TD.credentials.validUser.username, TD.credentials.validUser.password);
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    await marketingPage.scrollToComparisonSection();
    
    // Verify authenticated CTAs are displayed
    const viewAccountVisible = await marketingPage.isScorecardViewAccountButtonVisible();
    expect(viewAccountVisible).toBe(true);
    
    // Sign out from the application
    await marketingPage.signOut();
    
    // Return to Scorecard marketing page
    await marketingPage.goto();
    await marketingPage.scrollToComparisonSection();
    
    // Verify 'Join Now' button is displayed on Scorecard+ tile
    const joinNowVisible = await marketingPage.isJoinNowButtonVisible();
    expect(joinNowVisible).toBe(true);
    
    // Verify Scorecard+ Dark Logo is displayed
    const darkLogoVisible = await marketingPage.isScorecardPlusDarkLogoVisible();
    expect(darkLogoVisible).toBe(true);
    
    // Verify '$99 Annual Membership' text is displayed
    await expect(page.locator('text=$99 Annual Membership')).toBeVisible();
    
    // Verify 'That's $350 in Benefits!' text is displayed
    const benefitsText = await marketingPage.getBenefitsValueText();
    expect(benefitsText).toContain(TD.content.benefitsValueInitial);
    
    // Verify 'Sign In / Join Now' button on Scorecard tile
    const signInVisible = await marketingPage.isSignInJoinNowButtonVisible();
    expect(signInVisible).toBe(true);
  });

  test('[QS-148][TC-020] Verify static marketing content remains unchanged after sign out and page reload', async ({ page }) => {
    // Authenticate user
    await marketingPage.gotoSignInPage();
    await marketingPage.signIn(TD.credentials.validUser.username, TD.credentials.validUser.password);
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    await marketingPage.scrollToComparisonSection();
    
    // Capture static content while authenticated
    const authenticatedBenefitsText = await marketingPage.getBenefitsValueText();
    const authenticatedLogoVisible = await marketingPage.isScorecardPlusDarkLogoVisible();
    
    // Sign out from the application
    await marketingPage.signOut();
    
    // Return to Scorecard marketing page
    await marketingPage.goto();
    await marketingPage.scrollToComparisonSection();
    
    // Capture static content again
    const guestBenefitsText = await marketingPage.getBenefitsValueText();
    const guestLogoVisible = await marketingPage.isScorecardPlusDarkLogoVisible();
    
    // Compare static content
    expect(guestBenefitsText).toBe(authenticatedBenefitsText);
    expect(guestLogoVisible).toBe(authenticatedLogoVisible);
    
    // Verify pricing text is identical
    await expect(page.locator('text=$99 Annual Membership')).toBeVisible();
    
    // Verify only CTAs changed
    const joinNowVisible = await marketingPage.isJoinNowButtonVisible();
    expect(joinNowVisible).toBe(true);
    const viewAccountVisible = await marketingPage.isScorecardPlusViewAccountButtonVisible();
    expect(viewAccountVisible).toBe(false);
  });

  test('[QS-150][TC-021] Verify page state after sign out with browser back button navigation', async ({ page }) => {
    // Authenticate user
    await marketingPage.gotoSignInPage();
    await marketingPage.signIn(TD.credentials.validUser.username, TD.credentials.validUser.password);
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Navigate to another page
    await marketingPage.gotoAccountSummary();
    
    // Sign out from the application
    await marketingPage.signOut();
    
    // Click browser back button
    await marketingPage.goBack();
    
    // Verify guest content is displayed
    await marketingPage.scrollToComparisonSection();
    const joinNowVisible = await marketingPage.isJoinNowButtonVisible();
    expect(joinNowVisible).toBe(true);
    
    // Verify no cached authenticated content
    const viewAccountVisible = await marketingPage.isScorecardPlusViewAccountButtonVisible();
    expect(viewAccountVisible).toBe(false);
    
    // Verify all static content is displayed correctly
    const darkLogoVisible = await marketingPage.isScorecardPlusDarkLogoVisible();
    expect(darkLogoVisible).toBe(true);
  });
});