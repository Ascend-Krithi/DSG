const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-411: End-to-end test: Authenticated user signs out and verifies guest state restoration', { tag: ['@e2e', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-411][AC1-AC10][TC-040] End-to-end test: Authenticated user signs out and verifies guest state restoration', async ({ page }) => {
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
    
    // Verify both comparison tiles display 'View Account' buttons
    const isViewAccountVisibleBefore = await scorecardPage.isViewAccountButtonVisible();
    expect(isViewAccountVisibleBefore).toBe(true);
    
    // Capture all static content
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
    
    // Verify both comparison tiles are still displayed side by side
    const isScorecardLogoVisible = await scorecardPage.isScorecardLogoVisible();
    expect(isScorecardLogoVisible).toBe(true);
    
    const isScorecardPlusLogoVisible = await scorecardPage.isScorecardPlusLogoVisible();
    expect(isScorecardPlusLogoVisible).toBe(true);
    
    // Verify section heading is still displayed
    const isSectionHeadingVisible = await scorecardPage.isSectionHeadingVisible();
    expect(isSectionHeadingVisible).toBe(true);
    
    // Verify guest CTAs are displayed
    const isJoinNowVisible = await scorecardPage.isJoinNowButtonVisible();
    expect(isJoinNowVisible).toBe(true);
    
    const isSignInVisible = await scorecardPage.isSignInJoinNowButtonVisible();
    expect(isSignInVisible).toBe(true);
    
    // Verify all static content remains unchanged from authenticated state
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
  });
});