const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][TS-001] Scorecard Marketing Page Desktop Display', { tag: ['@smoke', '@regression', '@scorecard'] }, () => {
  let marketingPage;

  test('[QS-110][TC-001] Verify Scorecard and Scorecard+ tiles display side by side on desktop (1920x1080)', async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    
    // Set desktop resolution
    await marketingPage.setViewportSize(TD.resolutions.desktop.width, TD.resolutions.desktop.height);
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify page loads completely
    await expect(page).toHaveURL(TD.urlPatterns.marketingPage);
    
    // Scroll to comparison section
    await marketingPage.scrollToComparisonSection();
    
    // Verify comparison section is visible
    await expect(page.locator('[data-testid="comparison-section"]')).toBeVisible();
    
    // Verify Scorecard tile is displayed on the left
    await expect(page.locator('[data-testid="scorecard-tile"]')).toBeVisible();
    const scorecardLogoVisible = await marketingPage.isScorecardLogoVisible();
    expect(scorecardLogoVisible).toBe(true);
    const pointsInfoVisible = await marketingPage.isPointsEarningTextVisible();
    expect(pointsInfoVisible).toBe(true);
    
    // Verify Scorecard+ tile is displayed on the right
    await expect(page.locator('[data-testid="scorecard-plus-tile"]')).toBeVisible();
    const darkLogoVisible = await marketingPage.isScorecardPlusDarkLogoVisible();
    expect(darkLogoVisible).toBe(true);
    const pricingVisible = await marketingPage.isAnnualMembershipTextVisible();
    expect(pricingVisible).toBe(true);
    
    // Verify tiles are horizontally aligned
    const areSideBySide = await marketingPage.areTilesSideBySide();
    expect(areSideBySide).toBe(true);
    
    // Verify layout is responsive and centered
    const areCentered = await marketingPage.areTilesCentered();
    expect(areCentered).toBe(true);
  });

  test('[QS-112][TC-002] Verify Scorecard and Scorecard+ tiles display on desktop with minimum supported resolution (1366x768)', async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    
    // Set minimum desktop resolution
    await marketingPage.setViewportSize(TD.resolutions.desktopMin.width, TD.resolutions.desktopMin.height);
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify page loads without horizontal scrollbar
    await expect(page).toHaveURL(TD.urlPatterns.marketingPage);
    
    // Locate comparison section
    await marketingPage.scrollToComparisonSection();
    const comparisonVisible = await marketingPage.isComparisonSectionVisible();
    expect(comparisonVisible).toBe(true);
    
    // Verify both tiles are visible side by side
    await expect(page.locator('[data-testid="scorecard-tile"]')).toBeVisible();
    await expect(page.locator('[data-testid="scorecard-plus-tile"]')).toBeVisible();
    
    // Verify content readability
    await expect(page.locator('text=1 Point Per Every $1 Spent')).toBeVisible();
    await expect(page.locator('text=$99 Annual Membership')).toBeVisible();
    
    // Verify no layout breaking
    const areSideBySide = await marketingPage.areTilesSideBySide();
    expect(areSideBySide).toBe(true);
  });

  test('[QS-114][TC-003] Verify tiles display correctly on desktop with maximum resolution (4K - 3840x2160)', async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    
    // Set 4K resolution
    await marketingPage.setViewportSize(TD.resolutions.desktop4K.width, TD.resolutions.desktop4K.height);
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify page loads with proper scaling
    await expect(page).toHaveURL(TD.urlPatterns.marketingPage);
    
    // Verify tiles are centered
    await marketingPage.scrollToComparisonSection();
    const areCentered = await marketingPage.areTilesCentered();
    expect(areCentered).toBe(true);
    
    // Verify content scaling
    await expect(page.locator('[data-testid="scorecard-tile"]')).toBeVisible();
    await expect(page.locator('[data-testid="scorecard-plus-tile"]')).toBeVisible();
    
    // Verify spacing between tiles
    const areSideBySide = await marketingPage.areTilesSideBySide();
    expect(areSideBySide).toBe(true);
    
    // Verify no pixelation (logos are loaded)
    const scorecardLogoLoaded = await marketingPage.isImageLoaded((page) => page.locator('[data-testid="scorecard-logo"]'));
    expect(scorecardLogoLoaded).toBe(true);
    const plusLogoLoaded = await marketingPage.isImageLoaded((page) => page.locator('[data-testid="scorecard-plus-logo"]'));
    expect(plusLogoLoaded).toBe(true);
  });
});