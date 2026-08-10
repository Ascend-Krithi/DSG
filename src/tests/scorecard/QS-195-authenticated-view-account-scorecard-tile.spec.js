const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-004] Authenticated User Scorecard Tile CTA Tests', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Sign in to application (prerequisite)
    await page.goto('https://dickssportinggoods.dksxchange.com/LogonForm');
    await page.waitForURL(/.*LogonForm.*|.*sso.*login.*/i, { timeout: 10000 });
    
    const usernameField = page.locator('input[type="email"], input[name="username"], input[id*="email"]').first();
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
  });

  test('[QS-195][TC-010] Verify authenticated user sees View Account button on Scorecard tile and navigation to MAUI Account Summary', async ({ page }) => {
    // Verify 'View Account' button is displayed on Scorecard tile
    const viewAccountButton = page.getByRole('link', { name: /view account/i })
      .or(page.getByRole('button', { name: /view account/i }));
    
    await expect(viewAccountButton.first()).toBeVisible();

    // Verify button is clickable
    const buttonElement = viewAccountButton.first();
    await buttonElement.hover();
    
    const cursor = await buttonElement.evaluate((el) => window.getComputedStyle(el).cursor);
    expect(cursor).toMatch(/pointer|hand/);

    // Click 'View Account' button
    await buttonElement.click();

    // Verify user is navigated to MAUI Account Summary page
    await page.waitForTimeout(3000);
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/account|profile|summary|dashboard/i);

    // Verify MAUI Account Summary page loads successfully
    await page.waitForLoadState('domcontentloaded');
    const pageContent = await page.locator('body').textContent();
    expect(pageContent.length).toBeGreaterThan(0);
  });
});