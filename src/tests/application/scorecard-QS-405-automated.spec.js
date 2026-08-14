const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-405: Verify benefits value is retrieved from AEM and displayed correctly', { tag: ['@regression', '@e2e'] }, () => {
  let scorecardPage;

  test('[QS-405][AC10][TC-034] Verify benefits value is retrieved from AEM and displayed correctly', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Navigate to Scorecard marketing page on desktop
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify Scorecard marketing page loads successfully
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain('/scorecard');
    
    // Verify benefits value is displayed on Scorecard+ tile
    const benefitsText = await scorecardPage.getAemBenefitsValue();
    expect(benefitsText).toMatch(/\$\d+/);
    expect(benefitsText).toContain('Benefits');
    
    // Verify benefits value matches expected AEM configuration
    expect(benefitsText).toContain(TD.defaultBenefitsValue);
  });
});