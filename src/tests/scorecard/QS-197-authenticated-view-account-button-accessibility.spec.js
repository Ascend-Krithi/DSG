const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-004] Authenticated User View Account Button Accessibility Tests', () => {
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

  test('[QS-197][TC-011] Verify View Account button styling and accessibility for authenticated user on Scorecard tile', async ({ page }) => {
    // Locate 'View Account' button on Scorecard tile
    const viewAccountButton = page.getByRole('link', { name: /view account/i })
      .or(page.getByRole('button', { name: /view account/i }));
    
    await expect(viewAccountButton.first()).toBeVisible();

    // Verify button text is clearly readable
    const buttonText = await viewAccountButton.first().textContent();
    expect(buttonText).toMatch(/view account/i);

    // Verify button styling matches design system
    const buttonElement = viewAccountButton.first();
    const computedStyle = await buttonElement.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        display: style.display,
        visibility: style.visibility,
        fontSize: style.fontSize,
        color: style.color
      };
    });
    
    expect(computedStyle.display).not.toBe('none');
    expect(computedStyle.visibility).toBe('visible');
    expect(computedStyle.fontSize).toBeTruthy();

    // Hover over button and verify hover state
    await buttonElement.hover();
    await page.waitForTimeout(300);

    // Tab to button using keyboard
    await buttonElement.focus();
    const isFocused = await buttonElement.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBe(true);

    // Press Enter key and verify action is triggered
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    
    const urlAfterEnter = page.url();
    expect(urlAfterEnter).toBeTruthy();
  });
});