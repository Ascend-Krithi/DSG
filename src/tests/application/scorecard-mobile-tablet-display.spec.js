const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][TS-002] Scorecard Marketing Page Mobile and Tablet Display', { tag: ['@smoke', '@regression', '@scorecard'] }, () => {
  let marketingPage;

  test('[QS-116][TC-004] Verify comparison tiles are NOT displayed on mobile device (iPhone viewport 375x667)', async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    
    // Set iPhone 8 viewport
    await marketingPage.setViewportSize(TD.resolutions.iphone8.width, TD.resolutions.iphone8.height);
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify page loads in mobile view
    await expect(page).toHaveURL(TD.urlPatterns.marketingPage);
    
    // Scroll through entire page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Verify comparison tiles section is NOT visible
    const comparisonVisible = await marketingPage.isComparisonSectionVisible();
    expect(comparisonVisible).toBe(false);
    
    // Verify tiles are either not rendered or hidden
    const scorecardTileVisible = await marketingPage.isScorecardTileVisible();
    expect(scorecardTileVisible).toBe(false);
    const scorecardPlusTileVisible = await marketingPage.isScorecardPlusTileVisible();
    expect(scorecardPlusTileVisible).toBe(false);
  });

  test('[QS-118][TC-005] Verify comparison tiles are NOT displayed on tablet device (iPad viewport 768x1024)', async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    
    // Set iPad viewport (portrait)
    await marketingPage.setViewportSize(TD.resolutions.ipad.width, TD.resolutions.ipad.height);
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify page loads in tablet view
    await expect(page).toHaveURL(TD.urlPatterns.marketingPage);
    
    // Scroll through page content
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Verify comparison tiles are hidden
    const comparisonVisible = await marketingPage.isComparisonSectionVisible();
    expect(comparisonVisible).toBe(false);
    
    // Rotate device to landscape
    await marketingPage.rotateToLandscape();
    await page.reload();
    
    // Verify tiles remain hidden in landscape mode
    const comparisonVisibleLandscape = await marketingPage.isComparisonSectionVisible();
    expect(comparisonVisibleLandscape).toBe(false);
  });

  test('[QS-120][TC-006] Verify comparison tiles are NOT displayed on Android mobile (360x640)', async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    
    // Set Android viewport (portrait)
    await marketingPage.setViewportSize(TD.resolutions.android.width, TD.resolutions.android.height);
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify page loads in mobile view
    await expect(page).toHaveURL(TD.urlPatterns.marketingPage);
    
    // Verify comparison tiles are hidden
    const comparisonVisible = await marketingPage.isComparisonSectionVisible();
    expect(comparisonVisible).toBe(false);
    
    // Verify page is fully responsive
    await expect(page.locator('body')).toBeVisible();
    
    // Test in landscape orientation
    await marketingPage.rotateToLandscape();
    await page.reload();
    
    // Verify tiles remain hidden in landscape
    const comparisonVisibleLandscape = await marketingPage.isComparisonSectionVisible();
    expect(comparisonVisibleLandscape).toBe(false);
  });
});