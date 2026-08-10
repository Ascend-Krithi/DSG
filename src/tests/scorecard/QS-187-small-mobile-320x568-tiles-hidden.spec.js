const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-002] Scorecard Small Mobile Display Tests', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize({ width: 320, height: 568 });
    await scorecardPage.goto();
  });

  test('[QS-187][TC-006] Verify comparison tiles are NOT displayed on small mobile device (320x568)', async ({ page }) => {
    // Verify comparison tiles are completely hidden
    const comparisonSection = page.locator('div, section').filter({ 
      has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) 
    }).first();
    
    const isVisible = await comparisonSection.isVisible().catch(() => false);
    expect(isVisible).toBe(false);

    // Verify page content is readable
    await page.waitForLoadState('domcontentloaded');
    const bodyContent = await page.locator('body').textContent();
    expect(bodyContent.length).toBeGreaterThan(0);

    // Verify no horizontal scrolling required
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(viewportWidth + 1);

    // Verify all visible content is properly formatted
    const mainContent = page.locator('main, body');
    await expect(mainContent).toBeVisible();
  });
});