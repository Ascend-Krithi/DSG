const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-384: Verify Scorecard+ tile displays That\'s $350 in Benefits! text', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-384][AC4][TC-013] Verify Scorecard+ tile displays That\'s $350 in Benefits! text', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Navigate to Scorecard marketing page on desktop
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify Scorecard marketing page loads successfully
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain('/scorecard');
    
    // Locate Scorecard+ tile on the page
    const isScorecardPlusBenefitsVisible = await scorecardPage.isScorecardPlusBenefitsVisible();
    expect(isScorecardPlusBenefitsVisible).toBe(true);
    
    // Verify 'That's $350 in Benefits!' text is displayed
    const benefitsText = await scorecardPage.getScorecardPlusBenefitsText();
    expect(benefitsText).toContain('$350');
    expect(benefitsText).toContain('Benefits');
  });
});