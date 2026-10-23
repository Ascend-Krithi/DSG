const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QE-320: Verify Scorecard tile displays appropriate CTA based on authentication state', { tag: ['@regression'] }, () => {
  let scorecardPage;

  test('[QE-320] Verify Scorecard tile CTA changes based on authentication state', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Access Scorecard marketing page as guest user
    await scorecardPage.clearSessionData();
    await scorecardPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardPage, { timeout: 20000 });
    await expect(page.locator('section, main, div').filter({ has: page.getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }) }).first()).toBeVisible({ timeout: 20000 });

    // Step 2: Verify 'Sign In / Join Now' CTA is displayed on Scorecard tile for guest user
    const isScorecardGuestCtaVisible = await scorecardPage.isScorecardGuestCtaVisible();
    expect(isScorecardGuestCtaVisible).toBeTruthy();
    const guestCtaText = await scorecardPage.getScorecardGuestCtaText();
    expect(guestCtaText).toMatch(TD.textPatterns.guestCtaScorecard);

    // Step 3: Sign in with valid user credentials
    // NOTE: Authentication implementation depends on your auth flow
    // This is a placeholder - implement actual sign-in logic
    // Example: await authPage.signIn(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);

    // Step 4: Navigate to Scorecard marketing page as authenticated user
    await scorecardPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardPage, { timeout: 20000 });
    await expect(page.locator('section, main, div').filter({ has: page.getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }) }).first()).toBeVisible({ timeout: 20000 });

    // Step 5: Verify 'View Account' CTA is displayed on Scorecard tile for authenticated user
    const isViewAccountVisible = await scorecardPage.isViewAccountScorecardTileVisible();
    expect(isViewAccountVisible).toBeTruthy();
    const authCtaText = await scorecardPage.getViewAccountScorecardTileText();
    expect(authCtaText).toMatch(TD.textPatterns.authCta);

    // Step 6: Verify CTA changes appropriately based on authentication state
    expect(authCtaText).not.toMatch(TD.textPatterns.guestCtaScorecard);
  });
});