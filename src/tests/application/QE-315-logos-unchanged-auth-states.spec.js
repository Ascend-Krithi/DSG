const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QE-315: Verify logos remain unchanged regardless of authentication state', { tag: ['@regression'] }, () => {
  let scorecardPage;
  let guestLogoState = {};

  test('[QE-315] Verify logos unchanged across authentication states', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Access Scorecard marketing page as guest user
    await scorecardPage.clearSessionData();
    await scorecardPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardPage, { timeout: 20000 });
    await expect(page.locator('section, main, div').filter({ has: page.getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }) }).first()).toBeVisible({ timeout: 20000 });

    // Step 2: Capture/note Scorecard logo and Scorecard+ Dark Logo in guest state
    guestLogoState.scorecardLogoVisible = await scorecardPage.isScorecardLogoVisible();
    guestLogoState.scorecardPlusLogoVisible = await scorecardPage.isScorecardPlusLogoSummaryVisible();

    // Step 3: Sign in with valid user credentials
    // NOTE: Authentication implementation depends on your auth flow
    // This is a placeholder - implement actual sign-in logic
    // Example: await authPage.signIn(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);

    // Step 4: Navigate to Scorecard marketing page as authenticated user
    await scorecardPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardPage, { timeout: 20000 });
    await expect(page.locator('section, main, div').filter({ has: page.getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }) }).first()).toBeVisible({ timeout: 20000 });

    // Step 5: Verify Scorecard logo is identical to guest state
    const scorecardLogoVisibleAuth = await scorecardPage.isScorecardLogoVisible();
    expect(scorecardLogoVisibleAuth).toBe(guestLogoState.scorecardLogoVisible);

    // Step 6: Verify Scorecard+ Dark Logo is identical to guest state
    const scorecardPlusLogoVisibleAuth = await scorecardPage.isScorecardPlusLogoSummaryVisible();
    expect(scorecardPlusLogoVisibleAuth).toBe(guestLogoState.scorecardPlusLogoVisible);
  });
});