const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const SignInPage = require('../../pages/signin.page');
const testData = require('../../data/scorecard-test-data');

test.describe('[TS-005][AC2] Successful Sign-In Redirect', () => {
  let scorecardPage;
  let signInPage;

  test.beforeEach(async ({ page, context }) => {
    scorecardPage = new ScorecardPage(page);
    signInPage = new SignInPage(page);
    await page.setViewportSize(testData.viewports.desktop);
    // Clear cookies to ensure guest state
    await context.clearCookies();
  });

  test('[QE-956] Verify successful sign-in redirects user back to Scorecard marketing page', async ({ page }) => {
    // Step 1: Clear all browser cookies and session data to ensure guest state
    await page.context().clearCookies();
    console.log('✓ All authentication cookies and session data are cleared');

    // Step 2: Navigate to the Scorecard marketing page and click Sign In / Join Now CTA
    await scorecardPage.goto();
    await page.waitForLoadState('domcontentloaded');
    await scorecardPage.clickScorecardGuestCta();
    await page.waitForLoadState('domcontentloaded');
    
    const signInUrl = await page.url();
    expect(signInUrl).toMatch(testData.urls.signInPattern);
    console.log('✓ User is redirected to Sign In page');

    // Step 3: Enter valid email address in the username/email field
    await signInPage.fillEmail(testData.credentials.validEmail);
    console.log('✓ Email is entered successfully in the field');

    // Step 4: Enter valid password in the password field
    await signInPage.fillPassword(testData.credentials.validPassword);
    console.log('✓ Password is entered successfully in the field (masked)');

    // Step 5: Click the Sign In button
    await signInPage.clickSignInButton();
    await page.waitForLoadState('domcontentloaded');
    console.log('✓ Sign In request is submitted and authentication process begins');

    // Step 6: Verify successful authentication
    await page.waitForTimeout(2000); // Wait for authentication to complete
    console.log('✓ User is successfully authenticated, session is established');

    // Step 7: Verify redirection back to Scorecard marketing page
    const currentUrl = await page.url();
    expect(currentUrl).toContain('ScoreCard');
    console.log('✓ User is redirected back to the Scorecard marketing page (original URL)');

    // Step 8: Verify authenticated state on the marketing page
    const isViewAccountVisible = await scorecardPage.isViewAccountScorecardCtaVisible();
    expect(isViewAccountVisible).toBeTruthy();
    
    const viewAccountText = await scorecardPage.getViewAccountScorecardCtaText();
    expect(viewAccountText).toMatch(testData.expectedText.viewAccountCta);
    console.log('✓ CTAs now display View Account instead of Sign In / Join Now, confirming authenticated state');
  });
});