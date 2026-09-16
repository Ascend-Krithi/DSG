const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-1][AC4] Verify Scorecard+ tile displays appropriate CTA based on guest user authentication state', { tag: ['@smoke', '@regression', '@scorecard'] }, () => {
  let scorecardPage;

  test('[QE-311] Verify Scorecard+ tile displays appropriate CTA for guest user', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    await test.step('Ensure user is not authenticated (clear all cookies and session data)', async () => {
      await scorecardPage.clearSession();
      await expect(page.context()).toBeTruthy();
    });

    await test.step('Launch the Scorecard marketing page URL on desktop', async () => {
      await scorecardPage.goto();
      await expect(page).toHaveURL(TD.urlPatterns.scorecard, { timeout: 20000 });
    });

    await test.step('Navigate to the Scorecard+ tile in the comparison section', async () => {
      await expect(scorecardPage.getComparisonSection()).toBeVisible({ timeout: 20000 });
      await expect(scorecardPage.getScorecardPlusTile()).toBeVisible({ timeout: 20000 });
    });

    await test.step('Verify appropriate CTA button is displayed for guest user', async () => {
      const guestCta = scorecardPage.getScorecardPlusGuestCta();
      await expect(guestCta).toBeVisible({ timeout: 20000 });
      const ctaText = await guestCta.textContent();
      expect(ctaText).toMatch(TD.ctas.guestScorecardPlus);
    });

    await test.step('Verify button is clickable and properly styled', async () => {
      const guestCta = scorecardPage.getScorecardPlusGuestCta();
      await expect(guestCta).toBeEnabled({ timeout: 20000 });
      const isClickable = await scorecardPage.isScorecardPlusGuestCtaClickable();
      expect(isClickable).toBeTruthy();
    });
  });
});