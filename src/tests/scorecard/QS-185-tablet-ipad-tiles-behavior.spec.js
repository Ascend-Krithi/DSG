const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-002] Scorecard Tablet Display Tests', () => {
  let scorecardPage;

  test('[QS-185][TC-005] Verify comparison tiles behavior on tablet portrait mode', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize({ width: 768, height: 1024 });
    await scorecardPage.goto();

    // Verify comparison tiles are not displayed in portrait mode
    const comparisonSection = page.locator('div, section').filter({ 
      has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) 
    }).first();
    
    const isVisible = await comparisonSection.isVisible().catch(() => false);
    expect(isVisible).toBe(false);

    // Verify page shows tablet-optimized content
    await page.waitForLoadState('domcontentloaded');
    const bodyContent = await page.locator('body').textContent();
    expect(bodyContent.length).toBeGreaterThan(0);
  });

  test('[QS-185][TC-005] Verify comparison tiles behavior on tablet landscape mode', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize({ width: 1024, height: 768 });
    await scorecardPage.goto();

    // Verify tiles display if width >= 1024px
    const scorecardLogo = page.getByAltText('ScoreCard Logo Light None').nth(1);
    const scorecardPlusLogo = page.getByAltText('ScoreCard Plus New Logo');
    
    await expect(scorecardLogo).toBeVisible();
    await expect(scorecardPlusLogo).toBeVisible();

    // Verify comparison section is displayed
    const sectionHeading = page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 });
    await expect(sectionHeading).toBeVisible();
  });
});