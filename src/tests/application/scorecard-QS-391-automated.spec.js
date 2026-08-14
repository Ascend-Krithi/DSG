const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-391: Verify $99 Annual Membership text remains displayed after user signs out', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QS-391][AC6][TC-020] Verify $99 Annual Membership text remains displayed after user signs out', async ({ page }) => {
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
    
    // Verify '$99 Annual Membership.' text is displayed
    const priceTextBefore = await scorecardPage.getScorecardPlusPriceText();
    expect(priceTextBefore).toContain('$99');
    expect(priceTextBefore).toContain('Annual Membership');
    
    // Sign out from the application
    await scorecardPage.signOut();
    await page.waitForTimeout(2000);
    
    // Navigate back to Scorecard marketing page
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify '$99 Annual Membership.' text is still displayed
    const priceTextAfter = await scorecardPage.getScorecardPlusPriceText();
    expect(priceTextAfter).toContain('$99');
    expect(priceTextAfter).toContain('Annual Membership');
    
    // Verify text content is identical
    expect(priceTextAfter).toBe(priceTextBefore);
  });
});