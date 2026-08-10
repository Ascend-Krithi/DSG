const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][TS-008] Static Content Consistency Across Authentication States', { tag: ['@regression', '@scorecard'] }, () => {
  let marketingPage;

  test.beforeEach(async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    await marketingPage.clearCookiesAndCache();
    await marketingPage.setViewportSize(TD.resolutions.desktop.width, TD.resolutions.desktop.height);
  });

  test('[QS-152][TC-022] Verify static marketing content remains unchanged across authentication states', async ({ page }) => {
    // Navigate to Scorecard marketing page as guest
    await marketingPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.marketingPage);
    await marketingPage.scrollToComparisonSection();
    
    // Capture static content as guest
    const guestScorecardLogoVisible = await marketingPage.isScorecardLogoVisible();
    const guestDarkLogoVisible = await marketingPage.isScorecardPlusDarkLogoVisible();
    const guestBenefitsText = await marketingPage.getBenefitsValueText();
    const guestPointsEarningVisible = await marketingPage.isPointsEarningTextVisible();
    const guestRewardsRedemptionVisible = await marketingPage.isRewardsRedemptionTextVisible();
    
    // Note guest CTAs
    const guestJoinNowVisible = await marketingPage.isJoinNowButtonVisible();
    const guestSignInVisible = await marketingPage.isSignInJoinNowButtonVisible();
    expect(guestJoinNowVisible).toBe(true);
    expect(guestSignInVisible).toBe(true);
    
    // Authenticate user
    await marketingPage.gotoSignInPage();
    await marketingPage.signIn(TD.credentials.validUser.username, TD.credentials.validUser.password);
    
    // Return to Scorecard marketing page
    await marketingPage.goto();
    await marketingPage.scrollToComparisonSection();
    
    // Compare static content
    const authScorecardLogoVisible = await marketingPage.isScorecardLogoVisible();
    const authDarkLogoVisible = await marketingPage.isScorecardPlusDarkLogoVisible();
    const authBenefitsText = await marketingPage.getBenefitsValueText();
    const authPointsEarningVisible = await marketingPage.isPointsEarningTextVisible();
    const authRewardsRedemptionVisible = await marketingPage.isRewardsRedemptionTextVisible();
    
    // Verify static content is identical
    expect(authScorecardLogoVisible).toBe(guestScorecardLogoVisible);
    expect(authDarkLogoVisible).toBe(guestDarkLogoVisible);
    expect(authBenefitsText).toBe(guestBenefitsText);
    expect(authPointsEarningVisible).toBe(guestPointsEarningVisible);
    expect(authRewardsRedemptionVisible).toBe(guestRewardsRedemptionVisible);
    
    // Verify CTAs changed
    const authViewAccountVisible = await marketingPage.isScorecardViewAccountButtonVisible();
    const authJoinNowVisible = await marketingPage.isJoinNowButtonVisible();
    expect(authViewAccountVisible).toBe(true);
    expect(authJoinNowVisible).toBe(false);
  });

  test('[QS-154][TC-023] Verify logo consistency across multiple authentication state transitions', async ({ page }) => {
    // Navigate to marketing page as guest
    await marketingPage.goto();
    await marketingPage.scrollToComparisonSection();
    
    // Capture both logos as baseline
    const baselineScorecardLogo = await marketingPage.isScorecardLogoVisible();
    const baselineDarkLogo = await marketingPage.isScorecardPlusDarkLogoVisible();
    expect(baselineScorecardLogo).toBe(true);
    expect(baselineDarkLogo).toBe(true);
    
    // Transition 1: Authenticate user
    await marketingPage.gotoSignInPage();
    await marketingPage.signIn(TD.credentials.validUser.username, TD.credentials.validUser.password);
    await marketingPage.goto();
    await marketingPage.scrollToComparisonSection();
    
    const trans1ScorecardLogo = await marketingPage.isScorecardLogoVisible();
    const trans1DarkLogo = await marketingPage.isScorecardPlusDarkLogoVisible();
    expect(trans1ScorecardLogo).toBe(baselineScorecardLogo);
    expect(trans1DarkLogo).toBe(baselineDarkLogo);
    
    // Transition 2: Sign out
    await marketingPage.signOut();
    await marketingPage.goto();
    await marketingPage.scrollToComparisonSection();
    
    const trans2ScorecardLogo = await marketingPage.isScorecardLogoVisible();
    const trans2DarkLogo = await marketingPage.isScorecardPlusDarkLogoVisible();
    expect(trans2ScorecardLogo).toBe(baselineScorecardLogo);
    expect(trans2DarkLogo).toBe(baselineDarkLogo);
    
    // Transition 3: Authenticate again
    await marketingPage.gotoSignInPage();
    await marketingPage.signIn(TD.credentials.validUser.username, TD.credentials.validUser.password);
    await marketingPage.goto();
    await marketingPage.scrollToComparisonSection();
    
    const trans3ScorecardLogo = await marketingPage.isScorecardLogoVisible();
    const trans3DarkLogo = await marketingPage.isScorecardPlusDarkLogoVisible();
    expect(trans3ScorecardLogo).toBe(baselineScorecardLogo);
    expect(trans3DarkLogo).toBe(baselineDarkLogo);
    
    // Transition 4: Sign out again
    await marketingPage.signOut();
    await marketingPage.goto();
    await marketingPage.scrollToComparisonSection();
    
    const trans4ScorecardLogo = await marketingPage.isScorecardLogoVisible();
    const trans4DarkLogo = await marketingPage.isScorecardPlusDarkLogoVisible();
    expect(trans4ScorecardLogo).toBe(baselineScorecardLogo);
    expect(trans4DarkLogo).toBe(baselineDarkLogo);
  });

  test('[QS-156][TC-024] Verify pricing and benefits messaging consistency with page refresh', async ({ page }) => {
    // Navigate to marketing page as guest
    await marketingPage.goto();
    await marketingPage.scrollToComparisonSection();
    
    // Capture pricing and benefits text
    const initialBenefitsText = await marketingPage.getBenefitsValueText();
    const initialPricingVisible = await marketingPage.isAnnualMembershipTextVisible();
    
    // Refresh page
    await marketingPage.reload();
    await marketingPage.scrollToComparisonSection();
    
    // Verify pricing and benefits text unchanged
    const refreshedBenefitsText = await marketingPage.getBenefitsValueText();
    const refreshedPricingVisible = await marketingPage.isAnnualMembershipTextVisible();
    expect(refreshedBenefitsText).toBe(initialBenefitsText);
    expect(refreshedPricingVisible).toBe(initialPricingVisible);
    
    // Authenticate user
    await marketingPage.gotoSignInPage();
    await marketingPage.signIn(TD.credentials.validUser.username, TD.credentials.validUser.password);
    
    // Navigate to marketing page
    await marketingPage.goto();
    await marketingPage.scrollToComparisonSection();
    
    // Verify pricing and benefits text unchanged from guest state
    const authBenefitsText = await marketingPage.getBenefitsValueText();
    const authPricingVisible = await marketingPage.isAnnualMembershipTextVisible();
    expect(authBenefitsText).toBe(initialBenefitsText);
    expect(authPricingVisible).toBe(initialPricingVisible);
    
    // Refresh page
    await marketingPage.reload();
    await marketingPage.scrollToComparisonSection();
    
    // Verify pricing and benefits remain identical after refresh
    const authRefreshedBenefitsText = await marketingPage.getBenefitsValueText();
    const authRefreshedPricingVisible = await marketingPage.isAnnualMembershipTextVisible();
    expect(authRefreshedBenefitsText).toBe(initialBenefitsText);
    expect(authRefreshedPricingVisible).toBe(initialPricingVisible);
  });
});