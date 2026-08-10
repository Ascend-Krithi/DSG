const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-107: Scorecard Marketing Page Sign Out Flow', { tag: ['@regression'] }, () => {
  let marketingPage;

  test.beforeEach(async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    await marketingPage.setViewportSize(TD.viewportSizes.desktop1920.width, TD.viewportSizes.desktop1920.height);
  });

  test('[QS-213] Verify guest user sees Join Now button after signing out and returning to marketing page', async ({ page }) => {
    // Sign in
    await page.goto(TD.urls.signIn);
    await marketingPage.fillSignInCredentials(TD.credentials.valid.username, TD.credentials.valid.password);
    await marketingPage.clickSignInSubmit();
    await page.waitForLoadState('domcontentloaded');
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify View Account buttons are displayed
    await expect(page.locator('button:has-text("View Account")')).toBeVisible();
    
    // Sign out
    await marketingPage.clickSignOut();
    
    // Return to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify Join Now button is displayed on Scorecard+ tile
    await expect(page.locator('button:has-text("Join Now")')).toBeVisible();
    const isJoinButtonVisible = await marketingPage.isScorecardPlusJoinButtonVisible();
    expect(isJoinButtonVisible).toBe(true);
    
    // Verify all static content remains unchanged
    await expect(page.locator('[data-testid="scorecard-plus-logo"], img[alt*="Scorecard Plus"]')).toBeVisible();
    await expect(page.locator('text=$99 Annual Membership')).toBeVisible();
    await expect(page.locator('text=/That\'s \$350 in Benefits!/')).toBeVisible();
  });

  test('[QS-215] Verify CTA changes from View Account to Join Now after sign out on Scorecard+ tile', async ({ page }) => {
    // Sign in
    await page.goto(TD.urls.signIn);
    await marketingPage.fillSignInCredentials(TD.credentials.valid.username, TD.credentials.valid.password);
    await marketingPage.clickSignInSubmit();
    await page.waitForLoadState('domcontentloaded');
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify View Account button on Scorecard+ tile
    await expect(page.locator('button:has-text("View Account")').last()).toBeVisible();
    
    // Sign out
    await marketingPage.clickSignOut();
    
    // Return to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify button text changed to Join Now
    await expect(page.locator('button:has-text("Join Now")')).toBeVisible();
    
    // Verify button is clickable
    const joinButton = page.locator('button:has-text("Join Now")');
    await expect(joinButton).toBeEnabled();
    
    // Click Join Now button
    await marketingPage.clickScorecardPlusJoinButton();
    
    // Verify redirect to join/registration page
    await expect(page).toHaveURL(TD.urlPatterns.joinNow, { timeout: 10000 });
  });

  test('[QS-217] Verify CTA changes from View Account to Sign In / Join Now after sign out on Scorecard tile', async ({ page }) => {
    // Sign in
    await page.goto(TD.urls.signIn);
    await marketingPage.fillSignInCredentials(TD.credentials.valid.username, TD.credentials.valid.password);
    await marketingPage.clickSignInSubmit();
    await page.waitForLoadState('domcontentloaded');
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify View Account button on Scorecard tile
    await expect(page.locator('button:has-text("View Account")').first()).toBeVisible();
    
    // Sign out
    await marketingPage.clickSignOut();
    
    // Return to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify button text changed to Sign In / Join Now
    await expect(page.locator('button:has-text("Sign In / Join Now")')).toBeVisible();
    
    // Verify button is clickable
    const signInButton = page.locator('button:has-text("Sign In / Join Now")');
    await expect(signInButton).toBeEnabled();
    
    // Click Sign In / Join Now button
    await marketingPage.clickScorecardSignInButton();
    
    // Verify redirect to Sign In page
    await expect(page).toHaveURL(TD.urlPatterns.signIn, { timeout: 10000 });
  });
});