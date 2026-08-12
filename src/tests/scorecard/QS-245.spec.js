const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/test-data');

test.describe('[QS-245] Verify Scorecard and Scorecard+ comparison tiles display side by side on desktop', { tag: ['@functional', '@scorecard'] }, () => {
  let scorecardPage;

  test('[QS-245][TS-001][TC-001] Verify tiles display side by side on 1920x1080 resolution', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Set desktop resolution to 1920x1080
    await scorecardPage.setViewportSize(TD.viewport.desktop1920x1080.width, TD.viewport.desktop1920x1080.height);

    // Step 2: Open browser and navigate to Scorecard marketing page
    await scorecardPage.goto();

    // Step 3: Verify page heading 'Score the Right Membership for You' is displayed
    const isHeadingVisible = await scorecardPage.isPageHeadingVisible();
    expect(isHeadingVisible).toBe(true);

    const headingText = await scorecardPage.getPageHeadingText();
    expect(headingText).toContain(TD.expectedText.scorecardHeading);

    // Step 4: Verify Scorecard tile is displayed on the left side
    const isScorecardTileVisible = await scorecardPage.isScorecardTileVisible();
    expect(isScorecardTileVisible).toBe(true);

    const scorecardContent = await scorecardPage.getScorecardTileContent();
    expect(scorecardContent).toBeTruthy();

    // Step 5: Verify Scorecard+ tile is displayed on the right side
    const isScorecardPlusTileVisible = await scorecardPage.isScorecardPlusTileVisible();
    expect(isScorecardPlusTileVisible).toBe(true);

    const scorecardPlusContent = await scorecardPage.getScorecardPlusTileContent();
    expect(scorecardPlusContent).toBeTruthy();

    // Step 6: Verify both tiles are aligned side by side horizontally
    const areTilesAligned = await scorecardPage.areTilesAlignedSideBySide();
    expect(areTilesAligned).toBe(true);
  });
});