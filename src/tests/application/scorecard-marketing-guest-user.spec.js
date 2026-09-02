const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-107: Scorecard Marketing Page Guest User Flow', { tag: ['@regression'] }, () => {
  let marketingPage;

  test.beforeEach(async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    await marketingPage.setViewportSize(TD.viewportSizes.desktop1920.width, TD.viewportSizes.desktop1920.height);
  });

  test('[QS-189] Verify guest user sees Sign In / Join Now button on Scorecard tile and successful redirect flow', async ({ page }) => {
    // Navigate to Scorecard marketing page as guest
    await marketingPage.goto();
    
    // Verify Sign In / Join Now button is visible on Scorecard tile
    await expect(page.locator('button:has-text("Sign In / Join Now")')).toBeVisible();
    const isSignInButtonVisible = await marketingPage.isScorecardSignInButtonVisible();
    expect(isSignInButtonVisible).toBe(true);
    
    // Click Sign In / Join Now button
    await marketingPage.clickScorecardSignInButton();
    
    // Verify redirect to Sign In page
    await expect(page).toHaveURL(TD.urlPatterns.signIn);
    
    // Enter valid credentials
    await marketingPage.fillSignInCredentials(TD.credentials.valid.username, TD.credentials.valid.password);
    
    // Click Sign In button
    await marketingPage.clickSignInSubmit();
    
    // Verify redirect back to Scorecard marketing page
    await expect(page).toHaveURL(TD.urlPatterns.scorecardMarketing);
    
    // Verify authenticated user view with View Account button
    await expect(page.locator('button:has-text("View Account")')).toBeVisible();
    const isViewAccountVisible = await marketingPage.isScorecardViewAccountButtonVisible();
    expect(isViewAccountVisible).toBe(true);
  });

  test('[QS-191] Verify Sign In / Join Now button is clickable and properly styled for guest user', async ({ page }) => {
    // Navigate to Scorecard marketing page as guest
    await marketingPage.goto();
    
    // Verify button is visible and properly positioned
    await expect(page.locator('button:has-text("Sign In / Join Now")')).toBeVisible();
    
    // Verify button text
    const signInButton = page.locator('button:has-text("Sign In / Join Now")');
    await expect(signInButton).toHaveText(/Sign In.*Join Now/i);
    
    // Hover over button and verify hover state
    await signInButton.hover();
    
    // Verify button is keyboard accessible
    await page.keyboard.press('Tab');
    await expect(signInButton).toBeFocused();
    
    // Press Enter key while button is focused
    await page.keyboard.press('Enter');
    
    // Verify button click action is triggered (redirect to sign in)
    await expect(page).toHaveURL(TD.urlPatterns.signIn, { timeout: 10000 });
  });

  test('[QS-193] Verify guest user redirect preserves marketing page URL after failed sign-in attempt', async ({ page }) => {
    // Navigate to Scorecard marketing page as guest
    await marketingPage.goto();
    
    // Click Sign In / Join Now button
    await marketingPage.clickScorecardSignInButton();
    await expect(page).toHaveURL(TD.urlPatterns.signIn);
    
    // Enter invalid credentials
    await marketingPage.fillSignInCredentials(TD.credentials.invalid.username, TD.credentials.invalid.password);
    await marketingPage.clickSignInSubmit();
    
    // Verify error message is displayed
    await page.waitForTimeout(2000); // Wait for error to appear
    const isErrorVisible = await marketingPage.isSignInErrorVisible();
    expect(isErrorVisible).toBe(true);
    
    // Clear fields and enter valid credentials
    await marketingPage.fillSignInCredentials(TD.credentials.valid.username, TD.credentials.valid.password);
    await marketingPage.clickSignInSubmit();
    
    // Verify redirect back to Scorecard marketing page
    await expect(page).toHaveURL(TD.urlPatterns.scorecardMarketing);
  });
});