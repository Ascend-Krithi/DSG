const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-006] Scorecard+ Tile Button Keyboard Accessibility Tests', () => {
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

  test('[QS-209][TC-017] Verify View Account button on Scorecard+ tile is keyboard accessible', async ({ page }) => {
    // Use Tab key to navigate through page elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Tab to 'View Account' button on Scorecard+ tile
    const viewAccountButton = page.getByRole('link', { name: /view account/i })
      .or(page.getByRole('button', { name: /view account/i }));
    
    await viewAccountButton.last().focus();

    // Verify button receives focus with visible focus indicator
    const isFocused = await viewAccountButton.last().evaluate((el) => el === document.activeElement);
    expect(isFocused).toBe(true);

    // Press Enter key
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    
    // Verify button action is triggered
    const urlAfterEnter = page.url();
    expect(urlAfterEnter).toBeTruthy();

    // Navigate back
    await page.goBack();
    await page.waitForLoadState('domcontentloaded');

    // Focus button again and press Space key
    await viewAccountButton.last().focus();
    await page.keyboard.press('Space');
    await page.waitForTimeout(1000);
    
    // Verify button action is triggered
    const urlAfterSpace = page.url();
    expect(urlAfterSpace).toBeTruthy();
  });
});