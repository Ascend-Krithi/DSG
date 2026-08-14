const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-404: Verify section heading remains visible across different authentication states', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QS-404][AC9][TC-033] Verify section heading remains visible across different authentication states', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Navigate to Scorecard marketing page as guest user
    await scorecardPage.clearCookies();
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify section heading is displayed
    const isSectionHeadingVisibleGuest = await scorecardPage.isSectionHeadingVisible();
    expect(isSectionHeadingVisibleGuest).toBe(true);
    
    const headingTextGuest = await scorecardPage.getSectionHeadingText();
    expect(headingTextGuest).toContain(TD.sectionHeading);
    
    // Authenticate user with valid credentials
    await scorecardPage.clickSignInJoinNowButton();
    await page.waitForLoadState('domcontentloaded');
    await scorecardPage.signIn(TD.validEmail, TD.validPassword);
    await page.waitForTimeout(3000);
    
    // Navigate to Scorecard marketing page as authenticated user
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify section heading is still displayed
    const isSectionHeadingVisibleAuth = await scorecardPage.isSectionHeadingVisible();
    expect(isSectionHeadingVisibleAuth).toBe(true);
    
    const headingTextAuth = await scorecardPage.getSectionHeadingText();
    expect(headingTextAuth).toContain(TD.sectionHeading);
    
    // Verify heading text is identical
    expect(headingTextAuth).toBe(headingTextGuest);
  });
});