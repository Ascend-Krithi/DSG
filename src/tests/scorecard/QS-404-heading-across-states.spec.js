const { test, expect } = require('@playwright/test');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const Auth0LoginPage = require('../../pages/auth0-login.page');
const CommonHeaderPage = require('../../pages/common-header.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QS-107][AC9] Section heading visible across authentication states', { tag: ['@regression'] }, () => {
  let scorecardPage;
  let auth0Page;
  let headerPage;

  test('[QS-404][TC-033] Verify section heading remains visible across different authentication states', async ({ page }) => {
    await page.setViewportSize(TD.DESKTOP_VIEWPORT);
    
    headerPage = new CommonHeaderPage(page);
    scorecardPage = new ScorecardMarketingPage(page);
    auth0Page = new Auth0LoginPage(page);
    
    // Navigate to Scorecard marketing page as guest user
    await headerPage.clearAllAuthData();
    await scorecardPage.goto();
    await page.waitForTimeout(2000);
    
    // Verify section heading is displayed in guest state
    const isHeadingVisibleGuest = await scorecardPage.isSectionHeadingVisible();
    expect(isHeadingVisibleGuest).toBeTruthy();
    
    const headingTextGuest = await scorecardPage.getSectionHeadingText();
    expect(headingTextGuest).toContain(TD.SECTION_HEADING);
    
    // Authenticate user with valid credentials
    await scorecardPage.clickScorecardSignInButton();
    await auth0Page.isOnAuth0LoginPage();
    await auth0Page.signIn(TD.VALID_EMAIL, TD.VALID_PASSWORD);
    await page.waitForURL(/scorecard/, { timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Verify section heading is still displayed in authenticated state
    const isHeadingVisibleAuth = await scorecardPage.isSectionHeadingVisible();
    expect(isHeadingVisibleAuth).toBeTruthy();
    
    const headingTextAuth = await scorecardPage.getSectionHeadingText();
    expect(headingTextAuth).toBe(headingTextGuest);
  });
});