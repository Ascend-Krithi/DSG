const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC8] Scorecard Tile Pricing Text', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-662][TS-021] Verify Scorecard tile displays pricing text elements', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Navigate to Scorecard marketing page and locate Scorecard tile
    await scorecardPage.setViewport(TD.viewport.desktop.width, TD.viewport.desktop.height);
    await scorecardPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardPage);
    
    const isTileVisible = await scorecardPage.isScorecardTileVisible();
    expect(isTileVisible).toBe(true);

    // Step 2: Locate the first pricing text element on Scorecard tile
    const isPricing1Visible = await scorecardPage.isPricingText1Visible();
    expect(isPricing1Visible).toBe(true);

    // Step 3: Verify exact text content matches '1 Point Per Every $1 Spent.'
    const pricing1Content = await scorecardPage.getPricingText1Content();
    expect(pricing1Content).toBe(TD.scorecard.pricing.pointsPerDollar);

    // Step 4: Verify first pricing text formatting and styling
    const pricing1FontSize = await scorecardPage.getPricingTextFontSize(1);
    expect(pricing1FontSize).toBeGreaterThanOrEqual(TD.styling.fontSize.min);
    expect(pricing1FontSize).toBeLessThanOrEqual(TD.styling.fontSize.max);

    // Step 5: Locate the second pricing text element on Scorecard tile
    const isPricing2Visible = await scorecardPage.isPricingText2Visible();
    expect(isPricing2Visible).toBe(true);

    // Step 6: Verify exact text content matches '300 Points = $10 Reward.'
    const pricing2Content = await scorecardPage.getPricingText2Content();
    expect(pricing2Content).toBe(TD.scorecard.pricing.rewardThreshold);

    // Step 7: Verify second pricing text formatting and styling
    const pricing2FontSize = await scorecardPage.getPricingTextFontSize(2);
    expect(pricing2FontSize).toBeGreaterThanOrEqual(TD.styling.fontSize.min);
    expect(pricing2FontSize).toBeLessThanOrEqual(TD.styling.fontSize.max);

    // Step 8: Verify both pricing texts are properly aligned and spaced
    const areTextsAligned = await scorecardPage.arePricingTextsAligned();
    expect(areTextsAligned).toBe(true);
    
    const textSpacing = await scorecardPage.getPricingTextsSpacing();
    expect(textSpacing).toBeGreaterThanOrEqual(TD.styling.spacing.lineSpacing.min);
    expect(textSpacing).toBeLessThanOrEqual(TD.styling.spacing.lineSpacing.max);

    // Step 9: Verify both pricing texts are fully visible and not truncated
    expect(pricing1Content.length).toBeGreaterThan(0);
    expect(pricing2Content.length).toBeGreaterThan(0);
    expect(pricing1Content).not.toContain('...');
    expect(pricing2Content).not.toContain('...');
  });
});