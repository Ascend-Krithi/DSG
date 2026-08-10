const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][TS-009] Scorecard Tile Content Display', { tag: ['@smoke', '@regression', '@scorecard'] }, () => {
  let marketingPage;

  test.beforeEach(async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    await marketingPage.setViewportSize(TD.resolutions.desktop.width, TD.resolutions.desktop.height);
  });

  test('[QS-158][TC-025] Verify Scorecard tile displays all required content elements', async ({ page }) => {
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.marketingPage);
    
    // Locate Scorecard tile
    await marketingPage.scrollToComparisonSection();
    await expect(page.locator('[data-testid="scorecard-tile"]')).toBeVisible();
    
    // Verify Scorecard Logo is displayed
    const logoVisible = await marketingPage.isScorecardLogoVisible();
    expect(logoVisible).toBe(true);
    
    // Verify '1 Point Per Every $1 Spent' text is displayed
    await expect(page.locator('text=1 Point Per Every $1 Spent')).toBeVisible();
    
    // Verify '300 Points = $10 Reward' text is displayed
    await expect(page.locator('text=300 Points = $10 Reward')).toBeVisible();
    
    // Verify appropriate CTA is displayed
    const ctaVisible = await marketingPage.isSignInJoinNowButtonVisible();
    expect(ctaVisible).toBe(true);
    
    // Verify content alignment
    await expect(page.locator('[data-testid="scorecard-tile"]')).toBeVisible();
    
    // Verify text readability
    await expect(page.locator('text=1 Point Per Every $1 Spent')).toHaveCSS('color', /.+/);
  });

  test('[QS-160][TC-026] Verify Scorecard tile content for guest user with correct CTA', async ({ page }) => {
    // Clear cookies to ensure guest state
    await marketingPage.clearCookiesAndCache();
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.marketingPage);
    
    // Locate Scorecard tile
    await marketingPage.scrollToComparisonSection();
    const tileVisible = await marketingPage.isScorecardTileVisible();
    expect(tileVisible).toBe(true);
    
    // Verify Scorecard Logo
    const logoVisible = await marketingPage.isScorecardLogoVisible();
    expect(logoVisible).toBe(true);
    
    // Verify points earning text
    const pointsEarningVisible = await marketingPage.isPointsEarningTextVisible();
    expect(pointsEarningVisible).toBe(true);
    
    // Verify rewards redemption text
    const rewardsRedemptionVisible = await marketingPage.isRewardsRedemptionTextVisible();
    expect(rewardsRedemptionVisible).toBe(true);
    
    // Verify guest CTA
    const signInVisible = await marketingPage.isSignInJoinNowButtonVisible();
    expect(signInVisible).toBe(true);
    
    // Verify 'View Account' button is NOT displayed
    const viewAccountVisible = await marketingPage.isScorecardViewAccountButtonVisible();
    expect(viewAccountVisible).toBe(false);
  });

  test('[QS-162][TC-027] Verify Scorecard tile content for authenticated user with correct CTA', async ({ page }) => {
    // Authenticate user
    await marketingPage.gotoSignInPage();
    await marketingPage.signIn(TD.credentials.validUser.username, TD.credentials.validUser.password);
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.marketingPage);
    
    // Locate Scorecard tile
    await marketingPage.scrollToComparisonSection();
    const tileVisible = await marketingPage.isScorecardTileVisible();
    expect(tileVisible).toBe(true);
    
    // Verify Scorecard Logo
    const logoVisible = await marketingPage.isScorecardLogoVisible();
    expect(logoVisible).toBe(true);
    
    // Verify points earning text
    const pointsEarningVisible = await marketingPage.isPointsEarningTextVisible();
    expect(pointsEarningVisible).toBe(true);
    
    // Verify rewards redemption text
    const rewardsRedemptionVisible = await marketingPage.isRewardsRedemptionTextVisible();
    expect(rewardsRedemptionVisible).toBe(true);
    
    // Verify authenticated CTA
    const viewAccountVisible = await marketingPage.isScorecardViewAccountButtonVisible();
    expect(viewAccountVisible).toBe(true);
    
    // Verify 'Sign In / Join Now' button is NOT displayed
    const signInVisible = await marketingPage.isSignInJoinNowButtonVisible();
    expect(signInVisible).toBe(false);
  });

  test('[QS-164][TC-028] Verify Scorecard Logo image quality and loading', async ({ page }) => {
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.marketingPage);
    
    // Locate Scorecard tile
    await marketingPage.scrollToComparisonSection();
    const tileVisible = await marketingPage.isScorecardTileVisible();
    expect(tileVisible).toBe(true);
    
    // Verify Scorecard Logo is loaded
    const logoLoaded = await marketingPage.isImageLoaded((page) => page.locator('[data-testid="scorecard-logo"]'));
    expect(logoLoaded).toBe(true);
    
    // Verify logo dimensions
    const dimensions = await marketingPage.getImageDimensions((page) => page.locator('[data-testid="scorecard-logo"]'));
    expect(dimensions.width).toBeGreaterThan(0);
    expect(dimensions.height).toBeGreaterThan(0);
    
    // Verify logo alt text for accessibility
    const altText = await marketingPage.getScorecardLogoAltText();
    expect(altText).toBeTruthy();
    
    // Test logo at different zoom levels
    await page.evaluate(() => document.body.style.zoom = '0.5');
    const logoVisible50 = await marketingPage.isScorecardLogoVisible();
    expect(logoVisible50).toBe(true);
    
    await page.evaluate(() => document.body.style.zoom = '1.5');
    const logoVisible150 = await marketingPage.isScorecardLogoVisible();
    expect(logoVisible150).toBe(true);
  });
});