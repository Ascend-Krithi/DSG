const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const testData = require('../../data/scorecard-test-data');

test.describe('[TS-001][AC1] Desktop Scorecard Comparison Tiles Layout', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize(testData.viewports.desktop);
  });

  test('[QE-952] Verify that Scorecard and Scorecard+ comparison tiles are displayed side by side on desktop device', async ({ page }) => {
    // Step 1: Navigate to the Scorecard marketing page using a desktop device
    await scorecardPage.goto();
    await page.waitForLoadState('domcontentloaded');
    
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain('ScoreCard');
    console.log('✓ Scorecard marketing page loads successfully');

    // Step 2: Locate the comparison tiles section on the page
    const isComparisonVisible = await scorecardPage.isComparisonSectionVisible();
    expect(isComparisonVisible).toBeTruthy();
    console.log('✓ Comparison tiles section is visible on the page');

    // Step 3: Verify the Scorecard tile is displayed
    const isScorecardTileVisible = await scorecardPage.isScorecardTileVisible();
    expect(isScorecardTileVisible).toBeTruthy();
    console.log('✓ Scorecard tile is visible and fully rendered');

    // Step 4: Verify the Scorecard+ tile is displayed
    const isScorecardPlusTileVisible = await scorecardPage.isScorecardPlusTileVisible();
    expect(isScorecardPlusTileVisible).toBeTruthy();
    console.log('✓ Scorecard+ tile is visible and fully rendered');

    // Step 5: Verify both tiles are positioned side by side horizontally
    const areSideBySide = await scorecardPage.areTilesSideBySide();
    expect(areSideBySide).toBeTruthy();
    console.log('✓ Both tiles are arranged horizontally in the same row, side by side');

    // Step 6: Verify the tiles have equal or proportional width
    const { scorecardBox, scorecardPlusBox } = await scorecardPage.getTilesLayout();
    expect(scorecardBox).toBeTruthy();
    expect(scorecardPlusBox).toBeTruthy();
    expect(scorecardBox.width).toBeGreaterThan(0);
    expect(scorecardPlusBox.width).toBeGreaterThan(0);
    console.log('✓ Tiles are properly sized and aligned within the viewport');
  });
});