const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-381: Verify View Account button is clickable and has proper accessibility attributes', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QS-381][AC3][TC-010] Verify View Account button is clickable and has proper accessibility attributes', async ({ page }) => {
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
    
    const viewAccountButton = page.getByRole('link', { name: /view account/i }).or(page.getByRole('button', { name: /view account/i })).first();
    
    // Verify button has proper role attribute
    const role = await viewAccountButton.getAttribute('role');
    expect(['button', 'link', null]).toContain(role);
    
    // Verify button has accessible name
    const accessibleName = await viewAccountButton.textContent();
    expect(accessibleName).toMatch(/view account/i);
    
    // Verify button is keyboard focusable
    await viewAccountButton.focus();
    const isFocused = await viewAccountButton.evaluate(el => el === document.activeElement);
    expect(isFocused).toBe(true);
    
    // Verify button is enabled
    const isEnabled = await viewAccountButton.isEnabled();
    expect(isEnabled).toBe(true);
  });
});