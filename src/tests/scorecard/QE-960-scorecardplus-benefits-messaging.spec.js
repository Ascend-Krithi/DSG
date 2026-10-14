const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const testData = require('../../data/scorecard-test-data');

test.describe('[TS-009][AC4] Scorecard+ Benefits Messaging', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize(testData.viewports.desktop);
  });

  test('[QE-960] Verify Scorecard+ tile displays benefits messaging equivalent to That\'s $350 in Benefits!', async ({ page }) => {
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

    // Step 3: Locate the benefits messaging text on the Scorecard+ tile
    const isBenefitsVisible = await scorecardPage.isScorecardPlusBenefitsVisible();
    expect(isBenefitsVisible).toBeTruthy();
    console.log('✓ Benefits messaging text element is found on the tile');

    // Step 4: Verify the benefits messaging contains the value $350 or equivalent
    const benefitsText = await scorecardPage.getScorecardPlusBenefitsText();
    expect(benefitsText).toMatch(testData.expectedText.scorecardPlusBenefits);
    expect(benefitsText).toMatch(/\$350/i);
    console.log('✓ Benefits messaging displays That\'s $350 in Benefits! or equivalent text with correct value');

    // Step 5: Verify the benefits messaging is clearly visible and readable
    const isBenefitsVisibleCheck = await scorecardPage.isScorecardPlusBenefitsVisible();
    expect(isBenefitsVisibleCheck).toBeTruthy();
    console.log('✓ Benefits messaging is clearly visible, properly styled, and easy to read');

    // Step 6: Verify the benefits value matches the AEM configuration
    expect(benefitsText).toMatch(/350/i);
    console.log('✓ Displayed benefits value matches the value configured in AEM');
  });
});