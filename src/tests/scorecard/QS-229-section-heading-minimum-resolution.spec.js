const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-009] Section Heading at Minimum Desktop Resolution Tests', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize({ width: 1024, height: 768 });
    await scorecardPage.goto();
  });

  test('[QS-229][TC-027] Verify section heading displays correctly at minimum desktop resolution (1024px)', async ({ page }) => {
    // Locate section heading
    const sectionHeading = page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 });
    await expect(sectionHeading).toBeVisible();

    // Verify heading is fully visible
    const headingBox = await sectionHeading.boundingBox();
    expect(headingBox).not.toBeNull();
    expect(headingBox.width).toBeGreaterThan(0);
    expect(headingBox.height).toBeGreaterThan(0);

    // Verify heading text is not truncated
    const headingText = await sectionHeading.textContent();
    expect(headingText).toBe('Score the Right Membership for You');

    // Verify heading remains centered
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    const headingCenter = headingBox.x + headingBox.width / 2;
    const viewportCenter = viewportWidth / 2;
    const centerTolerance = 150;
    
    expect(Math.abs(headingCenter - viewportCenter)).toBeLessThan(centerTolerance);

    // Verify no horizontal scrolling required
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });
});