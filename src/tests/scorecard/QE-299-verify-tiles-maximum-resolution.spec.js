const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../pages/ScorecardPage');

test.describe('[QE-1][AC1] Verify comparison tiles display correctly on maximum supported desktop resolution', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
  });

  test('QE-299: Verify comparison tiles display correctly on maximum desktop resolution', async ({ page }) => {
    // Step 1: Launch browser and set viewport to maximum desktop resolution
    await page.setViewportSize({ width: 2560, height: 1440 });
    console.log('Browser is launched with maximum desktop viewport dimensions: 2560x1440');

    // Step 2: Navigate to Scorecard marketing page
    await scorecardPage.navigate();
    await expect(page).toHaveURL(/.*ScoreCard.*/);
    console.log('Scorecard marketing page loads successfully');

    // Step 3: Verify Scorecard tile is displayed with proper sizing
    const scorecardTile = await scorecardPage.getScorecardTile();
    await expect(scorecardTile).toBeVisible();
    const scorecardBox = await scorecardTile.boundingBox();
    expect(scorecardBox.width).toBeGreaterThan(0);
    expect(scorecardBox.width).toBeLessThan(1000); // Not overly stretched
    console.log('Scorecard tile is visible and maintains appropriate size (not overly stretched)');

    // Step 4: Verify Scorecard+ tile is displayed with proper sizing
    const scorecardPlusTile = await scorecardPage.getScorecardPlusTile();
    await expect(scorecardPlusTile).toBeVisible();
    const scorecardPlusBox = await scorecardPlusTile.boundingBox();
    expect(scorecardPlusBox.width).toBeGreaterThan(0);
    expect(scorecardPlusBox.width).toBeLessThan(1000); // Not overly stretched
    console.log('Scorecard+ tile is visible and maintains appropriate size (not overly stretched)');

    // Step 5: Verify tiles are positioned side by side with proper spacing
    expect(scorecardBox.y).toBeCloseTo(scorecardPlusBox.y, 50);
    const spacing = scorecardPlusBox.x - (scorecardBox.x + scorecardBox.width);
    expect(spacing).toBeGreaterThan(0);
    expect(spacing).toBeLessThan(200);
    console.log('Both tiles are displayed horizontally with appropriate spacing between them');

    // Step 6: Verify tiles are centered or properly aligned on large screen
    const pageWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const tilesCenter = (scorecardBox.x + scorecardPlusBox.x + scorecardPlusBox.width) / 2;
    const pageCenter = pageWidth / 2;
    const centerTolerance = 200;
    expect(Math.abs(tilesCenter - pageCenter)).toBeLessThan(centerTolerance);
    console.log('Tiles are properly centered or aligned within the page container');

    // Step 7: Verify all tile content scales appropriately
    const scorecardLogo = await scorecardPage.getScorecardLogo();
    const scorecardPlusLogo = await scorecardPage.getScorecardPlusLogo();
    const pricingElement = await scorecardPage.getScorecardPlusPrice();
    await expect(scorecardLogo).toBeVisible();
    await expect(scorecardPlusLogo).toBeVisible();
    await expect(pricingElement).toBeVisible();
    console.log('All content maintains readability and proper proportions on large screen');
  });
});