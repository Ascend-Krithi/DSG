const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-400: Verify Scorecard tile displays 300 Points = $10 Reward text', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-400][AC8][TC-029] Verify Scorecard tile displays 300 Points = $10 Reward text', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Navigate to Scorecard marketing page on desktop
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify Scorecard marketing page loads successfully
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain('/scorecard');
    
    // Locate Scorecard tile on the page
    const isScorecardRewardVisible = await scorecardPage.isScorecardRewardTextVisible();
    expect(isScorecardRewardVisible).toBe(true);
    
    // Verify '300 Points = $10 Reward.' text is displayed
    const rewardText = await scorecardPage.getScorecardRewardText();
    expect(rewardText).toContain('300 Points');
    expect(rewardText).toContain('$10');
    expect(rewardText).toContain('Reward');
  });
});