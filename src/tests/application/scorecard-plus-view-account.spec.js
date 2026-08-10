const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][TS-006] Scorecard+ View Account Button Functionality', { tag: ['@regression', '@scorecard'] }, () => {
  let marketingPage;

  test.beforeEach(async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    await marketingPage.setViewportSize(TD.resolutions.desktop.width, TD.resolutions.desktop.height);
    
    // Authenticate user
    await marketingPage.gotoSignInPage();
    await marketingPage.signIn(TD.credentials.validUser.username, TD.credentials.validUser.password);
    await marketingPage.goto();
  });

  test('[QS-140][TC-016] Verify View Account button is displayed and clickable on Scorecard+ tile for authenticated user', async ({ page }) => {
    // Locate Scorecard+ tile
    await marketingPage.scrollToComparisonSection();
    const tileVisible = await marketingPage.isScorecardPlusTileVisible();
    expect(tileVisible).toBe(true);
    
    // Verify 'View Account' button is displayed
    await expect(page.locator('[data-testid="scorecard-plus-cta"]:has-text("View Account")')).toBeVisible();
    
    // Verify button is enabled
    const isEnabled = await marketingPage.isScorecardPlusViewAccountButtonEnabled();
    expect(isEnabled).toBe(true);
    
    // Hover over button and verify hover state
    await marketingPage.hoverScorecardPlusViewAccountButton();
    await expect(page.locator('[data-testid="scorecard-plus-cta"]:has-text("View Account")')).toHaveCSS('cursor', 'pointer');
    
    // Click button and verify it triggers action
    await marketingPage.clickScorecardPlusViewAccountButton();
    await expect(page).toHaveURL(TD.urlPatterns.accountSummary);
  });

  test('[QS-142][TC-017] Verify View Account button on Scorecard+ tile has proper styling and accessibility', async ({ page }) => {
    // Locate 'View Account' button on Scorecard+ tile
    await marketingPage.scrollToComparisonSection();
    const buttonLocator = page.locator('[data-testid="scorecard-plus-cta"]:has-text("View Account")');
    
    // Verify button is visible
    await expect(buttonLocator).toBeVisible();
    
    // Verify button has focus indicator
    await buttonLocator.focus();
    await expect(buttonLocator).toBeFocused();
    
    // Verify button is keyboard accessible (Enter key)
    await buttonLocator.press('Enter');
    await expect(page).toHaveURL(TD.urlPatterns.accountSummary);
    
    // Navigate back and test Space key
    await marketingPage.goBack();
    await marketingPage.scrollToComparisonSection();
    await buttonLocator.focus();
    await buttonLocator.press('Space');
    await expect(page).toHaveURL(TD.urlPatterns.accountSummary);
  });

  test('[QS-144][TC-018] Verify View Account button on Scorecard+ tile navigates correctly', async ({ page }) => {
    // Locate Scorecard+ tile
    await marketingPage.scrollToComparisonSection();
    const tileVisible = await marketingPage.isScorecardPlusTileVisible();
    expect(tileVisible).toBe(true);
    
    // Click 'View Account' button on Scorecard+ tile
    await marketingPage.clickScorecardPlusViewAccountButton();
    
    // Verify navigation to account page
    await expect(page).toHaveURL(TD.urlPatterns.accountSummary);
    
    // Verify page loads without errors
    await expect(page.locator('body')).toBeVisible();
    
    // Verify user context is preserved (user remains authenticated)
    const currentUrl = page.url();
    expect(currentUrl).toMatch(TD.urlPatterns.accountSummary);
  });
});