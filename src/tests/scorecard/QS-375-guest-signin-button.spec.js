const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const CommonHeaderPage = require('../../pages/common-header.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC2] Guest user sees Sign In / Join Now button', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;
  let headerPage;

  test('[QS-375][TC-004] Verify guest user sees \'Sign In / Join Now\' button on Scorecard tile', async ({ page }) => {
    await page.setViewportSize(TD.DESKTOP_VIEWPORT);
    
    headerPage = new CommonHeaderPage(page);
    scorecardPage = new ScorecardMarketingPage(page);
    
    // Clear all browser cookies and session data
    await headerPage.clearAllAuthData();
    
    // Navigate to Scorecard marketing page as guest user
    await scorecardPage.goto();
    await expect(page).toHaveURL(/scorecard/);
    
    // Verify Scorecard tile is visible
    const isTileVisible = await scorecardPage.isScorecardTileVisible();
    expect(isTileVisible).toBeTruthy();
    
    // Verify 'Sign In / Join Now' button is displayed on Scorecard tile
    const isSignInButtonVisible = await scorecardPage.isScorecardSignInButtonVisible();
    expect(isSignInButtonVisible).toBeTruthy();
    
    // Verify button is enabled
    const isButtonEnabled = await scorecardPage.isScorecardSignInButtonEnabled();
    expect(isButtonEnabled).toBeTruthy();
  });
});