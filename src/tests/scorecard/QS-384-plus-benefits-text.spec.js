const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC4] Scorecard+ tile displays benefits text', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-384][TC-013] Verify Scorecard+ tile displays \'That\'s $350 in Benefits!\' text', async ({ page }) => {
    await page.setViewportSize(TD.DESKTOP_VIEWPORT);
    
    scorecardPage = new ScorecardMarketingPage(page);
    
    // Navigate to Scorecard marketing page on desktop
    await scorecardPage.goto();
    await expect(page).toHaveURL(/scorecard/);
    
    // Verify Scorecard+ tile is visible
    const isTileVisible = await scorecardPage.isScorecardPlusTileVisible();
    expect(isTileVisible).toBeTruthy();
    
    // Verify 'That's $350 in Benefits!' text is displayed
    const benefitsText = await scorecardPage.getScorecardPlusBenefitsText();
    expect(benefitsText).toContain('$350');
    expect(benefitsText).toContain('Benefits');
  });
});