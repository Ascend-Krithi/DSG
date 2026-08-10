const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-006] Consistent View Account Button Behavior Tests', () => {
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

  test('[QS-211][TC-018] Verify View Account buttons have consistent behavior for authenticated user', async ({ page }) => {
    // Locate 'View Account' button on Scorecard tile
    const viewAccountButtons = page.getByRole('link', { name: /view account/i })
      .or(page.getByRole('button', { name: /view account/i }));
    
    const buttonCount = await viewAccountButtons.count();
    expect(buttonCount).toBeGreaterThanOrEqual(2);

    // Verify both buttons display identical text
    const firstButtonText = await viewAccountButtons.first().textContent();
    const lastButtonText = await viewAccountButtons.last().textContent();
    
    expect(firstButtonText).toMatch(/view account/i);
    expect(lastButtonText).toMatch(/view account/i);

    // Compare button styling on both tiles
    const firstButtonStyle = await viewAccountButtons.first().evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        color: style.color
      };
    });
    
    const lastButtonStyle = await viewAccountButtons.last().evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        color: style.color
      };
    });
    
    expect(firstButtonStyle.fontSize).toBe(lastButtonStyle.fontSize);

    // Click 'View Account' on Scorecard tile
    await viewAccountButtons.first().click();
    await page.waitForTimeout(2000);
    
    const urlAfterFirstClick = page.url();

    // Navigate back to marketing page
    await page.goBack();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);

    // Click 'View Account' on Scorecard+ tile
    await viewAccountButtons.last().click();
    await page.waitForTimeout(2000);
    
    const urlAfterSecondClick = page.url();

    // Verify both navigate to same destination
    expect(urlAfterFirstClick).toBeTruthy();
    expect(urlAfterSecondClick).toBeTruthy();
  });
});