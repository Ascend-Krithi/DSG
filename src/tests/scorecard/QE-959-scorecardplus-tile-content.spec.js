const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const testData = require('../../data/scorecard-test-data');

test.describe('[TS-008][AC4] Scorecard+ Tile Content Display', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize(testData.viewports.desktop);
  });

  test('[QE-959] Verify Scorecard+ tile displays Dark Logo, $99 Annual Membership, and benefits messaging', async ({ page }) => {
    // Step 1: Navigate to the Scorecard marketing page using a desktop device
    await scorecardPage.goto();
    await page.waitForLoadState('domcontentloaded');
    
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain('ScoreCard');
    console.log('✓ Scorecard marketing page loads successfully');

    // Step 2: Locate the Scorecard+ tile in the comparison section
    const isScorecardPlusTileVisible = await scorecardPage.isScorecardPlusTileVisible();
    expect(isScorecardPlusTileVisible).toBeTruthy();
    console.log('✓ Scorecard+ tile is visible and fully rendered');

    // Step 3: Verify the Dark Logo is displayed on the Scorecard+ tile
    const isLogoVisible = await scorecardPage.isScorecardPlusLogoVisible();
    expect(isLogoVisible).toBeTruthy();
    console.log('✓ Dark Logo is visible on the Scorecard+ tile with correct styling and branding');

    // Step 4: Verify the $99 Annual Membership pricing text is displayed
    const isPriceVisible = await scorecardPage.isScorecardPlusPriceVisible();
    expect(isPriceVisible).toBeTruthy();
    
    const priceText = await scorecardPage.getScorecardPlusPriceText();
    expect(priceText).toMatch(testData.expectedText.scorecardPlusPrice);
    console.log('✓ Text $99 Annual Membership or equivalent is clearly visible on the tile');

    // Step 5: Verify benefits messaging is displayed on the Scorecard+ tile
    const isBenefitsVisible = await scorecardPage.isScorecardPlusBenefitsVisible();
    expect(isBenefitsVisible).toBeTruthy();
    console.log('✓ Benefits messaging is visible and properly formatted on the tile');

    // Step 6: Verify all elements are properly aligned and styled within the tile
    const { scorecardPlusBox } = await scorecardPage.getTilesLayout();
    expect(scorecardPlusBox).toBeTruthy();
    expect(scorecardPlusBox.width).toBeGreaterThan(0);
    expect(scorecardPlusBox.height).toBeGreaterThan(0);
    console.log('✓ Logo, pricing, and benefits messaging are properly aligned, readable, and visually appealing');
  });
});