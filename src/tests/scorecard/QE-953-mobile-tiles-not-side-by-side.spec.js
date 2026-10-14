const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const testData = require('../../data/scorecard-test-data');

test.describe('[TS-002][AC1] Mobile Scorecard Comparison Tiles Layout', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize(testData.viewports.mobile);
  });

  test('[QE-953] Verify that comparison tiles are NOT displayed in the same desktop arrangement on mobile devices', async ({ page }) => {
    // Step 1: Navigate to the Scorecard marketing page using a mobile device
    await scorecardPage.goto();
    await page.waitForLoadState('domcontentloaded');
    
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain('ScoreCard');
    console.log('✓ Scorecard marketing page loads successfully on mobile device');

    // Step 2: Locate the comparison tiles section on the page
    const isComparisonVisible = await scorecardPage.isComparisonSectionVisible();
    expect(isComparisonVisible).toBeTruthy();
    console.log('✓ Comparison tiles section is visible on the mobile page');

    // Step 3: Verify the Scorecard tile is displayed
    const isScorecardTileVisible = await scorecardPage.isScorecardTileVisible();
    expect(isScorecardTileVisible).toBeTruthy();
    console.log('✓ Scorecard tile is visible and fully rendered on mobile');

    // Step 4: Verify the Scorecard+ tile is displayed
    const isScorecardPlusTileVisible = await scorecardPage.isScorecardPlusTileVisible();
    expect(isScorecardPlusTileVisible).toBeTruthy();
    console.log('✓ Scorecard+ tile is visible and fully rendered on mobile');

    // Step 5: Verify tiles are NOT positioned side by side horizontally
    const areSideBySide = await scorecardPage.areTilesSideBySide();
    expect(areSideBySide).toBeFalsy();
    console.log('✓ Tiles are NOT arranged side by side horizontally');

    // Verify tiles are stacked or in mobile-optimized layout
    const areStacked = await scorecardPage.areTilesStacked();
    expect(areStacked).toBeTruthy();
    console.log('✓ Tiles are arranged vertically (stacked) or in a mobile-optimized layout');

    // Step 6: Verify the mobile layout is user-friendly and scrollable
    const { scorecardBox, scorecardPlusBox } = await scorecardPage.getTilesLayout();
    expect(scorecardBox).toBeTruthy();
    expect(scorecardPlusBox).toBeTruthy();
    expect(scorecardBox.width).toBeLessThanOrEqual(testData.viewports.mobile.width);
    expect(scorecardPlusBox.width).toBeLessThanOrEqual(testData.viewports.mobile.width);
    console.log('✓ Tiles are fully accessible, properly sized for mobile viewport, and scrollable if needed');
  });
});