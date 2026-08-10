const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-107: Scorecard+ Tile CTA Buttons', { tag: ['@regression'] }, () => {
  let marketingPage;

  test.beforeEach(async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    await marketingPage.setViewportSize(TD.viewportSizes.desktop1920.width, TD.viewportSizes.desktop1920.height);
  });

  test('[QS-207] Verify authenticated user sees clickable View Account button on Scorecard+ tile', async ({ page }) => {
    // Sign in
    await page.goto(TD.urls.signIn);
    await marketingPage.fillSignInCredentials(TD.credentials.valid.username, TD.credentials.valid.password);
    await marketingPage.clickSignInSubmit();
    await page.waitForLoadState('domcontentloaded');
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    const viewAccountButton = page.locator('[data-testid="scorecard-plus-view-account-btn"], button:has-text("View Account")').last();
    
    // Verify button is visible
    await expect(viewAccountButton).toBeVisible();
    
    // Hover over button
    await viewAccountButton.hover();
    
    // Verify button is not disabled
    await expect(viewAccountButton).toBeEnabled();
    
    // Click button
    await marketingPage.clickScorecardPlusViewAccountButton();
    
    // Verify action is triggered
    await expect(page).toHaveURL(TD.urlPatterns.mauiAccountSummary, { timeout: 10000 });
  });

  test('[QS-209] Verify View Account button on Scorecard+ tile is keyboard accessible', async ({ page }) => {
    // Sign in
    await page.goto(TD.urls.signIn);
    await marketingPage.fillSignInCredentials(TD.credentials.valid.username, TD.credentials.valid.password);
    await marketingPage.clickSignInSubmit();
    await page.waitForLoadState('domcontentloaded');
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    const viewAccountButton = page.locator('[data-testid="scorecard-plus-view-account-btn"], button:has-text("View Account")').last();
    
    // Tab to button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Verify focus indicator is visible
    await expect(viewAccountButton).toBeFocused();
    
    // Press Enter key
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(TD.urlPatterns.mauiAccountSummary, { timeout: 10000 });
  });

  test('[QS-211] Verify View Account button on both tiles have consistent behavior for authenticated user', async ({ page }) => {
    // Sign in
    await page.goto(TD.urls.signIn);
    await marketingPage.fillSignInCredentials(TD.credentials.valid.username, TD.credentials.valid.password);
    await marketingPage.clickSignInSubmit();
    await page.waitForLoadState('domcontentloaded');
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    const scorecardButton = page.locator('button:has-text("View Account")').first();
    const scorecardPlusButton = page.locator('button:has-text("View Account")').last();
    
    // Verify both buttons are visible
    await expect(scorecardButton).toBeVisible();
    await expect(scorecardPlusButton).toBeVisible();
    
    // Verify both buttons have identical text
    await expect(scorecardButton).toHaveText(/View Account/i);
    await expect(scorecardPlusButton).toHaveText(/View Account/i);
    
    // Click View Account on Scorecard tile
    await marketingPage.clickScorecardViewAccountButton();
    await expect(page).toHaveURL(TD.urlPatterns.mauiAccountSummary);
    
    // Navigate back
    await page.goBack();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardMarketing);
    
    // Click View Account on Scorecard+ tile
    await marketingPage.clickScorecardPlusViewAccountButton();
    await expect(page).toHaveURL(TD.urlPatterns.mauiAccountSummary);
  });
});