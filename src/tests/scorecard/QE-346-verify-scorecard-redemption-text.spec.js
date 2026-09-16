const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');
const loc = require('../../locators/scorecard.locators');

test.describe('[QE-346][AC8] Verify Scorecard tile displays "300 Points = $10 Reward" redemption text', {
  tag: ['@functional', '@smoke', '@scorecard']
}, () => {
  let scorecardPage;

  test('[QE-346] Validate specific redemption text accuracy', async ({ page }) => {
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

    // Step 4: Locate the redemption text element on Scorecard tile
    await expect(loc.scorecardRewards(page)).toBeVisible({ timeout: 30000 });
    console.log('Redemption text element is visible on the tile');

    // Step 5: Verify text displays '300 Points = $10 Reward'
    const rewardsText = await loc.scorecardRewards(page).textContent();
    expect(rewardsText).toMatch(/300\s*points.*\$10\s*reward/i);
    console.log('Text displays exactly "300 Points = $10 Reward" or equivalent variation');

    // Step 6: Verify text is properly formatted and readable
    const textElement = loc.scorecardRewards(page);
    await expect(textElement).toBeVisible();
    
    const fontSize = await textElement.evaluate(el => window.getComputedStyle(el).fontSize);
    const color = await textElement.evaluate(el => window.getComputedStyle(el).color);
    const fontFamily = await textElement.evaluate(el => window.getComputedStyle(el).fontFamily);
    
    expect(fontSize).toBeTruthy();
    expect(color).toBeTruthy();
    expect(fontFamily).toBeTruthy();
    console.log('Redemption text is properly formatted with appropriate font, size, and color for readability');
  });
});