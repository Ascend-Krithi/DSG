const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const CommonHeaderPage = require('../../pages/common-header.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC4] Scorecard+ tile displays guest CTA', { tag: ['@regression'] }, () => {
  let scorecardPage;
  let headerPage;

  test('[QS-385][TC-014] Verify Scorecard+ tile displays appropriate CTA for guest user', async ({ page }) => {
    await page.setViewportSize(TD.DESKTOP_VIEWPORT);
    
    headerPage = new CommonHeaderPage(page);
    scorecardPage = new ScorecardMarketingPage(page);
    
    // Clear all browser cookies and session data
    await headerPage.clearAllAuthData();
    
    // Navigate to Scorecard marketing page as guest user
    await scorecardPage.goto();
    await expect(page).toHaveURL(/scorecard/);
    
    // Verify Scorecard+ tile is visible
    const isTileVisible = await scorecardPage.isScorecardPlusTileVisible();
    expect(isTileVisible).toBeTruthy();
    
    // Verify guest-appropriate CTA button is displayed
    const isJoinButtonVisible = await scorecardPage.isScorecardPlusJoinButtonVisible();
    expect(isJoinButtonVisible).toBeTruthy();
    
    // Verify 'View Account' button is NOT displayed
    const isViewAccountVisible = await scorecardPage.isScorecardPlusViewAccountButtonVisible();
    expect(isViewAccountVisible).toBeFalsy();
  });
});