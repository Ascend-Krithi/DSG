const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-003] Guest User Sign In Retry Flow Tests', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize({ width: 1920, height: 1080 });
    await scorecardPage.goto();
  });

  test('[QS-193][TC-009] Verify guest user redirect preserves marketing page URL after failed sign-in attempt', async ({ page }) => {
    // Click 'Sign In / Join Now' button on Scorecard tile
    const signInButton = page.getByRole('link', { name: /sign in \/ join now/i })
      .or(page.getByRole('button', { name: /sign in \/ join now/i }))
      .or(page.getByText('Sign in to earn', { exact: false }));
    
    await signInButton.first().click();

    // Wait for redirect to Sign In page
    await page.waitForURL(/.*LogonForm.*|.*sso.*login.*/i, { timeout: 10000 });

    // Enter invalid username
    const usernameField = page.locator('input[type="email"], input[name="username"], input[id*="email"], input[id*="username"]').first();
    await expect(usernameField).toBeVisible();
    await usernameField.fill('wronguser@example.com');

    // Click continue
    const continueButton = page.getByRole('button', { name: /continue|sign in/i });
    await continueButton.click();

    // Enter invalid password
    await page.waitForTimeout(1000);
    const passwordField = page.locator('input[type="password"]').first();
    await expect(passwordField).toBeVisible({ timeout: 5000 });
    await passwordField.fill('WrongPass123');

    // Click Sign In button
    const signInSubmitButton = page.getByRole('button', { name: /sign in|log in|continue/i });
    await signInSubmitButton.click();

    // Verify error message is displayed
    await page.waitForTimeout(2000);
    const errorMessage = page.locator('text=/invalid|incorrect|wrong|error/i, [role="alert"], .error, .alert').first();
    const errorVisible = await errorMessage.isVisible().catch(() => false);
    expect(errorVisible).toBe(true);

    // Clear fields and enter valid username
    await usernameField.clear();
    await usernameField.fill('testuser@example.com');

    // Click continue if needed
    const continueButtonRetry = page.getByRole('button', { name: /continue|sign in/i });
    await continueButtonRetry.click().catch(() => {});

    // Enter valid password
    await page.waitForTimeout(1000);
    await passwordField.clear();
    await passwordField.fill('Test@123');

    // Click Sign In button
    await signInSubmitButton.click();

    // Verify redirect to Scorecard marketing page
    await page.waitForURL(/.*ScoreCard.*/i, { timeout: 15000 });
    expect(page.url()).toContain('ScoreCard');
  });
});