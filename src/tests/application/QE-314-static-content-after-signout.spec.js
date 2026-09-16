const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QE-314: Verify all static marketing content remains unchanged after user signs out', { tag: ['@regression'] }, () => {
  let scorecardPage;
  let authStaticContent = {};

  test('[QE-314] Verify static content unchanged after sign out', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Sign in with valid user credentials and navigate to Scorecard marketing page
    // NOTE: Authentication implementation depends on your auth flow
    // This is a placeholder - implement actual sign-in logic
    // Example: await authPage.signIn(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
    await scorecardPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardPage, { timeout: 20000 });
    await expect(page.locator('section, main, div').filter({ has: page.getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }) }).first()).toBeVisible({ timeout: 20000 });

    // Step 2: Capture/note all static content elements (logos, pricing, benefits)
    const isScorecardPlusLogoVisible = await scorecardPage.isScorecardPlusLogoSummaryVisible();
    authStaticContent.logoVisible = isScorecardPlusLogoVisible;
    authStaticContent.pricing = await scorecardPage.getScorecardPlusPriceText();
    authStaticContent.benefits = await scorecardPage.getScorecardPlusBenefitsText();

    // Step 3: Sign out from the application
    // NOTE: Sign-out implementation depends on your auth flow
    // Example: await authPage.signOut();
    await scorecardPage.clearSessionData();

    // Step 4: Navigate back to the Scorecard marketing page
    await scorecardPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardPage, { timeout: 20000 });
    await expect(page.locator('section, main, div').filter({ has: page.getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }) }).first()).toBeVisible({ timeout: 20000 });

    // Step 5: Verify Scorecard+ Dark Logo remains unchanged
    const isLogoVisibleAfterSignout = await scorecardPage.isScorecardPlusLogoSummaryVisible();
    expect(isLogoVisibleAfterSignout).toBe(authStaticContent.logoVisible);

    // Step 6: Verify pricing information remains unchanged
    const pricingAfterSignout = await scorecardPage.getScorecardPlusPriceText();
    expect(pricingAfterSignout).toMatch(TD.textPatterns.scorecardPlusPrice);
    expect(pricingAfterSignout.trim()).toBe(authStaticContent.pricing.trim());

    // Step 7: Verify benefits messaging remains unchanged
    const benefitsAfterSignout = await scorecardPage.getScorecardPlusBenefitsText();
    expect(benefitsAfterSignout).toMatch(TD.textPatterns.scorecardPlusBenefits);
  });
});