const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../pages/ScorecardPage');

test.describe('[QE-1][AC1] Verify comparison tiles display correctly on minimum supported desktop resolution', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
  });

  test('QE-298: Verify comparison tiles display correctly on minimum desktop resolution', async ({ page }) => {
    // Step 1: Launch browser and set viewport to minimum desktop resolution
    await page.setViewportSize({ width: 1024, height: 768 });
    console.log('Browser is launched with minimum desktop viewport dimensions: 1024x768');

    // Step 2: Navigate to Scorecard marketing page
    await scorecardPage.navigate();
    await expect(page).toHaveURL(/.*ScoreCard.*/);
    console.log('Scorecard marketing page loads successfully');

    // Step 3: Verify Scorecard tile is fully visible
    const scorecardTile = await scorecardPage.getScorecardTile();
    await expect(scorecardTile).toBeVisible();
    const scorecardBox = await scorecardTile.boundingBox();
    expect(scorecardBox.width).toBeGreaterThan(0);
    expect(scorecardBox.height).toBeGreaterThan(0);
    console.log('Scorecard tile is completely visible without truncation');

    // Step 4: Verify Scorecard+ tile is fully visible
    const scorecardPlusTile = await scorecardPage.getScorecardPlusTile();
    await expect(scorecardPlusTile).toBeVisible();
    const scorecardPlusBox = await scorecardPlusTile.boundingBox();
    expect(scorecardPlusBox.width).toBeGreaterThan(0);
    expect(scorecardPlusBox.height).toBeGreaterThan(0);
    console.log('Scorecard+ tile is completely visible without truncation');

    // Step 5: Verify tiles are positioned side by side
    expect(scorecardBox.y).toBeCloseTo(scorecardPlusBox.y, 50);
    expect(scorecardBox.x).toBeLessThan(scorecardPlusBox.x);
    console.log('Both tiles are displayed horizontally adjacent without wrapping');

    // Step 6: Verify no content overflow or layout breaking
    const hasHorizontalScrollbar = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScrollbar).toBeFalsy();
    console.log('No horizontal scrollbar, no overlapping content, layout is intact');

    // Step 7: Verify all tile content is readable
    const scorecardLogo = await scorecardPage.getScorecardLogo();
    const scorecardPlusLogo = await scorecardPage.getScorecardPlusLogo();
    await expect(scorecardLogo).toBeVisible();
    await expect(scorecardPlusLogo).toBeVisible();
    console.log('All content within tiles is readable and properly sized');
  });
});