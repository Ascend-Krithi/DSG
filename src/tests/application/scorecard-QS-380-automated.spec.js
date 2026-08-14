const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-380: Verify clicking View Account button navigates authenticated user to MAUI Account Summary page', { tag: ['@regression', '@e2e'] }, () => {
  let scorecardPage;

  test('[QS-380][AC3][TC-009] Verify clicking View Account button navigates authenticated user to MAUI Account Summary page', async ({ page }) => {
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
    
    // Verify 'View Account' button is visible
    const isViewAccountVisible = await scorecardPage.isViewAccountButtonVisible();
    expect(isViewAccountVisible).toBe(true);
    
    // Click 'View Account' button on Scorecard tile
    await scorecardPage.clickViewAccountButton();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    // Verify navigation to MAUI Account Summary page
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toMatch(/account|my-account/i);
  });
});