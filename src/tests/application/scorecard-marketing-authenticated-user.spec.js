const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-107: Scorecard Marketing Page Authenticated User Flow', { tag: ['@regression'] }, () => {
  let marketingPage;

  test.beforeEach(async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    await marketingPage.setViewportSize(TD.viewportSizes.desktop1920.width, TD.viewportSizes.desktop1920.height);
    
    // Sign in before each test
    await page.goto(TD.urls.signIn);
    await marketingPage.fillSignInCredentials(TD.credentials.valid.username, TD.credentials.valid.password);
    await marketingPage.clickSignInSubmit();
    await page.waitForLoadState('domcontentloaded');
  });

  test('[QS-195] Verify authenticated user sees View Account button on Scorecard tile and navigation to MAUI Account Summary', async ({ page }) => {
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify View Account button is displayed on Scorecard tile
    await expect(page.locator('[data-testid="scorecard-view-account-btn"], button:has-text("View Account")')).toBeVisible();
    const isViewAccountVisible = await marketingPage.isScorecardViewAccountButtonVisible();
    expect(isViewAccountVisible).toBe(true);
    
    // Click View Account button
    await marketingPage.clickScorecardViewAccountButton();
    
    // Verify navigation to MAUI Account Summary page
    await expect(page).toHaveURL(TD.urlPatterns.mauiAccountSummary);
    
    // Verify MAUI Account Summary page loads
    const isAccountSummaryVisible = await marketingPage.isAccountSummaryVisible();
    expect(isAccountSummaryVisible).toBe(true);
  });

  test('[QS-197] Verify View Account button styling and accessibility for authenticated user on Scorecard tile', async ({ page }) => {
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    const viewAccountButton = page.locator('button:has-text("View Account")').first();
    
    // Verify button is visible
    await expect(viewAccountButton).toBeVisible();
    
    // Verify button text
    await expect(viewAccountButton).toHaveText(/View Account/i);
    
    // Hover over button
    await viewAccountButton.hover();
    
    // Tab to button using keyboard
    await page.keyboard.press('Tab');
    await expect(viewAccountButton).toBeFocused();
    
    // Press Enter key
    await page.keyboard.press('Enter');
    
    // Verify button action is triggered
    await expect(page).toHaveURL(TD.urlPatterns.mauiAccountSummary, { timeout: 10000 });
  });

  test('[QS-199] Verify View Account button opens MAUI Account Summary in same tab/window', async ({ page }) => {
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Note current number of open tabs
    const initialTabCount = await marketingPage.getTabCount();
    
    // Click View Account button
    await marketingPage.clickScorecardViewAccountButton();
    
    // Verify MAUI Account Summary page loads in same tab
    await expect(page).toHaveURL(TD.urlPatterns.mauiAccountSummary);
    
    // Verify tab count remains unchanged
    const currentTabCount = await marketingPage.getTabCount();
    expect(currentTabCount).toBe(initialTabCount);
    
    // Click browser back button
    await page.goBack();
    
    // Verify marketing page is restored
    await expect(page).toHaveURL(TD.urlPatterns.scorecardMarketing);
  });
});