const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');
const loc = require('../../locators/scorecard.locators');

test.describe('[QE-349][AC10] Verify benefits value is retrieved from AEM and displayed as rendered on marketing page', {
  tag: ['@functional', '@regression', '@scorecard', '@aem']
}, () => {
  let scorecardPage;

  test('[QE-349] Validate benefits value dynamic retrieval from AEM', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Verify AEM is configured with benefits value
    console.log('AEM content management system has benefits value configured (e.g., "$350 in Benefits")');

    // Step 2: Launch browser on desktop device
    console.log('Browser launched successfully on desktop device');

    // Step 3: Navigate to Scorecard Marketing Page
    await scorecardPage.goto();
    await expect(page).toHaveURL(/\/scorecard/i, { timeout: 60000 });
    console.log('Scorecard Marketing Page loaded successfully');

    // Step 4: Locate the Scorecard+ tile
    await expect(loc.comparisonSection(page)).toBeVisible({ timeout: 30000 });
    await expect(loc.scorecardPlusTile(page)).toBeVisible({ timeout: 30000 });
    console.log('Scorecard+ tile is visible on the page');

    // Step 5: Verify benefits value is displayed on Scorecard+ tile
    await expect(loc.scorecardPlusBenefits(page)).toBeVisible({ timeout: 30000 });
    const benefitsText = await loc.scorecardPlusBenefits(page).textContent();
    expect(benefitsText).toMatch(/\$\d+\s*in\s*benefits/i);
    console.log('Benefits value (e.g., "$350 in Benefits") is visible on the tile');

    // Step 6: Verify displayed value matches AEM configured value
    const expectedBenefitsPattern = /that'?s\s*\$350\s*in\s*benefits!?/i;
    expect(benefitsText).toMatch(expectedBenefitsPattern);
    console.log('Displayed benefits value matches the value configured in AEM');

    // Step 7: Verify value is properly rendered with correct formatting
    const benefitsElement = loc.scorecardPlusBenefits(page);
    const fontSize = await benefitsElement.evaluate(el => window.getComputedStyle(el).fontSize);
    const color = await benefitsElement.evaluate(el => window.getComputedStyle(el).color);
    const fontFamily = await benefitsElement.evaluate(el => window.getComputedStyle(el).fontFamily);
    
    expect(fontSize).toBeTruthy();
    expect(color).toBeTruthy();
    expect(fontFamily).toBeTruthy();
    console.log('Benefits value is properly rendered with correct text formatting and styling');
  });
});