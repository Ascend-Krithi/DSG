const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-390: Verify Scorecard+ Dark Logo remains displayed after user signs out', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QS-390][AC6][TC-019] Verify Scorecard+ Dark Logo remains displayed after user signs out', async ({ page }) => {
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
    
    // Verify Scorecard+ Dark Logo is visible
    const isLogoVisibleBefore = await scorecardPage.isScorecardPlusLogoVisible();
    expect(isLogoVisibleBefore).toBe(true);
    
    // Sign out from the application
    await scorecardPage.signOut();
    await page.waitForTimeout(2000);
    
    // Navigate back to Scorecard marketing page
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify Scorecard+ Dark Logo is still displayed
    const isLogoVisibleAfter = await scorecardPage.isScorecardPlusLogoVisible();
    expect(isLogoVisibleAfter).toBe(true);
  });
});