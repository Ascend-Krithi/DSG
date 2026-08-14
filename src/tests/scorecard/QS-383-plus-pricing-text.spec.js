const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC4] Scorecard+ tile displays pricing text', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-383][TC-012] Verify Scorecard+ tile displays \'$99 Annual Membership\' text', async ({ page }) => {
    await page.setViewportSize(TD.DESKTOP_VIEWPORT);
    
    scorecardPage = new ScorecardMarketingPage(page);
    
    // Navigate to Scorecard marketing page on desktop
    await scorecardPage.goto();
    await expect(page).toHaveURL(/scorecard/);
    
    // Verify Scorecard+ tile is visible
    const isTileVisible = await scorecardPage.isScorecardPlusTileVisible();
    expect(isTileVisible).toBeTruthy();
    
    // Verify '$99 Annual Membership.' text is displayed
    const pricingText = await scorecardPage.getScorecardPlusPricingText();
    expect(pricingText).toContain('$99');
    expect(pricingText).toContain('Annual Membership');
  });
});