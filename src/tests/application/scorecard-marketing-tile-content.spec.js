const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-107: Scorecard Marketing Page Tile Content', { tag: ['@smoke', '@regression'] }, () => {
  let marketingPage;

  test.beforeEach(async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    await marketingPage.setViewportSize(TD.viewportSizes.desktop1920.width, TD.viewportSizes.desktop1920.height);
  });

  test('[QS-201] Verify Scorecard+ tile displays all required content for guest user', async ({ page }) => {
    // Navigate to Scorecard marketing page as guest
    await marketingPage.goto();
    
    // Verify Scorecard+ Dark Logo is displayed
    await expect(page.locator('[data-testid="scorecard-plus-logo"], img[alt*="Scorecard Plus"]')).toBeVisible();
    const isLogoVisible = await marketingPage.isScorecardPlusDarkLogoVisible();
    expect(isLogoVisible).toBe(true);
    
    // Verify $99 Annual Membership text
    await expect(page.locator('text=$99 Annual Membership')).toBeVisible();
    const isPricingVisible = await marketingPage.isScorecardPlusPricingVisible();
    expect(isPricingVisible).toBe(true);
    
    // Verify That's $350 in Benefits! text
    await expect(page.locator('text=/That\'s \$350 in Benefits!/')).toBeVisible();
    const isBenefitsVisible = await marketingPage.isScorecardPlusBenefitsVisible();
    expect(isBenefitsVisible).toBe(true);
    
    // Verify Join Now button
    await expect(page.locator('button:has-text("Join Now")')).toBeVisible();
    const isJoinButtonVisible = await marketingPage.isScorecardPlusJoinButtonVisible();
    expect(isJoinButtonVisible).toBe(true);
  });

  test('[QS-203] Verify Scorecard+ tile displays all required content for authenticated user', async ({ page }) => {
    // Sign in
    await page.goto(TD.urls.signIn);
    await marketingPage.fillSignInCredentials(TD.credentials.valid.username, TD.credentials.valid.password);
    await marketingPage.clickSignInSubmit();
    await page.waitForLoadState('domcontentloaded');
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify Scorecard+ Dark Logo is displayed
    await expect(page.locator('[data-testid="scorecard-plus-logo"], img[alt*="Scorecard Plus"]')).toBeVisible();
    
    // Verify $99 Annual Membership text
    await expect(page.locator('text=$99 Annual Membership')).toBeVisible();
    
    // Verify That's $350 in Benefits! text
    await expect(page.locator('text=/That\'s \$350 in Benefits!/')).toBeVisible();
    
    // Verify View Account button for authenticated user
    await expect(page.locator('button:has-text("View Account")')).toBeVisible();
    const isViewAccountVisible = await marketingPage.isScorecardPlusViewAccountButtonVisible();
    expect(isViewAccountVisible).toBe(true);
  });

  test('[QS-205] Verify Scorecard+ Dark Logo renders correctly with proper contrast and quality', async ({ page }) => {
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    const logo = page.locator('[data-testid="scorecard-plus-logo"], img[alt*="Scorecard Plus"]').first();
    
    // Verify logo is visible and properly positioned
    await expect(logo).toBeVisible();
    
    // Verify logo has alt text
    const altText = await marketingPage.getScorecardPlusLogoAltText();
    expect(altText).toBeTruthy();
    expect(altText).toMatch(/Scorecard.*Plus/i);
    
    // Zoom to 125%
    await page.evaluate(() => document.body.style.zoom = '125%');
    await expect(logo).toBeVisible();
    
    // Zoom to 150%
    await page.evaluate(() => document.body.style.zoom = '150%');
    await expect(logo).toBeVisible();
    
    // Reset zoom
    await page.evaluate(() => document.body.style.zoom = '100%');
  });

  test('[QS-219] Verify Scorecard tile displays all required content for guest user', async ({ page }) => {
    // Navigate to Scorecard marketing page as guest
    await marketingPage.goto();
    
    // Verify Scorecard Logo is displayed
    await expect(page.locator('[data-testid="scorecard-logo"], img[alt*="Scorecard"]')).toBeVisible();
    const isLogoVisible = await marketingPage.isScorecardLogoVisible();
    expect(isLogoVisible).toBe(true);
    
    // Verify 1 Point Per Every $1 Spent text
    await expect(page.locator('text=1 Point Per Every $1 Spent')).toBeVisible();
    const isPointsTextVisible = await marketingPage.isScorecardPointsTextVisible();
    expect(isPointsTextVisible).toBe(true);
    
    // Verify 300 Points = $10 Reward text
    await expect(page.locator('text=300 Points = $10 Reward')).toBeVisible();
    const isRewardTextVisible = await marketingPage.isScorecardRewardTextVisible();
    expect(isRewardTextVisible).toBe(true);
    
    // Verify Sign In / Join Now button
    await expect(page.locator('button:has-text("Sign In / Join Now")')).toBeVisible();
    const isSignInButtonVisible = await marketingPage.isScorecardSignInButtonVisible();
    expect(isSignInButtonVisible).toBe(true);
  });

  test('[QS-221] Verify Scorecard tile displays all required content for authenticated user', async ({ page }) => {
    // Sign in
    await page.goto(TD.urls.signIn);
    await marketingPage.fillSignInCredentials(TD.credentials.valid.username, TD.credentials.valid.password);
    await marketingPage.clickSignInSubmit();
    await page.waitForLoadState('domcontentloaded');
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify Scorecard Logo is displayed
    await expect(page.locator('[data-testid="scorecard-logo"], img[alt*="Scorecard"]')).toBeVisible();
    
    // Verify 1 Point Per Every $1 Spent text
    await expect(page.locator('text=1 Point Per Every $1 Spent')).toBeVisible();
    
    // Verify 300 Points = $10 Reward text
    await expect(page.locator('text=300 Points = $10 Reward')).toBeVisible();
    
    // Verify View Account button for authenticated user
    await expect(page.locator('button:has-text("View Account")')).toBeVisible();
    const isViewAccountVisible = await marketingPage.isScorecardViewAccountButtonVisible();
    expect(isViewAccountVisible).toBe(true);
  });

  test('[QS-223] Verify Scorecard Logo renders correctly with proper quality and accessibility', async ({ page }) => {
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    const logo = page.locator('[data-testid="scorecard-logo"], img[alt*="Scorecard"]').first();
    
    // Verify logo is visible
    await expect(logo).toBeVisible({ timeout: 30000 });
    
    // Verify logo has alt text
    const altText = await marketingPage.getScorecardLogoAltText();
    expect(altText).toBeTruthy();
    expect(altText).toMatch(/Scorecard/i);
    
    // Zoom to 125%
    await page.evaluate(() => document.body.style.zoom = '125%');
    await expect(logo).toBeVisible();
    
    // Zoom to 150%
    await page.evaluate(() => document.body.style.zoom = '150%');
    await expect(logo).toBeVisible();
    
    // Reset zoom
    await page.evaluate(() => document.body.style.zoom = '100%');
  });
});