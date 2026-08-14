const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const Auth0LoginPage = require('../../pages/auth0-login.page');
const CommonHeaderPage = require('../../pages/common-header.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC6] Pricing text remains after sign out', { tag: ['@regression'] }, () => {
  let scorecardPage;
  let auth0Page;
  let headerPage;

  test('[QS-391][TC-020] Verify \'$99 Annual Membership\' text remains displayed after user signs out', async ({ page }) => {
    await page.setViewportSize(TD.DESKTOP_VIEWPORT);
    
    headerPage = new CommonHeaderPage(page);
    scorecardPage = new ScorecardMarketingPage(page);
    auth0Page = new Auth0LoginPage(page);
    
    // Authenticate user and navigate to Scorecard marketing page
    await headerPage.clearAllAuthData();
    await scorecardPage.goto();
    await scorecardPage.clickScorecardSignInButton();
    await auth0Page.isOnAuth0LoginPage();
    await auth0Page.signIn(TD.VALID_EMAIL, TD.VALID_PASSWORD);
    await page.waitForURL(/scorecard/, { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Verify pricing text is displayed
    const pricingTextAuth = await scorecardPage.getScorecardPlusPricingText();
    expect(pricingTextAuth).toContain('$99');
    
    // Sign out from the application
    await headerPage.clearAllAuthData();
    
    // Navigate back to Scorecard marketing page
    await scorecardPage.goto();
    await page.waitForTimeout(2000);
    
    // Verify pricing text is still displayed
    const pricingTextGuest = await scorecardPage.getScorecardPlusPricingText();
    expect(pricingTextGuest).toContain('$99');
    expect(pricingTextGuest).toContain('Annual Membership');
  });
});