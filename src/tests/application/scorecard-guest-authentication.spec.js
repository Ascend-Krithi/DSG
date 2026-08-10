const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][TS-003] Scorecard Guest User Authentication Flow', { tag: ['@regression', '@scorecard'] }, () => {
  let marketingPage;

  test.beforeEach(async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    // Clear cookies to ensure guest state
    await marketingPage.clearCookiesAndCache();
    await marketingPage.setViewportSize(TD.resolutions.desktop.width, TD.resolutions.desktop.height);
  });

  test('[QS-122][TC-007] Verify Sign In / Join Now button displays for guest user and redirects to Sign In page', async ({ page }) => {
    // Navigate to Scorecard marketing page as guest
    await marketingPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.marketingPage);
    
    // Locate Scorecard tile
    await marketingPage.scrollToComparisonSection();
    const scorecardTileVisible = await marketingPage.isScorecardTileVisible();
    expect(scorecardTileVisible).toBe(true);
    
    // Verify 'Sign In / Join Now' button is displayed
    await expect(page.locator('[data-testid="scorecard-cta"]:has-text("Sign In / Join Now")')).toBeVisible();
    const buttonVisible = await marketingPage.isSignInJoinNowButtonVisible();
    expect(buttonVisible).toBe(true);
    
    // Verify button is enabled
    await expect(page.locator('[data-testid="scorecard-cta"]:has-text("Sign In / Join Now")')).toBeEnabled();
    
    // Click 'Sign In / Join Now' button
    await marketingPage.clickSignInJoinNowButton();
    
    // Verify redirect to Sign In page
    await expect(page).toHaveURL(TD.urlPatterns.signInPage);
  });

  test('[QS-124][TC-008] Verify successful sign-in redirects user back to Scorecard marketing page', async ({ page }) => {
    // Navigate to Scorecard marketing page as guest
    await marketingPage.goto();
    
    // Click 'Sign In / Join Now' button
    await marketingPage.scrollToComparisonSection();
    await marketingPage.clickSignInJoinNowButton();
    await expect(page).toHaveURL(TD.urlPatterns.signInPage);
    
    // Enter valid credentials and sign in
    await marketingPage.signIn(TD.credentials.validUser.username, TD.credentials.validUser.password);
    
    // Verify successful authentication and redirect
    await expect(page).toHaveURL(TD.urlPatterns.marketingPage);
    
    // Verify Scorecard tile now displays 'View Account' button
    await marketingPage.scrollToComparisonSection();
    const viewAccountVisible = await marketingPage.isScorecardViewAccountButtonVisible();
    expect(viewAccountVisible).toBe(true);
    
    // Verify 'Sign In / Join Now' is NOT displayed
    const signInVisible = await marketingPage.isSignInJoinNowButtonVisible();
    expect(signInVisible).toBe(false);
  });

  test('[QS-126][TC-009] Verify Sign In / Join Now button behavior with invalid credentials', async ({ page }) => {
    // Navigate to Scorecard marketing page as guest
    await marketingPage.goto();
    
    // Click 'Sign In / Join Now' button
    await marketingPage.scrollToComparisonSection();
    await marketingPage.clickSignInJoinNowButton();
    await expect(page).toHaveURL(TD.urlPatterns.signInPage);
    
    // Enter invalid credentials
    await marketingPage.signIn(TD.credentials.invalidUser.username, TD.credentials.invalidUser.password);
    
    // Verify error message displays
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    const errorText = await marketingPage.getErrorMessageText();
    expect(errorText).toContain(TD.errors.invalidCredentials);
    
    // Verify user remains on Sign In page
    await expect(page).toHaveURL(TD.urlPatterns.signInPage);
    
    // Verify user can retry authentication
    await expect(page.locator('[data-testid="username-input"]')).toBeEnabled();
    await expect(page.locator('[data-testid="password-input"]')).toBeEnabled();
  });
});