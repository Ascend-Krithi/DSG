const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-396: Verify benefits messaging remains unchanged across different authentication states', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QS-396][AC7][TC-025] Verify benefits messaging remains unchanged across different authentication states', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Navigate to Scorecard marketing page as guest user
    await scorecardPage.clearCookies();
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Capture benefits messaging from both tiles
    const scorecardPlusBenefitsGuest = await scorecardPage.getScorecardPlusBenefitsText();
    const scorecardPointsGuest = await scorecardPage.getScorecardPointsText();
    const scorecardRewardGuest = await scorecardPage.getScorecardRewardText();
    
    // Authenticate user with valid credentials
    await scorecardPage.clickSignInJoinNowButton();
    await page.waitForLoadState('domcontentloaded');
    await scorecardPage.signIn(TD.validEmail, TD.validPassword);
    await page.waitForTimeout(3000);
    
    // Navigate to Scorecard marketing page as authenticated user
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify benefits messaging remains unchanged
    const scorecardPlusBenefitsAuth = await scorecardPage.getScorecardPlusBenefitsText();
    expect(scorecardPlusBenefitsAuth).toBe(scorecardPlusBenefitsGuest);
    
    const scorecardPointsAuth = await scorecardPage.getScorecardPointsText();
    expect(scorecardPointsAuth).toBe(scorecardPointsGuest);
    
    const scorecardRewardAuth = await scorecardPage.getScorecardRewardText();
    expect(scorecardRewardAuth).toBe(scorecardRewardGuest);
  });
});