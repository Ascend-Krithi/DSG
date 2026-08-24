const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC8] Scorecard Tile Content Elements', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-661][TS-020] Verify Scorecard tile displays all required content elements', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Navigate to Scorecard marketing page on desktop
    await scorecardPage.setViewport(TD.viewport.desktop.width, TD.viewport.desktop.height);
    await scorecardPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardPage);

    // Step 2: Locate the Scorecard tile in the comparison section
    const isTileVisible = await scorecardPage.isScorecardTileVisible();
    expect(isTileVisible).toBe(true);

    // Step 3: Verify Scorecard logo is displayed at the top of the tile
    const isLogoVisible = await scorecardPage.isScorecardLogoVisible();
    expect(isLogoVisible).toBe(true);
    
    const logoWidth = await scorecardPage.getScorecardLogoWidth();
    expect(logoWidth).toBeGreaterThanOrEqual(TD.scorecard.logo.minWidth);

    // Step 4: Verify pricing text '1 Point Per Every $1 Spent.' is displayed
    const isPricing1Visible = await scorecardPage.isPricingText1Visible();
    expect(isPricing1Visible).toBe(true);
    
    const pricing1Content = await scorecardPage.getPricingText1Content();
    expect(pricing1Content).toBe(TD.scorecard.pricing.pointsPerDollar);
    
    const pricing1FontSize = await scorecardPage.getPricingTextFontSize(1);
    expect(pricing1FontSize).toBeGreaterThanOrEqual(TD.styling.fontSize.min);
    expect(pricing1FontSize).toBeLessThanOrEqual(TD.styling.fontSize.max);

    // Step 5: Verify pricing text '300 Points = $10 Reward.' is displayed
    const isPricing2Visible = await scorecardPage.isPricingText2Visible();
    expect(isPricing2Visible).toBe(true);
    
    const pricing2Content = await scorecardPage.getPricingText2Content();
    expect(pricing2Content).toBe(TD.scorecard.pricing.rewardThreshold);
    
    const pricing2FontSize = await scorecardPage.getPricingTextFontSize(2);
    expect(pricing2FontSize).toBeGreaterThanOrEqual(TD.styling.fontSize.min);
    expect(pricing2FontSize).toBeLessThanOrEqual(TD.styling.fontSize.max);

    // Step 6: Verify CTA button is displayed at the bottom of the tile
    const isCtaVisible = await scorecardPage.isScorecardCtaButtonVisible();
    expect(isCtaVisible).toBe(true);

    // Step 7: Verify all elements are properly aligned and spaced within the tile
    const areTextsAligned = await scorecardPage.arePricingTextsAligned();
    expect(areTextsAligned).toBe(true);
    
    const textSpacing = await scorecardPage.getPricingTextsSpacing();
    expect(textSpacing).toBeGreaterThanOrEqual(TD.styling.spacing.elementGap);
  });
});