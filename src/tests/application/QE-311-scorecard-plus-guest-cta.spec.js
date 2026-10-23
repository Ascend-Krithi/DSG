const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QE-311: Verify Scorecard+ tile displays appropriate CTA based on guest user authentication state', { tag: ['@smoke', '@regression'] }, () => {
  let scorecardPage;

  test('[QE-311] Verify Scorecard+ tile displays appropriate CTA for guest user', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Ensure user is not authenticated (clear all cookies and session data)
    await scorecardPage.clearSessionData();

    // Step 2: Launch the Scorecard marketing page URL on desktop
    await scorecardPage.goto();
    await expect(page).toHaveURL(TD.urlPatterns.scorecardPage, { timeout: 20000 });

    // Step 3: Navigate to the Scorecard+ tile in the comparison section
    await expect(page.locator('section, main, div').filter({ has: page.getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }) }).first()).toBeVisible({ timeout: 20000 });
    const isScorecardPlusTileVisible = await scorecardPage.isScorecardPlusTileVisible();
    expect(isScorecardPlusTileVisible).toBeTruthy();

    // Step 4: Verify appropriate CTA button is displayed for guest user
    const isGuestCtaVisible = await scorecardPage.isScorecardPlusGuestCtaVisible();
    expect(isGuestCtaVisible).toBeTruthy();
    const ctaText = await scorecardPage.getScorecardPlusGuestCtaText();
    expect(ctaText).toMatch(TD.textPatterns.guestCtaScorecardPlus);

    // Step 5: Verify button is clickable and properly styled
    const guestCta = page.locator('section, main, div').filter({ has: page.getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }) }).first()
      .locator('div, section, article, li').filter({ has: page.getByAltText(TD.altText.scorecardPlusLogoSummary) }).first()
      .getByRole('button', { name: /^join now$/i }).or(page.locator('section, main, div').filter({ has: page.getByRole('heading', { name: TD.textPatterns.sectionHeading, level: 2 }) }).first()
      .locator('div, section, article, li').filter({ has: page.getByAltText(TD.altText.scorecardPlusLogoSummary) }).first().getByRole('link', { name: /^join now$/i }));
    await expect(guestCta).toBeEnabled({ timeout: 20000 });
  });
});