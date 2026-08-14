const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-393: Verify all static marketing content remains unchanged after sign out', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QS-393][AC6][TC-022] Verify all static marketing content remains unchanged after sign out', async ({ page }) => {
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
    
    // Capture all static content elements
    const headingBefore = await scorecardPage.getSectionHeadingText();
    const scorecardPointsBefore = await scorecardPage.getScorecardPointsText();
    const scorecardRewardBefore = await scorecardPage.getScorecardRewardText();
    const priceBefore = await scorecardPage.getScorecardPlusPriceText();
    const benefitsBefore = await scorecardPage.getScorecardPlusBenefitsText();
    
    // Sign out from the application
    await scorecardPage.signOut();
    await page.waitForTimeout(2000);
    
    // Navigate back to Scorecard marketing page
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify all static content remains unchanged
    const headingAfter = await scorecardPage.getSectionHeadingText();
    expect(headingAfter).toBe(headingBefore);
    
    const scorecardPointsAfter = await scorecardPage.getScorecardPointsText();
    expect(scorecardPointsAfter).toBe(scorecardPointsBefore);
    
    const scorecardRewardAfter = await scorecardPage.getScorecardRewardText();
    expect(scorecardRewardAfter).toBe(scorecardRewardBefore);
    
    const priceAfter = await scorecardPage.getScorecardPlusPriceText();
    expect(priceAfter).toBe(priceBefore);
    
    const benefitsAfter = await scorecardPage.getScorecardPlusBenefitsText();
    expect(benefitsAfter).toBe(benefitsBefore);
    
    // Verify only CTA buttons have changed
    const isViewAccountVisible = await scorecardPage.isViewAccountButtonVisible();
    expect(isViewAccountVisible).toBe(false);
    
    const isJoinNowVisible = await scorecardPage.isJoinNowButtonVisible();
    expect(isJoinNowVisible).toBe(true);
  });
});