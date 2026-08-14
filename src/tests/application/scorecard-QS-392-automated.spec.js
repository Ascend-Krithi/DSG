const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-392: Verify That\'s $350 in Benefits! text remains displayed after user signs out', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QS-392][AC6][TC-021] Verify That\'s $350 in Benefits! text remains displayed after user signs out', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Authenticate user and navigate to Scorecard marketing page
    await scorecardPage.clearCookies();
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    await scorecardPage.clickSignInJoinNowButton();
    await page.waitForLoadState('domcontentloaded');
    await scorecardPage.signIn(TD.validEmail, TD.validPassword);
    await page.waitForTimeout(3000);
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify 'That's $350 in Benefits!' text is displayed
    const benefitsTextBefore = await scorecardPage.getScorecardPlusBenefitsText();
    expect(benefitsTextBefore).toContain('$350');
    expect(benefitsTextBefore).toContain('Benefits');
    
    // Sign out from the application
    await scorecardPage.signOut();
    await page.waitForTimeout(2000);
    
    // Navigate back to Scorecard marketing page
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify 'That's $350 in Benefits!' text is still displayed
    const benefitsTextAfter = await scorecardPage.getScorecardPlusBenefitsText();
    expect(benefitsTextAfter).toContain('$350');
    expect(benefitsTextAfter).toContain('Benefits');
    
    // Verify text content is identical
    expect(benefitsTextAfter).toBe(benefitsTextBefore);
  });
});