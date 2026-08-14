const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-388: Verify View Account button on Scorecard+ tile navigates to account page', { tag: ['@regression', '@e2e'] }, () => {
  let scorecardPage;

  test('[QS-388][AC5][TC-017] Verify View Account button on Scorecard+ tile navigates to account page', async ({ page }) => {
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
    
    // Click 'View Account' button on Scorecard+ tile
    const viewAccountButton = page.getByRole('link', { name: /view account/i }).or(page.getByRole('button', { name: /view account/i })).last();
    await viewAccountButton.click();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    // Verify navigation to account page
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toMatch(/account|my-account/i);
  });
});