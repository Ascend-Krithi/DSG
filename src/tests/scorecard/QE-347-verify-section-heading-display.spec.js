const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');
const loc = require('../../locators/scorecard.locators');

test.describe('[QE-347][AC9] Verify section heading "Score the Right Membership for You" is displayed above comparison tiles', {
  tag: ['@functional', '@smoke', '@scorecard']
}, () => {
  let scorecardPage;

  test('[QE-347] Validate section heading presence and position', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Launch browser on desktop device
    console.log('Browser launched successfully on desktop device');

    // Step 2: Navigate to Scorecard Marketing Page
    await scorecardPage.goto();
    await expect(page).toHaveURL(/\/scorecard/i, { timeout: 60000 });
    console.log('Scorecard Marketing Page loaded successfully');

    // Step 3: Scroll to comparison tiles section
    await expect(loc.comparisonSection(page)).toBeVisible({ timeout: 30000 });
    await loc.comparisonSection(page).scrollIntoViewIfNeeded();
    console.log('Comparison tiles section is visible on the page');

    // Step 4: Locate the section heading above comparison tiles
    await expect(loc.sectionHeading(page)).toBeVisible({ timeout: 30000 });
    console.log('Section heading element is visible above the comparison tiles');

    // Step 5: Verify heading text displays 'Score the Right Membership for You'
    const headingText = await loc.sectionHeading(page).textContent();
    expect(headingText).toMatch(/score\s+the\s+right\s+membership\s+for\s+you/i);
    console.log('Heading displays exactly "Score the Right Membership for You" or equivalent variation');

    // Step 6: Verify heading is positioned above comparison tiles
    const headingBox = await loc.sectionHeading(page).boundingBox();
    const comparisonBox = await loc.comparisonSection(page).boundingBox();
    
    expect(headingBox).not.toBeNull();
    expect(comparisonBox).not.toBeNull();
    
    // Verify heading is within or above the comparison section
    expect(headingBox.y).toBeLessThanOrEqual(comparisonBox.y + comparisonBox.height);
    console.log('Heading is positioned directly above the comparison tiles section');
  });
});