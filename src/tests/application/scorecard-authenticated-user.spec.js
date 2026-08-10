const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][TS-004] Scorecard Authenticated User Experience', { tag: ['@regression', '@scorecard'] }, () => {
  let marketingPage;

  test.beforeEach(async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    await marketingPage.setViewportSize(TD.resolutions.desktop.width, TD.resolutions.desktop.height);
    
    // Authenticate user
    await marketingPage.gotoSignInPage();
    await marketingPage.signIn(TD.credentials.validUser.username, TD.credentials.validUser.password);
  });

  test('[QS-128][TC-010] Verify View Account button displays for authenticated user on Scorecard tile', async ({ page }) => {
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.marketingPage);
    
    // Locate Scorecard tile
    await marketingPage.scrollToComparisonSection();
    const scorecardTileVisible = await marketingPage.isScorecardTileVisible();
    expect(scorecardTileVisible).toBe(true);
    
    // Verify 'View Account' button is displayed
    await expect(page.locator('[data-testid="scorecard-cta"]:has-text("View Account")')).toBeVisible();
    
    // Verify button is enabled
    const isEnabled = await marketingPage.isScorecardViewAccountButtonEnabled();
    expect(isEnabled).toBe(true);
    
    // Verify button styling
    await expect(page.locator('[data-testid="scorecard-cta"]:has-text("View Account")')).toHaveCSS('cursor', 'pointer');
    
    // Verify 'Sign In / Join Now' is NOT displayed
    const signInVisible = await marketingPage.isSignInJoinNowButtonVisible();
    expect(signInVisible).toBe(false);
  });

  test('[QS-130][TC-011] Verify View Account button navigates to MAUI Account Summary page when clicked', async ({ page }) => {
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Locate Scorecard tile with 'View Account' button
    await marketingPage.scrollToComparisonSection();
    const viewAccountVisible = await marketingPage.isScorecardViewAccountButtonVisible();
    expect(viewAccountVisible).toBe(true);
    
    // Click 'View Account' button
    await marketingPage.clickScorecardViewAccountButton();
    
    // Verify navigation to MAUI Account Summary page
    await expect(page).toHaveURL(TD.urlPatterns.accountSummary);
    
    // Verify page loads successfully
    await expect(page.locator('body')).toBeVisible();
  });

  test('[QS-132][TC-012] Verify View Account button behavior when session expires', async ({ page }) => {
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify 'View Account' button is displayed
    await marketingPage.scrollToComparisonSection();
    const viewAccountVisible = await marketingPage.isScorecardViewAccountButtonVisible();
    expect(viewAccountVisible).toBe(true);
    
    // Manually expire session by clearing cookies
    await marketingPage.clearCookiesAndCache();
    
    // Click 'View Account' button
    await marketingPage.clickScorecardViewAccountButton();
    
    // Verify redirect to Sign In page
    await expect(page).toHaveURL(TD.urlPatterns.signInPage);
    
    // Verify session expired message
    const sessionExpiredVisible = await marketingPage.isSessionExpiredMessageVisible();
    expect(sessionExpiredVisible).toBe(true);
  });
});