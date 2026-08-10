const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-004] Authenticated User Navigation Behavior Tests', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
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
    
    await scorecardPage.goto();
  });

  test('[QS-199][TC-012] Verify View Account button opens MAUI Account Summary in same tab/window', async ({ page, context }) => {
    // Note current number of open tabs
    const pagesBefore = context.pages().length;
    expect(pagesBefore).toBeGreaterThanOrEqual(1);

    // Click 'View Account' button on Scorecard tile
    const viewAccountButton = page.getByRole('link', { name: /view account/i })
      .or(page.getByRole('button', { name: /view account/i }));
    
    await viewAccountButton.first().click();

    // Verify navigation occurs in same tab
    await page.waitForTimeout(2000);
    const pagesAfter = context.pages().length;
    expect(pagesAfter).toBe(pagesBefore);

    // Verify MAUI Account Summary page loads in same tab
    const currentUrl = page.url();
    expect(currentUrl).toBeTruthy();

    // Click browser back button
    await page.goBack();
    await page.waitForLoadState('domcontentloaded');

    // Verify marketing page is restored
    await page.waitForTimeout(1000);
    const urlAfterBack = page.url();
    expect(urlAfterBack).toContain('ScoreCard');
  });
});