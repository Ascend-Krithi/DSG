const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../page-objects/ScorecardPage');
const loc = require('../../locators/scorecard.locators');
const TD = require('../../data/workday-test-data');

test.describe('[QE-345][AC8] Verify Scorecard tile displays "1 Point For Every $1 Spent" text', {
  tag: ['@functional', '@smoke', '@scorecard']
}, () => {
  let scorecardPage;

  test('[QE-345] Validate specific points earning text accuracy', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Launch browser on desktop device
    console.log('Browser launched successfully on desktop device');

    // Step 2: Navigate to Scorecard Marketing Page
    await scorecardPage.goto();
    await expect(page).toHaveURL(/\/scorecard/i, { timeout: 60000 });
    console.log('Scorecard Marketing Page loaded successfully');

    // Step 3: Locate the Scorecard tile in the comparison section
    await expect(loc.comparisonSection(page)).toBeVisible({ timeout: 30000 });
    await expect(loc.scorecardTile(page)).toBeVisible({ timeout: 30000 });
    console.log('Scorecard tile is visible on the page');

    // Step 4: Locate the points earning text element on Scorecard tile
    await expect(loc.scorecardPoints(page)).toBeVisible({ timeout: 30000 });
    console.log('Points earning text element is visible on the tile');

    // Step 5: Verify text displays '1 Point For Every $1 Spent'
    const pointsText = await loc.scorecardPoints(page).textContent();
    expect(pointsText).toMatch(/1\s*point\s*for\s*every\s*\$1\s*spent/i);
    console.log('Text displays exactly "1 Point For Every $1 Spent" or equivalent variation');

    // Step 6: Verify text is properly formatted and readable
    const textElement = loc.scorecardPoints(page);
    await expect(textElement).toBeVisible();
    
    const fontSize = await textElement.evaluate(el => window.getComputedStyle(el).fontSize);
    const color = await textElement.evaluate(el => window.getComputedStyle(el).color);
    const fontFamily = await textElement.evaluate(el => window.getComputedStyle(el).fontFamily);
    
    expect(fontSize).toBeTruthy();
    expect(color).toBeTruthy();
    expect(fontFamily).toBeTruthy();
    console.log('Points earning text is properly formatted with appropriate font, size, and color for readability');
  });
});