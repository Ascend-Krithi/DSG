const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-395: Verify membership pricing remains unchanged across different authentication states', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QS-395][AC7][TC-024] Verify membership pricing remains unchanged across different authentication states', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Navigate to Scorecard marketing page as guest user
    await scorecardPage.clearCookies();
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Capture membership pricing text from Scorecard+ tile
    const priceTextGuest = await scorecardPage.getScorecardPlusPriceText();
    expect(priceTextGuest).toContain('$99');
    expect(priceTextGuest).toContain('Annual Membership');
    
    // Authenticate user with valid credentials
    await scorecardPage.clickSignInJoinNowButton();
    await page.waitForLoadState('domcontentloaded');
    await scorecardPage.signIn(TD.validEmail, TD.validPassword);
    await page.waitForTimeout(3000);
    
    // Navigate to Scorecard marketing page as authenticated user
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify membership pricing text remains unchanged
    const priceTextAuth = await scorecardPage.getScorecardPlusPriceText();
    expect(priceTextAuth).toContain('$99');
    expect(priceTextAuth).toContain('Annual Membership');
    
    // Verify text is identical
    expect(priceTextAuth).toBe(priceTextGuest);
  });
});