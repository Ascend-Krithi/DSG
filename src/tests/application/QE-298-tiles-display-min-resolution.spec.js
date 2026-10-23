const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-1][AC1] Tiles Display on Minimum Desktop Resolution', { tag: ['@regression', '@scorecard', '@non-functional'] }, () => {
  let scorecardPage;

  test.use({ viewport: TD.VIEWPORT_DESKTOP_MIN });

  test('[QE-298] Verify comparison tiles display correctly on minimum supported desktop resolution', async ({ page }) => {
    scorecardPage = new ScorecardMarketingPage(page);

    await test.step('Navigate to Scorecard marketing page', async () => {
      await scorecardPage.goto();
    });

    await test.step('Verify Scorecard tile is fully visible', async () => {
      const scorecardTile = page.locator('my-account-templates-page-header').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first().locator('*').filter({ hasText: /1 Point For Every \$1 Spent\.\s*300 Points = \$10 Reward\./i }).first();
      await expect(scorecardTile).toBeVisible();
    });

    await test.step('Verify Scorecard+ tile is fully visible', async () => {
      const scorecardPlusTile = page.locator('my-account-templates-page-header').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first().locator('*').filter({ has: page.getByAltText('ScoreCard Plus New Logo') }).filter({ hasText: /\$99 Annual Membership\./i }).filter({ hasText: /\$350 in Benefits!?/i }).first();
      await expect(scorecardPlusTile).toBeVisible();
    });

    await test.step('Verify tiles are positioned side by side', async () => {
      const areSideBySide = await scorecardPage.areTilesVisibleSideBySide();
      expect(areSideBySide).toBe(true);
    });

    await test.step('Verify no content overflow or layout breaking', async () => {
      const hasHorizontalScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(hasHorizontalScroll).toBe(false);
    });

    await test.step('Verify all tile content is readable', async () => {
      const pricingText = await scorecardPage.getPricingText();
      const benefitsText = await scorecardPage.getBenefitsText();
      expect(pricingText).toContain(TD.SCORECARD_PLUS_PRICING);
      expect(benefitsText).toMatch(TD.BENEFITS_VALUE_PATTERN);
    });
  });
});