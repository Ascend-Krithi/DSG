const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const AuthenticationPage = require('../../pages/authentication.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-291][AC7] Verify logos remain unchanged across guest and authenticated states', { tag: ['@regression', '@dsg-scorecard'] }, () => {
  let scorecardPage;
  let authPage;
  let guestScorecardLogo;
  let guestScorecardPlusLogo;

  test('[QE-291] Verify Scorecard and Scorecard+ logos remain identical across guest and authenticated states', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    authPage = new AuthenticationPage(page);

    // Step 1: Navigate to Scorecard marketing page as guest user
    await scorecardPage.goto();
    await expect(scorecardPage.isComparisonSectionVisible()).resolves.toBe(true);

    // Step 2: Capture Scorecard logo in guest state
    guestScorecardLogo = await scorecardPage.getScorecardLogoAttributes();
    expect(guestScorecardLogo.src).toBeTruthy();
    expect(guestScorecardLogo.alt).toBeTruthy();
    expect(guestScorecardLogo.width).toBeGreaterThan(0);
    expect(guestScorecardLogo.height).toBeGreaterThan(0);

    // Step 3: Capture Scorecard+ logo in guest state
    guestScorecardPlusLogo = await scorecardPage.getScorecardPlusLogoAttributes();
    expect(guestScorecardPlusLogo.src).toBeTruthy();
    expect(guestScorecardPlusLogo.alt).toBeTruthy();
    expect(guestScorecardPlusLogo.width).toBeGreaterThan(0);
    expect(guestScorecardPlusLogo.height).toBeGreaterThan(0);

    // Step 4: Authenticate user with valid credentials
    await scorecardPage.clickScorecardGuestCta();
    await expect(scorecardPage.isOnSignInPage()).resolves.toBe(true);
    await authPage.signIn(TD.testUsers.validEmail, TD.testUsers.validPassword);
    await page.waitForLoadState('domcontentloaded');

    // Step 5: Navigate to Scorecard marketing page as authenticated user
    await scorecardPage.goto();
    await expect(scorecardPage.isComparisonSectionVisible()).resolves.toBe(true);

    // Step 6: Verify Scorecard logo remains unchanged in authenticated state
    const authScorecardLogo = await scorecardPage.getScorecardLogoAttributes();
    expect(authScorecardLogo.src).toBe(guestScorecardLogo.src);
    expect(authScorecardLogo.alt).toBe(guestScorecardLogo.alt);
    expect(authScorecardLogo.width).toBe(guestScorecardLogo.width);
    expect(authScorecardLogo.height).toBe(guestScorecardLogo.height);

    // Step 7: Verify Scorecard+ logo remains unchanged in authenticated state
    const authScorecardPlusLogo = await scorecardPage.getScorecardPlusLogoAttributes();
    expect(authScorecardPlusLogo.src).toBe(guestScorecardPlusLogo.src);
    expect(authScorecardPlusLogo.alt).toBe(guestScorecardPlusLogo.alt);
    expect(authScorecardPlusLogo.width).toBe(guestScorecardPlusLogo.width);
    expect(authScorecardPlusLogo.height).toBe(guestScorecardPlusLogo.height);
  });
});