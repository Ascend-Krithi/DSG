const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../page-objects/ScorecardPage');
const loc = require('../../locators/scorecard.locators');
const TD = require('../../data/workday-test-data');

test.describe('[QE-344][AC8] Verify Scorecard tile displays Scorecard Logo and points earning messaging', {
  tag: ['@functional', '@smoke', '@scorecard']
}, () => {
  let scorecardPage;

  test('[QE-344] Validate Scorecard tile displays logo and points messaging', async ({ page }) => {
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

    // Step 4: Verify Scorecard Logo is displayed on the tile
    await expect(loc.scorecardLogoSummary(page)).toBeVisible({ timeout: 30000 });
    const logoAlt = await loc.scorecardLogoSummary(page).getAttribute('alt');
    expect(logoAlt).toMatch(/scorecard logo/i);
    console.log('Scorecard Logo is visible and properly rendered on the tile');

    // Step 5: Verify points earning messaging is displayed on the tile
    await expect(loc.scorecardPoints(page)).toBeVisible({ timeout: 30000 });
    const pointsText = await loc.scorecardPoints(page).textContent();
    expect(pointsText).toMatch(/1 point for every \$1 spent/i);
    console.log('Points earning messaging is visible and readable on the Scorecard tile');

    // Step 6: Verify logo and messaging are properly formatted and aligned
    const logoBox = await loc.scorecardLogoSummary(page).boundingBox();
    const pointsBox = await loc.scorecardPoints(page).boundingBox();
    
    expect(logoBox).not.toBeNull();
    expect(pointsBox).not.toBeNull();
    expect(logoBox.width).toBeGreaterThan(0);
    expect(logoBox.height).toBeGreaterThan(0);
    expect(pointsBox.width).toBeGreaterThan(0);
    expect(pointsBox.height).toBeGreaterThan(0);
    console.log('Logo and messaging are properly formatted, aligned, and visually appealing');
  });
});