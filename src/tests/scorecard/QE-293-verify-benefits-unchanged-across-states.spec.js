const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const AuthenticationPage = require('../../pages/authentication.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-293][AC7] Verify benefits messaging remains unchanged across guest and authenticated states', { tag: ['@regression', '@dsg-scorecard'] }, () => {
  let scorecardPage;
  let authPage;
  let guestBenefitsText;

  test('[QE-293] Verify benefits messaging text remains identical across guest and authenticated states', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    authPage = new AuthenticationPage(page);

    // Step 1: Navigate to Scorecard marketing page as guest user
    await scorecardPage.goto();
    await expect(scorecardPage.isComparisonSectionVisible()).resolves.toBe(true);

    // Step 2: Capture benefits messaging text in guest state
    guestBenefitsText = await scorecardPage.getScorecardPlusBenefitsText();
    expect(guestBenefitsText).toMatch(TD.scorecardPlus.benefits);

    // Step 3: Authenticate user with valid credentials
    await scorecardPage.clickScorecardGuestCta();
    await expect(scorecardPage.isOnSignInPage()).resolves.toBe(true);
    await authPage.signIn(TD.testUsers.validEmail, TD.testUsers.validPassword);
    await page.waitForLoadState('domcontentloaded');

    // Step 4: Navigate to Scorecard marketing page as authenticated user
    await scorecardPage.goto();
    await expect(scorecardPage.isComparisonSectionVisible()).resolves.toBe(true);

    // Step 5: Verify benefits messaging text remains unchanged in authenticated state
    const authBenefitsText = await scorecardPage.getScorecardPlusBenefitsText();
    expect(authBenefitsText).toMatch(TD.scorecardPlus.benefits);
    expect(authBenefitsText).toBe(guestBenefitsText);
  });
});