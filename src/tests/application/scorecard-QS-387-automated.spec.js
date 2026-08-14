const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-387: Verify authenticated user\'s View Account button on Scorecard+ tile is clickable', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QS-387][AC5][TC-016] Verify authenticated user\'s View Account button on Scorecard+ tile is clickable', async ({ page }) => {
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
    
    const viewAccountButton = page.getByRole('link', { name: /view account/i }).or(page.getByRole('button', { name: /view account/i })).last();
    
    // Verify 'View Account' button is enabled
    const isEnabled = await viewAccountButton.isEnabled();
    expect(isEnabled).toBe(true);
    
    // Verify button is visible
    const isVisible = await viewAccountButton.isVisible();
    expect(isVisible).toBe(true);
    
    // Hover over 'View Account' button
    await viewAccountButton.hover();
    
    // Verify button has proper cursor style
    const cursor = await viewAccountButton.evaluate(el => window.getComputedStyle(el).cursor);
    expect(cursor).toBe('pointer');
  });
});