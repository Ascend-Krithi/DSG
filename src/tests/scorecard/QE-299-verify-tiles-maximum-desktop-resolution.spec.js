const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-299][AC1] Verify comparison tiles display correctly on maximum supported desktop resolution', { tag: ['@non-functional', '@regression', '@dsg-scorecard'] }, () => {
  let scorecardPage;

  test('[QE-299] Verify tiles display correctly on maximum desktop resolution (2560x1440)', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Launch browser and set viewport to maximum desktop resolution
    await page.setViewportSize({ width: 2560, height: 1440 });

    // Step 2: Navigate to Scorecard marketing page
    await scorecardPage.goto();
    await expect(scorecardPage.isComparisonSectionVisible()).resolves.toBe(true);

    // Step 3: Verify Scorecard tile is displayed with proper sizing
    const scorecardTile = await page.locator('.tile-body-copy').filter({ hasText: /1 Point For Every \$1 Spent/i }).first();
    await expect(scorecardTile).toBeVisible();
    const scorecardBox = await scorecardTile.boundingBox();
    expect(scorecardBox).toBeTruthy();
    expect(scorecardBox.width).toBeGreaterThan(0);
    expect(scorecardBox.width).toBeLessThan(1000);

    // Step 4: Verify Scorecard+ tile is displayed with proper sizing
    const scorecardPlusTile = await page.locator('.tile-body-copy').filter({ hasText: /\$99 Annual Membership/i }).first();
    await expect(scorecardPlusTile).toBeVisible();
    const scorecardPlusBox = await scorecardPlusTile.boundingBox();
    expect(scorecardPlusBox).toBeTruthy();
    expect(scorecardPlusBox.width).toBeGreaterThan(0);
    expect(scorecardPlusBox.width).toBeLessThan(1000);

    // Step 5: Verify tiles are positioned side by side with proper spacing
    expect(scorecardBox.y).toBeCloseTo(scorecardPlusBox.y, 50);
    expect(scorecardBox.x).toBeLessThan(scorecardPlusBox.x);
    const spacing = scorecardPlusBox.x - (scorecardBox.x + scorecardBox.width);
    expect(spacing).toBeGreaterThan(0);

    // Step 6: Verify tiles are centered or properly aligned on large screen
    const comparisonSection = await page.locator('my-account-templates-page-header').first();
    const sectionBox = await comparisonSection.boundingBox();
    const viewportWidth = page.viewportSize().width;
    
    const tilesCenter = (scorecardBox.x + scorecardPlusBox.x + scorecardPlusBox.width) / 2;
    const viewportCenter = viewportWidth / 2;
    expect(Math.abs(tilesCenter - viewportCenter)).toBeLessThan(viewportWidth * 0.3);

    // Step 7: Verify all tile content scales appropriately
    const pointsText = await scorecardPage.getScorecardPointsText();
    const priceText = await scorecardPage.getScorecardPlusPriceText();
    expect(pointsText).toMatch(TD.scorecardText.pointsEarned);
    expect(priceText).toMatch(TD.scorecardPlus.price);
  });
});