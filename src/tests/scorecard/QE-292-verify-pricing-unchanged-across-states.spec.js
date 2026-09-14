const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const AuthenticationPage = require('../../pages/authentication.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-292][AC7] Verify membership pricing remains unchanged across guest and authenticated states', { tag: ['@regression', '@dsg-scorecard'] }, () => {
  let scorecardPage;
  let authPage;
  let guestPricingText;

  test('[QE-292] Verify membership pricing text remains identical across guest and authenticated states', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    authPage = new AuthenticationPage(page);

    // Step 1: Navigate to Scorecard marketing page as guest user
    await scorecardPage.goto();
    await expect(scorecardPage.isComparisonSectionVisible()).resolves.toBe(true);

    // Step 2: Capture membership pricing text in guest state
    guestPricingText = await scorecardPage.getScorecardPlusPriceText();
    expect(guestPricingText).toMatch(TD.scorecardPlus.price);

    // Step 3: Authenticate user with valid credentials
    await scorecardPage.clickScorecardGuestCta();
    await expect(scorecardPage.isOnSignInPage()).resolves.toBe(true);
    await authPage.signIn(TD.testUsers.validEmail, TD.testUsers.validPassword);
    await page.waitForLoadState('domcontentloaded');

    // Step 4: Navigate to Scorecard marketing page as authenticated user
    await scorecardPage.goto();
    await expect(scorecardPage.isComparisonSectionVisible()).resolves.toBe(true);

    // Step 5: Verify membership pricing text remains unchanged in authenticated state
    const authPricingText = await scorecardPage.getScorecardPlusPriceText();
    expect(authPricingText).toMatch(TD.scorecardPlus.price);
    expect(authPricingText).toBe(guestPricingText);
  });
});