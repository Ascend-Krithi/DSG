const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QE-313: Verify Join Now button is displayed after user signs out and returns to Scorecard marketing page', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QE-313] Verify Join Now button after sign out', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Sign in with valid user credentials
    // NOTE: Authentication implementation depends on your auth flow
    // This is a placeholder - implement actual sign-in logic
    // Example: await authPage.signIn(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);

    // Step 2: Navigate to the Scorecard marketing page while authenticated
    await scorecardPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardPage, { timeout: 20000 });
    await expect(page.locator('section, main, div').filter({ has: page.getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }) }).first()).toBeVisible({ timeout: 20000 });

    // Verify View Account buttons are visible (authenticated state)
    const isViewAccountScorecardVisible = await scorecardPage.isViewAccountScorecardTileVisible();
    expect(isViewAccountScorecardVisible).toBeTruthy();

    // Step 3: Sign out from the application
    // NOTE: Sign-out implementation depends on your auth flow
    // This is a placeholder - implement actual sign-out logic
    // Example: await authPage.signOut();
    await scorecardPage.clearSessionData();

    // Step 4: Navigate back to the Scorecard marketing page
    await scorecardPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardPage, { timeout: 20000 });
    await expect(page.locator('section, main, div').filter({ has: page.getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }) }).first()).toBeVisible({ timeout: 20000 });

    // Step 5: Verify 'Join Now' button is displayed on Scorecard tile
    const isScorecardGuestCtaVisible = await scorecardPage.isScorecardGuestCtaVisible();
    expect(isScorecardGuestCtaVisible).toBeTruthy();
    const scorecardCtaText = await scorecardPage.getScorecardGuestCtaText();
    expect(scorecardCtaText).toMatch(TD.textPatterns.guestCtaScorecard);

    // Step 6: Verify 'Join Now' button is displayed on Scorecard+ tile
    const isScorecardPlusGuestCtaVisible = await scorecardPage.isScorecardPlusGuestCtaVisible();
    expect(isScorecardPlusGuestCtaVisible).toBeTruthy();
    const scorecardPlusCtaText = await scorecardPage.getScorecardPlusGuestCtaText();
    expect(scorecardPlusCtaText).toMatch(TD.textPatterns.guestCtaScorecardPlus);
  });
});