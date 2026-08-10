const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-002] Scorecard Mobile Display Tests', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize({ width: 375, height: 667 });
    await scorecardPage.goto();
  });

  test('[QS-183][TC-004] Verify comparison tiles are NOT displayed on mobile device (iPhone SE 375x667)', async ({ page }) => {
    // Verify comparison tiles section is not displayed
    const comparisonSection = page.locator('div, section').filter({ 
      has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) 
    }).first();
    
    const isVisible = await comparisonSection.isVisible().catch(() => false);
    expect(isVisible).toBe(false);

    // Verify Scorecard and Scorecard+ comparison tiles are not visible
    const scorecardLogo = page.getByAltText('ScoreCard Logo Light None').nth(1);
    const scorecardPlusLogo = page.getByAltText('ScoreCard Plus New Logo');
    
    const scorecardVisible = await scorecardLogo.isVisible().catch(() => false);
    const scorecardPlusVisible = await scorecardPlusLogo.isVisible().catch(() => false);
    
    expect(scorecardVisible).toBe(false);
    expect(scorecardPlusVisible).toBe(false);

    // Verify page displays mobile-optimized content
    await page.waitForLoadState('domcontentloaded');
    const bodyContent = await page.locator('body').textContent();
    expect(bodyContent.length).toBeGreaterThan(0);

    // Scroll through entire page and verify tiles remain hidden
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    
    const scorecardVisibleAfterScroll = await scorecardLogo.isVisible().catch(() => false);
    const scorecardPlusVisibleAfterScroll = await scorecardPlusLogo.isVisible().catch(() => false);
    
    expect(scorecardVisibleAfterScroll).toBe(false);
    expect(scorecardPlusVisibleAfterScroll).toBe(false);
  });
});