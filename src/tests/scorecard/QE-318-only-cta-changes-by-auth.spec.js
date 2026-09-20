const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const AuthPage = require('../../pages/auth.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-1][AC7] Verify only CTA changes based on user authentication status while all other content remains static', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;
  let authPage;
  let guestContent = {};

  test('[QE-318] Verify only CTAs change between guest and authenticated states', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    authPage = new AuthPage(page);

    await test.step('Access Scorecard marketing page as guest user', async () => {
      await scorecardPage.clearSession();
      await scorecardPage.goto();
      await expect(page).toHaveURL(TD.urlPatterns.scorecard, { timeout: 20000 });
    });

    await test.step('Document all content elements in guest state (logos, pricing, benefits, CTAs)', async () => {
      await expect(scorecardPage.getScorecardLogo()).toBeVisible({ timeout: 20000 });
      await expect(scorecardPage.getScorecardPlusLogo()).toBeVisible({ timeout: 20000 });
      await expect(scorecardPage.getScorecardPlusPrice()).toBeVisible({ timeout: 20000 });
      await expect(scorecardPage.getScorecardPlusBenefits()).toBeVisible({ timeout: 20000 });
      await expect(scorecardPage.getScorecardGuestCta()).toBeVisible({ timeout: 20000 });
      await expect(scorecardPage.getScorecardPlusGuestCta()).toBeVisible({ timeout: 20000 });

      guestContent.scorecardLogo = await scorecardPage.getScorecardLogoAltText();
      guestContent.scorecardPlusLogo = await scorecardPage.getScorecardPlusLogoAltText();
      guestContent.price = await scorecardPage.getScorecardPlusPriceText();
      guestContent.benefits = await scorecardPage.getScorecardPlusBenefitsText();
      guestContent.scorecardCta = await scorecardPage.getScorecardGuestCta().textContent();
      guestContent.scorecardPlusCta = await scorecardPage.getScorecardPlusGuestCta().textContent();
    });

    await test.step('Sign in with valid user credentials', async () => {
      const username = process.env.TEST_USERNAME || 'test@example.com';
      const password = process.env.TEST_PASSWORD || 'testpassword';
      await authPage.signIn(username, password);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Navigate to Scorecard marketing page as authenticated user', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(TD.urlPatterns.scorecard, { timeout: 20000 });
    });

    await test.step('Verify logos remain unchanged', async () => {
      const authScorecardLogo = await scorecardPage.getScorecardLogoAltText();
      const authScorecardPlusLogo = await scorecardPage.getScorecardPlusLogoAltText();
      expect(authScorecardLogo).toBe(guestContent.scorecardLogo);
      expect(authScorecardPlusLogo).toBe(guestContent.scorecardPlusLogo);
    });

    await test.step('Verify pricing remains unchanged', async () => {
      const authPrice = await scorecardPage.getScorecardPlusPriceText();
      expect(authPrice).toBe(guestContent.price);
    });

    await test.step('Verify benefits messaging remains unchanged', async () => {
      const authBenefits = await scorecardPage.getScorecardPlusBenefitsText();
      expect(authBenefits).toBe(guestContent.benefits);
    });

    await test.step('Verify CTA buttons have changed to View Account', async () => {
      await expect(scorecardPage.getViewAccountScorecardTile()).toBeVisible({ timeout: 20000 });
      await expect(scorecardPage.getViewAccountScorecardPlusTile()).toBeVisible({ timeout: 20000 });
      const authScorecardCta = await scorecardPage.getViewAccountScorecardTile().textContent();
      const authScorecardPlusCta = await scorecardPage.getViewAccountScorecardPlusTile().textContent();
      expect(authScorecardCta).toMatch(TD.ctas.viewAccount);
      expect(authScorecardPlusCta).toMatch(TD.ctas.viewAccount);
    });

    await test.step('Confirm only CTAs changed while all other content remained static', async () => {
      const authScorecardCta = await scorecardPage.getViewAccountScorecardTile().textContent();
      const authScorecardPlusCta = await scorecardPage.getViewAccountScorecardPlusTile().textContent();
      expect(authScorecardCta).not.toBe(guestContent.scorecardCta);
      expect(authScorecardPlusCta).not.toBe(guestContent.scorecardPlusCta);
    });
  });
});