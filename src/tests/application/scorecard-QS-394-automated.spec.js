const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-394: Verify logos remain unchanged across different authentication states', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QS-394][AC7][TC-023] Verify logos remain unchanged across different authentication states', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Navigate to Scorecard marketing page as guest user
    await scorecardPage.clearCookies();
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify logos are visible in guest state
    const isScorecardLogoVisibleGuest = await scorecardPage.isScorecardLogoVisible();
    expect(isScorecardLogoVisibleGuest).toBe(true);
    
    const isScorecardPlusLogoVisibleGuest = await scorecardPage.isScorecardPlusLogoVisible();
    expect(isScorecardPlusLogoVisibleGuest).toBe(true);
    
    // Authenticate user with valid credentials
    await scorecardPage.clickSignInJoinNowButton();
    await page.waitForLoadState('domcontentloaded');
    await scorecardPage.signIn(TD.validEmail, TD.validPassword);
    await page.waitForTimeout(3000);
    
    // Navigate to Scorecard marketing page as authenticated user
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify logos remain visible in authenticated state
    const isScorecardLogoVisibleAuth = await scorecardPage.isScorecardLogoVisible();
    expect(isScorecardLogoVisibleAuth).toBe(true);
    
    const isScorecardPlusLogoVisibleAuth = await scorecardPage.isScorecardPlusLogoVisible();
    expect(isScorecardPlusLogoVisibleAuth).toBe(true);
  });
});