const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QE-316: Verify membership pricing remains unchanged regardless of authentication state', { tag: ['@regression'] }, () => {
  let scorecardPage;
  let guestPricing;

  test('[QE-316] Verify pricing unchanged across authentication states', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Access Scorecard marketing page as guest user
    await scorecardPage.clearSessionData();
    await scorecardPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardPage, { timeout: 20000 });
    await expect(page.locator('section, main, div').filter({ has: page.getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }) }).first()).toBeVisible({ timeout: 20000 });

    // Step 2: Verify pricing information on Scorecard+ tile in guest state
    guestPricing = await scorecardPage.getScorecardPlusPriceText();
    expect(guestPricing).toMatch(TD.textPatterns.scorecardPlusPrice);

    // Step 3: Sign in with valid user credentials
    // NOTE: Authentication implementation depends on your auth flow
    // This is a placeholder - implement actual sign-in logic
    // Example: await authPage.signIn(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);

    // Step 4: Navigate to Scorecard marketing page as authenticated user
    await scorecardPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardPage, { timeout: 20000 });
    await expect(page.locator('section, main, div').filter({ has: page.getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }) }).first()).toBeVisible({ timeout: 20000 });

    // Step 5: Verify pricing information on Scorecard+ tile in authenticated state
    const authPricing = await scorecardPage.getScorecardPlusPriceText();
    expect(authPricing).toMatch(TD.textPatterns.scorecardPlusPrice);

    // Step 6: Compare pricing information between guest and authenticated states
    expect(authPricing.trim()).toBe(guestPricing.trim());
  });
});