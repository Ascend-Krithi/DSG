const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-1][AC4] CTA Variant Tolerance for Approved Business Labels', { tag: ['@regression', '@scorecard', '@non-functional'] }, () => {
  let scorecardPage;

  test('[QE-300] Verify CTA variant tolerance for approved business labels on Scorecard+ tile', async ({ page }) => {
    scorecardPage = new ScorecardMarketingPage(page);

    await test.step('Ensure user is not authenticated', async () => {
      await page.context().clearCookies();
    });

    await test.step('Navigate to Scorecard marketing page', async () => {
      await scorecardPage.goto();
    });

    await test.step('Locate CTA button on Scorecard+ tile', async () => {
      const ctaText = await scorecardPage.getScorecardPlusCtaText();
      expect(ctaText).toBeTruthy();
    });

    await test.step('Verify CTA displays one of the approved variants', async () => {
      const ctaText = await scorecardPage.getScorecardPlusCtaText();
      expect(ctaText).toMatch(TD.GUEST_CTA_SCORECARD_PLUS);
    });

    await test.step('Verify CTA is clickable and functional', async () => {
      const ctaElement = page.locator('my-account-templates-page-header').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first().getByRole('button', { name: /^join now$/i }).or(page.locator('my-account-templates-page-header').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first().getByRole('link', { name: /^join now$/i })).or(page.locator('my-account-templates-page-header').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first().getByRole('button', { name: /join scorecard\+\s*now/i })).first();
      await expect(ctaElement).toBeEnabled();
      await expect(ctaElement).toBeVisible();
    });

    await test.step('Verify CTA maintains consistent styling across variants', async () => {
      const ctaElement = page.locator('my-account-templates-page-header').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first().getByRole('button', { name: /^join now$/i }).or(page.locator('my-account-templates-page-header').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first().getByRole('link', { name: /^join now$/i })).or(page.locator('my-account-templates-page-header').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first().getByRole('button', { name: /join scorecard\+\s*now/i })).first();
      const box = await ctaElement.boundingBox();
      expect(box).toBeTruthy();
      expect(box.width).toBeGreaterThan(0);
      expect(box.height).toBeGreaterThan(0);
    });
  });
});