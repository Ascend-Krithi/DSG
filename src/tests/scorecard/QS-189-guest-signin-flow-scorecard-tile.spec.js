const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-003] Guest User Scorecard Tile CTA Tests', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize({ width: 1920, height: 1080 });
    await scorecardPage.goto();
  });

  test('[QS-189][TC-007] Verify guest user sees Sign In / Join Now button on Scorecard tile and successful redirect flow', async ({ page }) => {
    // Verify 'Sign In / Join Now' button is displayed on Scorecard tile
    const signInButton = page.getByRole('link', { name: /sign in \/ join now/i })
      .or(page.getByRole('button', { name: /sign in \/ join now/i }))
      .or(page.getByText('Sign in to earn', { exact: false }));
    
    await expect(signInButton.first()).toBeVisible();

    // Click 'Sign In / Join Now' button
    await signInButton.first().click();

    // Verify user is redirected to Sign In page
    await page.waitForURL(/.*LogonForm.*|.*sso.*login.*/i, { timeout: 10000 });
    
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/LogonForm|sso.*login/);

    // Enter valid username
    const usernameField = page.locator('input[type="email"], input[name="username"], input[id*="email"], input[id*="username"]').first();
    await expect(usernameField).toBeVisible();
    await usernameField.fill('testuser@example.com');

    // Click continue or sign in button
    const continueButton = page.getByRole('button', { name: /continue|sign in/i });
    await continueButton.click();

    // Enter valid password
    await page.waitForTimeout(1000);
    const passwordField = page.locator('input[type="password"]').first();
    await expect(passwordField).toBeVisible({ timeout: 5000 });
    await passwordField.fill('Test@123');

    // Click Sign In button
    const signInSubmitButton = page.getByRole('button', { name: /sign in|log in|continue/i });
    await signInSubmitButton.click();

    // Verify redirect back to Scorecard marketing page
    await page.waitForURL(/.*ScoreCard.*/i, { timeout: 15000 });
    expect(page.url()).toContain('ScoreCard');

    // Verify user is now authenticated with 'View Account' button
    const viewAccountButton = page.getByRole('link', { name: /view account/i })
      .or(page.getByRole('button', { name: /view account/i }));
    
    await expect(viewAccountButton.first()).toBeVisible({ timeout: 5000 });
  });
});