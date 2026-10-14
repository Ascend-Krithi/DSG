const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const SignInPage = require('../../pages/signin.page');
const testData = require('../../data/scorecard-test-data');

test.describe('[TS-004][AC2] Guest CTA Redirection to Sign In', () => {
  let scorecardPage;
  let signInPage;

  test.beforeEach(async ({ page, context }) => {
    scorecardPage = new ScorecardPage(page);
    signInPage = new SignInPage(page);
    await page.setViewportSize(testData.viewports.desktop);
    // Clear cookies to ensure guest state
    await context.clearCookies();
  });

  test('[QE-955] Verify clicking guest CTA on Scorecard tile redirects to Sign In page', async ({ page }) => {
    // Step 1: Clear all browser cookies and session data to ensure guest state
    await page.context().clearCookies();
    console.log('✓ All authentication cookies and session data are cleared');

    // Step 2: Navigate to the Scorecard marketing page using a desktop device
    await scorecardPage.goto();
    await page.waitForLoadState('domcontentloaded');
    
    const currentUrl = await scorecardPage.getCurrentUrl();
    expect(currentUrl).toContain('ScoreCard');
    console.log('✓ Scorecard marketing page loads successfully in guest mode');

    // Step 3: Locate the Sign In / Join Now CTA button on the Scorecard tile
    const isCtaVisible = await scorecardPage.isScorecardGuestCtaVisible();
    expect(isCtaVisible).toBeTruthy();
    const isCtaEnabled = await scorecardPage.isScorecardGuestCtaEnabled();
    expect(isCtaEnabled).toBeTruthy();
    console.log('✓ Sign In / Join Now CTA button is visible and clickable');

    // Step 4: Click the Sign In / Join Now CTA button
    await scorecardPage.clickScorecardGuestCta();
    await page.waitForLoadState('domcontentloaded');
    console.log('✓ Click action is registered and navigation is initiated');

    // Step 5: Verify redirection to the Sign In page
    const newUrl = await page.url();
    expect(newUrl).toMatch(testData.urls.signInPattern);
    console.log('✓ User is redirected to the Sign In page (URL contains /signin or equivalent)');

    // Step 6: Verify the Sign In page loads successfully
    const isSignInPageLoaded = await signInPage.isSignInPageLoaded();
    expect(isSignInPageLoaded).toBeTruthy();
    
    const isEmailVisible = await signInPage.isEmailFieldVisible();
    const isPasswordVisible = await signInPage.isPasswordFieldVisible();
    const isSignInButtonVisible = await signInPage.isSignInButtonVisible();
    
    expect(isEmailVisible).toBeTruthy();
    expect(isPasswordVisible).toBeTruthy();
    expect(isSignInButtonVisible).toBeTruthy();
    console.log('✓ Sign In page is fully loaded with all required authentication fields visible');
  });
});