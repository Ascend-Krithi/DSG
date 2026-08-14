const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-389: Verify Join Now button is displayed after user signs out and returns to Scorecard marketing page', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QS-389][AC6][TC-018] Verify Join Now button is displayed after user signs out and returns to Scorecard marketing page', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Authenticate user with valid credentials
    await scorecardPage.clearCookies();
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    await scorecardPage.clickSignInJoinNowButton();
    await page.waitForLoadState('domcontentloaded');
    await scorecardPage.signIn(TD.validEmail, TD.validPassword);
    await page.waitForTimeout(3000);
    
    // Navigate to Scorecard marketing page
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify authenticated CTAs are visible
    const isViewAccountVisibleBefore = await scorecardPage.isViewAccountButtonVisible();
    expect(isViewAccountVisibleBefore).toBe(true);
    
    // Sign out from the application
    await scorecardPage.signOut();
    await page.waitForTimeout(2000);
    
    // Navigate back to Scorecard marketing page
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify 'Join Now' button is displayed on Scorecard+ tile
    const isJoinNowVisible = await scorecardPage.isJoinNowButtonVisible();
    expect(isJoinNowVisible).toBe(true);
    
    // Verify 'View Account' button is NOT displayed
    const isViewAccountVisibleAfter = await scorecardPage.isViewAccountButtonVisible();
    expect(isViewAccountVisibleAfter).toBe(false);
  });
});