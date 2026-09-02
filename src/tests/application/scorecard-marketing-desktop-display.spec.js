const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-107: Scorecard Marketing Page Desktop Display', { tag: ['@smoke', '@regression'] }, () => {
  let marketingPage;

  test('[QS-177] Verify Scorecard and Scorecard+ tiles display side by side on desktop with 1920x1080 resolution', async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    
    // Set viewport to 1920x1080
    await marketingPage.setViewportSize(TD.viewportSizes.desktop1920.width, TD.viewportSizes.desktop1920.height);
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify Scorecard tile is displayed on the left
    await expect(page.locator('[data-testid="scorecard-tile"]')).toBeVisible();
    const isScorecardVisible = await marketingPage.isScorecardTileVisible();
    expect(isScorecardVisible).toBe(true);
    
    // Verify Scorecard+ tile is displayed on the right
    await expect(page.locator('[data-testid="scorecard-plus-tile"]')).toBeVisible();
    const isScorecardPlusVisible = await marketingPage.isScorecardPlusTileVisible();
    expect(isScorecardPlusVisible).toBe(true);
    
    // Verify tiles are horizontally aligned side by side
    const areSideBySide = await marketingPage.areTilesSideBySide();
    expect(areSideBySide).toBe(true);
    
    // Verify section heading
    await expect(page.locator('text=Score the Right Membership for You')).toBeVisible();
    const headingText = await marketingPage.getSectionHeadingText();
    expect(headingText).toContain(TD.sectionHeading.text);
  });

  test('[QS-179] Verify Scorecard and Scorecard+ tiles display correctly on desktop with minimum resolution 1024px', async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    
    // Set viewport to minimum desktop resolution
    await marketingPage.setViewportSize(TD.viewportSizes.desktopMin.width, TD.viewportSizes.desktopMin.height);
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify both tiles are fully visible
    await expect(page.locator('[data-testid="scorecard-tile"]')).toBeVisible();
    await expect(page.locator('[data-testid="scorecard-plus-tile"]')).toBeVisible();
    
    // Verify no horizontal scrolling required
    const hasHorizontalScroll = await marketingPage.checkHorizontalScroll();
    expect(hasHorizontalScroll).toBe(false);
    
    // Verify all tile content is clearly readable
    await expect(page.locator('text=1 Point Per Every $1 Spent')).toBeVisible();
    await expect(page.locator('text=$99 Annual Membership')).toBeVisible();
    
    // Verify tiles maintain side-by-side layout
    const areSideBySide = await marketingPage.areTilesSideBySide();
    expect(areSideBySide).toBe(true);
  });

  test('[QS-181] Verify tiles display correctly on desktop with ultra-wide resolution (2560x1440)', async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    
    // Set viewport to ultra-wide resolution
    await marketingPage.setViewportSize(TD.viewportSizes.ultraWide.width, TD.viewportSizes.ultraWide.height);
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify tiles are properly centered
    const boxes = await marketingPage.getTilesHorizontalAlignment();
    expect(boxes.scorecard).toBeTruthy();
    expect(boxes.scorecardPlus).toBeTruthy();
    
    // Verify tile sizing is appropriate (not excessively stretched)
    const scorecardWidth = boxes.scorecard.width;
    const scorecardPlusWidth = boxes.scorecardPlus.width;
    expect(scorecardWidth).toBeLessThan(800); // Reasonable max width
    expect(scorecardPlusWidth).toBeLessThan(800);
    
    // Verify spacing between tiles is proportional
    const spacing = boxes.scorecardPlus.x - (boxes.scorecard.x + boxes.scorecard.width);
    expect(spacing).toBeGreaterThan(0);
    expect(spacing).toBeLessThan(200); // Not excessive spacing
    
    // Verify all content remains readable
    await expect(page.locator('text=1 Point Per Every $1 Spent')).toBeVisible();
    await expect(page.locator('text=$99 Annual Membership')).toBeVisible();
  });
});