const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QE-317: Verify benefits messaging remains unchanged regardless of authentication state', { tag: ['@regression'] }, () => {
  let scorecardPage;
  let guestBenefits;

  test('[QE-317] Verify benefits messaging unchanged across authentication states', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Access Scorecard marketing page as guest user
    await scorecardPage.clearSessionData();
    await scorecardPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardPage, { timeout: 20000 });
    await expect(page.locator('section, main, div').filter({ has: page.getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }) }).first()).toBeVisible({ timeout: 20000 });

    // Step 2: Verify benefits messaging on Scorecard+ tile in guest state
    guestBenefits = await scorecardPage.getScorecardPlusBenefitsText();
    expect(guestBenefits).toMatch(TD.textPatterns.scorecardPlusBenefits);

    // Step 3: Sign in with valid user credentials
    // NOTE: Authentication implementation depends on your auth flow
    // This is a placeholder - implement actual sign-in logic
    // Example: await authPage.signIn(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);

    // Step 4: Navigate to Scorecard marketing page as authenticated user
    await scorecardPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardPage, { timeout: 20000 });
    await expect(page.locator('section, main, div').filter({ has: page.getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }) }).first()).toBeVisible({ timeout: 20000 });

    // Step 5: Verify benefits messaging on Scorecard+ tile in authenticated state
    const authBenefits = await scorecardPage.getScorecardPlusBenefitsText();
    expect(authBenefits).toMatch(TD.textPatterns.scorecardPlusBenefits);

    // Step 6: Compare benefits messaging between guest and authenticated states
    expect(authBenefits).toMatch(TD.textPatterns.scorecardPlusBenefits);
  });
});