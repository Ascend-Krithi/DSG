const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-007] Dynamic CTA Change After Sign Out Tests', () => {
  let scorecardPage;

  test('[QS-215][TC-020] Verify CTA changes from View Account to Join Now after sign out on Scorecard+ tile', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Sign in to application
    await page.goto('https://dickssportinggoods.dksxchange.com/LogonForm');
    await page.waitForURL(/.*LogonForm.*|.*sso.*login.*/i, { timeout: 10000 });
    
    const usernameField = page.locator('input[type="email"], input[name="username"]').first();
    await usernameField.fill('testuser@example.com');
    
    const continueButton = page.getByRole('button', { name: /continue|sign in/i });
    await continueButton.click();
    
    await page.waitForTimeout(1000);
    const passwordField = page.locator('input[type="password"]').first();
    await passwordField.fill('Test@123');
    
    const signInButton = page.getByRole('button', { name: /sign in|log in|continue/i });
    await signInButton.click();
    
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    // Navigate to Scorecard marketing page
    await scorecardPage.goto();

    // Verify 'View Account' button on Scorecard+ tile
    const viewAccountButton = page.getByRole('link', { name: /view account/i })
      .or(page.getByRole('button', { name: /view account/i }));
    await expect(viewAccountButton.first()).toBeVisible();

    // Sign out from application
    await page.goto('https://dickssportinggoods.dksxchange.com/');
    const signOutLink = page.getByRole('link', { name: /sign out|log out/i })
      .or(page.getByRole('button', { name: /sign out|log out/i }));
    
    const signOutVisible = await signOutLink.isVisible().catch(() => false);
    if (signOutVisible) {
      await signOutLink.click();
      await page.waitForTimeout(2000);
    }

    // Return to Scorecard marketing page
    await scorecardPage.goto();

    // Verify button text changed to 'Join Now'
    const joinNowButton = page.getByRole('button', { name: /join now/i })
      .or(page.getByRole('link', { name: /join now/i }));
    await expect(joinNowButton.first()).toBeVisible();

    // Verify button is clickable
    await joinNowButton.first().hover();
    const cursor = await joinNowButton.first().evaluate((el) => window.getComputedStyle(el).cursor);
    expect(cursor).toMatch(/pointer|hand/);
  });
});