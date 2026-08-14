const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-375: Verify guest user sees Sign In / Join Now button on Scorecard tile', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QS-375][AC2][TC-004] Verify guest user sees Sign In / Join Now button on Scorecard tile', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    
    // Clear all browser cookies and session data
    await scorecardPage.clearCookies();
    
    // Navigate to Scorecard marketing page as guest user
    await scorecardPage.goto();
    await scorecardPage.waitForPageLoad();
    
    // Verify Scorecard marketing page loads successfully
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain('/scorecard');
    
    // Locate Scorecard tile on the page
    const isScorecardLogoVisible = await scorecardPage.isScorecardLogoVisible();
    expect(isScorecardLogoVisible).toBe(true);
    
    const isScorecardPointsVisible = await scorecardPage.isScorecardPointsTextVisible();
    expect(isScorecardPointsVisible).toBe(true);
    
    // Verify 'Sign In / Join Now' button is displayed on Scorecard tile
    const isSignInButtonVisible = await scorecardPage.isSignInJoinNowButtonVisible();
    expect(isSignInButtonVisible).toBe(true);
    
    // Verify button is clickable (enabled state)
    const signInButton = await page.getByRole('link', { name: /sign in \/ join now/i }).or(page.getByRole('button', { name: /sign in \/ join now/i })).first();
    const isEnabled = await signInButton.isEnabled();
    expect(isEnabled).toBe(true);
  });
});