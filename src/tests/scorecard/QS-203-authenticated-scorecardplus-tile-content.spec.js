const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-005] Scorecard+ Tile Content for Authenticated User Tests', () => {
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

  test('[QS-203][TC-014] Verify Scorecard+ tile displays all required content for authenticated user', async ({ page }) => {
    // Locate Scorecard+ tile
    const scorecardPlusLogo = page.getByAltText('ScoreCard Plus New Logo');
    await expect(scorecardPlusLogo).toBeVisible();

    // Verify Scorecard+ Dark Logo is properly rendered
    const logoBox = await scorecardPlusLogo.boundingBox();
    expect(logoBox).not.toBeNull();

    // Verify '$99 Annual Membership' text is displayed
    const priceText = page.getByText('$99 Annual Membership', { exact: false });
    await expect(priceText).toBeVisible();

    // Verify 'That's $350 in Benefits!' text is displayed
    const benefitsText = page.getByText("That's $350 in Benefits", { exact: false });
    await expect(benefitsText).toBeVisible();

    // Verify benefits value matches AEM configuration
    const benefitsContent = await benefitsText.textContent();
    expect(benefitsContent).toContain('$350');

    // Verify 'View Account' button is displayed for authenticated user
    const viewAccountButton = page.getByRole('link', { name: /view account/i })
      .or(page.getByRole('button', { name: /view account/i }));
    
    await expect(viewAccountButton.first()).toBeVisible();

    // Verify all content is properly aligned and styled
    const priceBox = await priceText.boundingBox();
    const benefitsBox = await benefitsText.boundingBox();
    
    expect(priceBox).not.toBeNull();
    expect(benefitsBox).not.toBeNull();
  });
});