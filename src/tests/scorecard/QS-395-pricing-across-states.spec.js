const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const Auth0LoginPage = require('../../pages/auth0-login.page');
const CommonHeaderPage = require('../../pages/common-header.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC7] Pricing unchanged across authentication states', { tag: ['@regression'] }, () => {
  let scorecardPage;
  let auth0Page;
  let headerPage;

  test('[QS-395][TC-024] Verify membership pricing remains unchanged across different authentication states', async ({ page }) => {
    await page.setViewportSize(TD.DESKTOP_VIEWPORT);
    
    headerPage = new CommonHeaderPage(page);
    scorecardPage = new ScorecardMarketingPage(page);
    auth0Page = new Auth0LoginPage(page);
    
    // Navigate to Scorecard marketing page as guest user
    await headerPage.clearAllAuthData();
    await scorecardPage.goto();
    await page.waitForTimeout(2000);
    
    // Capture membership pricing text from guest state
    const pricingTextGuest = await scorecardPage.getScorecardPlusPricingText();
    expect(pricingTextGuest).toContain('$99');
    
    // Authenticate user with valid credentials
    await scorecardPage.clickScorecardSignInButton();
    await auth0Page.isOnAuth0LoginPage();
    await auth0Page.signIn(TD.VALID_EMAIL, TD.VALID_PASSWORD);
    await page.waitForURL(/scorecard/, { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Verify membership pricing text remains unchanged
    const pricingTextAuth = await scorecardPage.getScorecardPlusPricingText();
    expect(pricingTextAuth).toBe(pricingTextGuest);
  });
});