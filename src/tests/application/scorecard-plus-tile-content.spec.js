const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][TS-005] Scorecard+ Tile Content Display', { tag: ['@smoke', '@regression', '@scorecard'] }, () => {
  let marketingPage;

  test('[QS-134][TC-013] Verify Scorecard+ tile displays all required content for guest user', async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    
    // Clear cookies to ensure guest state
    await marketingPage.clearCookiesAndCache();
    await marketingPage.setViewportSize(TD.resolutions.desktop.width, TD.resolutions.desktop.height);
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.marketingPage);
    
    // Locate Scorecard+ tile
    await marketingPage.scrollToComparisonSection();
    await expect(page.locator('[data-testid="scorecard-plus-tile"]')).toBeVisible();
    
    // Verify Scorecard+ Dark Logo is displayed
    const darkLogoVisible = await marketingPage.isScorecardPlusDarkLogoVisible();
    expect(darkLogoVisible).toBe(true);
    
    // Verify '$99 Annual Membership' text is displayed
    await expect(page.locator('text=$99 Annual Membership')).toBeVisible();
    
    // Verify 'That's $350 in Benefits!' text is displayed
    const benefitsText = await marketingPage.getBenefitsValueText();
    expect(benefitsText).toContain(TD.content.benefitsValueInitial);
    
    // Verify 'Join Now' button is displayed for guest user
    const joinNowVisible = await marketingPage.isJoinNowButtonVisible();
    expect(joinNowVisible).toBe(true);
    
    // Verify content alignment
    await expect(page.locator('[data-testid="scorecard-plus-tile"]')).toBeVisible();
  });

  test('[QS-136][TC-014] Verify Scorecard+ tile displays all required content for authenticated user', async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    await marketingPage.setViewportSize(TD.resolutions.desktop.width, TD.resolutions.desktop.height);
    
    // Authenticate user
    await marketingPage.gotoSignInPage();
    await marketingPage.signIn(TD.credentials.validUser.username, TD.credentials.validUser.password);
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.marketingPage);
    
    // Locate Scorecard+ tile
    await marketingPage.scrollToComparisonSection();
    await expect(page.locator('[data-testid="scorecard-plus-tile"]')).toBeVisible();
    
    // Verify Scorecard+ Dark Logo is displayed
    const darkLogoVisible = await marketingPage.isScorecardPlusDarkLogoVisible();
    expect(darkLogoVisible).toBe(true);
    
    // Verify '$99 Annual Membership' text is displayed
    await expect(page.locator('text=$99 Annual Membership')).toBeVisible();
    
    // Verify 'That's $350 in Benefits!' text is displayed
    const benefitsText = await marketingPage.getBenefitsValueText();
    expect(benefitsText).toContain(TD.content.benefitsValueInitial);
    
    // Verify 'View Account' button is displayed for authenticated user
    const viewAccountVisible = await marketingPage.isScorecardPlusViewAccountButtonVisible();
    expect(viewAccountVisible).toBe(true);
    
    // Verify 'Join Now' button is NOT displayed
    const joinNowVisible = await marketingPage.isJoinNowButtonVisible();
    expect(joinNowVisible).toBe(false);
  });

  test('[QS-138][TC-015] Verify Scorecard+ Dark Logo image quality and loading', async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    await marketingPage.setViewportSize(TD.resolutions.desktop.width, TD.resolutions.desktop.height);
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.marketingPage);
    
    // Locate Scorecard+ tile
    await marketingPage.scrollToComparisonSection();
    const tileVisible = await marketingPage.isScorecardPlusTileVisible();
    expect(tileVisible).toBe(true);
    
    // Verify Dark Logo is loaded
    const logoLoaded = await marketingPage.isImageLoaded((page) => page.locator('[data-testid="scorecard-plus-logo"]'));
    expect(logoLoaded).toBe(true);
    
    // Verify logo dimensions
    const dimensions = await marketingPage.getImageDimensions((page) => page.locator('[data-testid="scorecard-plus-logo"]'));
    expect(dimensions.width).toBeGreaterThan(0);
    expect(dimensions.height).toBeGreaterThan(0);
    
    // Verify logo alt text for accessibility
    const altText = await marketingPage.getScorecardPlusDarkLogoAltText();
    expect(altText).toBeTruthy();
    
    // Test logo at different zoom levels
    await page.evaluate(() => document.body.style.zoom = '0.5');
    const logoVisible50 = await marketingPage.isScorecardPlusDarkLogoVisible();
    expect(logoVisible50).toBe(true);
    
    await page.evaluate(() => document.body.style.zoom = '1.5');
    const logoVisible150 = await marketingPage.isScorecardPlusDarkLogoVisible();
    expect(logoVisible150).toBe(true);
  });
});