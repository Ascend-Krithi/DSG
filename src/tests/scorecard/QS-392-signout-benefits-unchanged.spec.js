const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const Auth0LoginPage = require('../../pages/auth0-login.page');
const CommonHeaderPage = require('../../pages/common-header.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC6] Benefits text remains after sign out', { tag: ['@regression'] }, () => {
  let scorecardPage;
  let auth0Page;
  let headerPage;

  test('[QS-392][TC-021] Verify \'That\'s $350 in Benefits!\' text remains displayed after user signs out', async ({ page }) => {
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
    
    // Verify benefits text is displayed
    const benefitsTextAuth = await scorecardPage.getScorecardPlusBenefitsText();
    expect(benefitsTextAuth).toContain('$350');
    
    // Sign out from the application
    await headerPage.clearAllAuthData();
    
    // Navigate back to Scorecard marketing page
    await scorecardPage.goto();
    await page.waitForTimeout(2000);
    
    // Verify benefits text is still displayed
    const benefitsTextGuest = await scorecardPage.getScorecardPlusBenefitsText();
    expect(benefitsTextGuest).toContain('$350');
    expect(benefitsTextGuest).toContain('Benefits');
  });
});