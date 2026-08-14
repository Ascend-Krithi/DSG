const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-410: End-to-end test: Guest user journey from viewing tiles to signing in and viewing account', { tag: ['@e2e', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-410][AC1-AC10][TC-039] End-to-end test: Guest user journey from viewing tiles to signing in and viewing account', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Clear all browser cookies and navigate to Scorecard marketing page as guest
    await scorecardPage.clearCookies();
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify both comparison tiles are displayed side by side
    const isScorecardLogoVisible = await scorecardPage.isScorecardLogoVisible();
    expect(isScorecardLogoVisible).toBe(true);
    
    const isScorecardPlusLogoVisible = await scorecardPage.isScorecardPlusLogoVisible();
    expect(isScorecardPlusLogoVisible).toBe(true);
    
    // Verify section heading is displayed
    const isSectionHeadingVisible = await scorecardPage.isSectionHeadingVisible();
    expect(isSectionHeadingVisible).toBe(true);
    
    // Verify Scorecard tile content
    const isScorecardPointsVisible = await scorecardPage.isScorecardPointsTextVisible();
    expect(isScorecardPointsVisible).toBe(true);
    
    const isScorecardRewardVisible = await scorecardPage.isScorecardRewardTextVisible();
    expect(isScorecardRewardVisible).toBe(true);
    
    const isSignInButtonVisible = await scorecardPage.isSignInJoinNowButtonVisible();
    expect(isSignInButtonVisible).toBe(true);
    
    // Verify Scorecard+ tile content
    const isScorecardPlusPriceVisible = await scorecardPage.isScorecardPlusPriceVisible();
    expect(isScorecardPlusPriceVisible).toBe(true);
    
    const isScorecardPlusBenefitsVisible = await scorecardPage.isScorecardPlusBenefitsVisible();
    expect(isScorecardPlusBenefitsVisible).toBe(true);
    
    const isJoinNowVisible = await scorecardPage.isJoinNowButtonVisible();
    expect(isJoinNowVisible).toBe(true);
    
    // Click 'Sign In / Join Now' button on Scorecard tile
    await scorecardPage.clickSignInJoinNowButton();
    await page.waitForLoadState('domcontentloaded');
    
    // Enter valid email and password, then sign in
    await scorecardPage.signIn(TD.validEmail, TD.validPassword);
    await page.waitForTimeout(3000);
    
    // Verify user is redirected back to Scorecard marketing page
    let currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain('/scorecard');
    
    // Verify both comparison tiles are still displayed side by side
    const isScorecardLogoVisibleAuth = await scorecardPage.isScorecardLogoVisible();
    expect(isScorecardLogoVisibleAuth).toBe(true);
    
    const isScorecardPlusLogoVisibleAuth = await scorecardPage.isScorecardPlusLogoVisible();
    expect(isScorecardPlusLogoVisibleAuth).toBe(true);
    
    // Verify Scorecard tile now displays 'View Account' button
    const isViewAccountVisible = await scorecardPage.isViewAccountButtonVisible();
    expect(isViewAccountVisible).toBe(true);
    
    // Click 'View Account' button on Scorecard tile
    await scorecardPage.clickViewAccountButton();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    // Verify Account Summary page loads
    currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toMatch(/account|my-account/i);
  });
});