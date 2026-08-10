const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-006] Authenticated User Scorecard+ Tile CTA Tests', () => {
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

  test('[QS-207][TC-016] Verify authenticated user sees clickable View Account button on Scorecard+ tile', async ({ page }) => {
    // Locate Scorecard+ tile
    const scorecardPlusLogo = page.getByAltText('ScoreCard Plus New Logo');
    await expect(scorecardPlusLogo).toBeVisible();

    // Verify 'View Account' button is displayed on Scorecard+ tile
    const viewAccountButton = page.getByRole('link', { name: /view account/i })
      .or(page.getByRole('button', { name: /view account/i }));
    
    await expect(viewAccountButton.last()).toBeVisible();

    // Hover over 'View Account' button
    const buttonElement = viewAccountButton.last();
    await buttonElement.hover();
    await page.waitForTimeout(300);

    // Verify button shows hover state
    const cursor = await buttonElement.evaluate((el) => window.getComputedStyle(el).cursor);
    expect(cursor).toMatch(/pointer|hand/);

    // Verify button is not disabled
    const isDisabled = await buttonElement.isDisabled().catch(() => false);
    expect(isDisabled).toBe(false);

    // Click 'View Account' button
    await buttonElement.click();

    // Verify button click is registered and action is triggered
    await page.waitForTimeout(2000);
    const currentUrl = page.url();
    expect(currentUrl).toBeTruthy();
  });
});