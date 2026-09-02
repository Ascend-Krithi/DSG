const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-107: Scorecard Marketing Page Mobile and Tablet Display', { tag: ['@smoke', '@regression'] }, () => {
  let marketingPage;

  test('[QS-183] Verify comparison tiles are NOT displayed on mobile device (iPhone SE 375x667)', async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    
    // Set viewport to mobile resolution
    await marketingPage.setViewportSize(TD.viewportSizes.iPhoneSE.width, TD.viewportSizes.iPhoneSE.height);
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify comparison tiles are not displayed
    await expect(page.locator('[data-testid="scorecard-tile"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="scorecard-plus-tile"]')).not.toBeVisible();
    
    // Verify page displays mobile-optimized content
    await expect(page).toHaveURL(TD.urlPatterns.scorecardMarketing);
    
    // Scroll through entire page and verify tiles remain hidden
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator('[data-testid="scorecard-tile"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="scorecard-plus-tile"]')).not.toBeVisible();
  });

  test('[QS-185] Verify comparison tiles are NOT displayed on tablet device (iPad 768x1024)', async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    
    // Set viewport to tablet portrait resolution
    await marketingPage.setViewportSize(TD.viewportSizes.iPadPortrait.width, TD.viewportSizes.iPadPortrait.height);
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify comparison tiles are not displayed in portrait mode
    await expect(page.locator('[data-testid="scorecard-tile"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="scorecard-plus-tile"]')).not.toBeVisible();
    
    // Rotate to landscape mode (1024x768)
    await marketingPage.setViewportSize(TD.viewportSizes.iPadLandscape.width, TD.viewportSizes.iPadLandscape.height);
    await page.reload();
    
    // Verify tiles display in landscape if width >= 1024px
    const isScorecardVisible = await marketingPage.isScorecardTileVisible();
    const isScorecardPlusVisible = await marketingPage.isScorecardPlusTileVisible();
    
    if (TD.viewportSizes.iPadLandscape.width >= 1024) {
      expect(isScorecardVisible).toBe(true);
      expect(isScorecardPlusVisible).toBe(true);
    } else {
      expect(isScorecardVisible).toBe(false);
      expect(isScorecardPlusVisible).toBe(false);
    }
  });

  test('[QS-187] Verify comparison tiles are NOT displayed on small mobile device (320x568)', async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    
    // Set viewport to smallest mobile resolution
    await marketingPage.setViewportSize(TD.viewportSizes.smallMobile.width, TD.viewportSizes.smallMobile.height);
    
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify comparison tiles are not displayed
    await expect(page.locator('[data-testid="scorecard-tile"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="scorecard-plus-tile"]')).not.toBeVisible();
    
    // Verify page content is properly formatted
    await expect(page).toHaveURL(TD.urlPatterns.scorecardMarketing);
    
    // Verify no horizontal scrolling required
    const hasHorizontalScroll = await marketingPage.checkHorizontalScroll();
    expect(hasHorizontalScroll).toBe(false);
  });
});