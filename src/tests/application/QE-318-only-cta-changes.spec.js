const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QE-318: Verify only CTA changes based on user authentication status while all other content remains static', { tag: ['@regression'] }, () => {
  let scorecardPage;
  let guestState = {};

  test('[QE-318] Verify only CTA changes while other content remains static', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Access Scorecard marketing page as guest user
    await scorecardPage.clearSessionData();
    await scorecardPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardPage, { timeout: 20000 });
    await expect(page.locator('section, main, div').filter({ has: page.getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }) }).first()).toBeVisible({ timeout: 20000 });

    // Step 2: Document all content elements in guest state
    guestState.scorecardLogoVisible = await scorecardPage.isScorecardLogoVisible();
    guestState.scorecardPlusLogoVisible = await scorecardPage.isScorecardPlusLogoSummaryVisible();
    guestState.pricing = await scorecardPage.getScorecardPlusPriceText();
    guestState.benefits = await scorecardPage.getScorecardPlusBenefitsText();
    guestState.scorecardCtaVisible = await scorecardPage.isScorecardGuestCtaVisible();
    guestState.scorecardPlusCtaVisible = await scorecardPage.isScorecardPlusGuestCtaVisible();

    // Step 3: Sign in with valid user credentials
    // NOTE: Authentication implementation depends on your auth flow
    // This is a placeholder - implement actual sign-in logic
    // Example: await authPage.signIn(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);

    // Step 4: Navigate to Scorecard marketing page as authenticated user
    await scorecardPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardPage, { timeout: 20000 });
    await expect(page.locator('section, main, div').filter({ has: page.getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }) }).first()).toBeVisible({ timeout: 20000 });

    // Step 5: Verify logos remain unchanged
    const scorecardLogoVisibleAuth = await scorecardPage.isScorecardLogoVisible();
    expect(scorecardLogoVisibleAuth).toBe(guestState.scorecardLogoVisible);
    const scorecardPlusLogoVisibleAuth = await scorecardPage.isScorecardPlusLogoSummaryVisible();
    expect(scorecardPlusLogoVisibleAuth).toBe(guestState.scorecardPlusLogoVisible);

    // Step 6: Verify pricing remains unchanged
    const authPricing = await scorecardPage.getScorecardPlusPriceText();
    expect(authPricing.trim()).toBe(guestState.pricing.trim());

    // Step 7: Verify benefits messaging remains unchanged
    const authBenefits = await scorecardPage.getScorecardPlusBenefitsText();
    expect(authBenefits).toMatch(TD.textPatterns.scorecardPlusBenefits);

    // Step 8: Verify CTA buttons have changed to 'View Account'
    const isViewAccountScorecardVisible = await scorecardPage.isViewAccountScorecardTileVisible();
    expect(isViewAccountScorecardVisible).toBeTruthy();
    const isViewAccountScorecardPlusVisible = await scorecardPage.isViewAccountScorecardPlusTileVisible();
    expect(isViewAccountScorecardPlusVisible).toBeTruthy();

    // Step 9: Confirm only CTAs changed while all other content remained static
    const viewAccountScorecardText = await scorecardPage.getViewAccountScorecardTileText();
    expect(viewAccountScorecardText).toMatch(TD.textPatterns.authCta);
    const viewAccountScorecardPlusText = await scorecardPage.getViewAccountScorecardPlusTileText();
    expect(viewAccountScorecardPlusText).toMatch(TD.textPatterns.authCta);
  });
});