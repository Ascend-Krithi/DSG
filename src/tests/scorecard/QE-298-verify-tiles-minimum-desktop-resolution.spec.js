const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-298][AC1] Verify comparison tiles display correctly on minimum supported desktop resolution', { tag: ['@non-functional', '@regression', '@dsg-scorecard'] }, () => {
  let scorecardPage;

  test('[QE-298] Verify tiles display correctly on minimum desktop resolution (1024x768)', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Launch browser and set viewport to minimum desktop resolution
    await page.setViewportSize({ width: 1024, height: 768 });

    // Step 2: Navigate to Scorecard marketing page
    await scorecardPage.goto();
    await expect(scorecardPage.isComparisonSectionVisible()).resolves.toBe(true);

    // Step 3: Verify Scorecard tile is fully visible
    const scorecardTile = await page.locator('.tile-body-copy').filter({ hasText: /1 Point For Every \$1 Spent/i }).first();
    await expect(scorecardTile).toBeVisible();
    const scorecardBox = await scorecardTile.boundingBox();
    expect(scorecardBox).toBeTruthy();
    expect(scorecardBox.width).toBeGreaterThan(0);
    expect(scorecardBox.height).toBeGreaterThan(0);

    // Step 4: Verify Scorecard+ tile is fully visible
    const scorecardPlusTile = await page.locator('.tile-body-copy').filter({ hasText: /\$99 Annual Membership/i }).first();
    await expect(scorecardPlusTile).toBeVisible();
    const scorecardPlusBox = await scorecardPlusTile.boundingBox();
    expect(scorecardPlusBox).toBeTruthy();
    expect(scorecardPlusBox.width).toBeGreaterThan(0);
    expect(scorecardPlusBox.height).toBeGreaterThan(0);

    // Step 5: Verify tiles are positioned side by side
    expect(scorecardBox.y).toBeCloseTo(scorecardPlusBox.y, 50);
    expect(scorecardBox.x).toBeLessThan(scorecardPlusBox.x);

    // Step 6: Verify no content overflow or layout breaking
    const viewportSize = page.viewportSize();
    expect(scorecardBox.x + scorecardBox.width).toBeLessThanOrEqual(viewportSize.width);
    expect(scorecardPlusBox.x + scorecardPlusBox.width).toBeLessThanOrEqual(viewportSize.width);

    // Step 7: Verify all tile content is readable
    const pointsText = await scorecardPage.getScorecardPointsText();
    const priceText = await scorecardPage.getScorecardPlusPriceText();
    expect(pointsText).toMatch(TD.scorecardText.pointsEarned);
    expect(priceText).toMatch(TD.scorecardPlus.price);
  });
});