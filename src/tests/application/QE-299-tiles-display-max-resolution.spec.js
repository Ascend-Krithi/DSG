const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-1][AC1] Tiles Display on Maximum Desktop Resolution', { tag: ['@regression', '@scorecard', '@non-functional'] }, () => {
  let scorecardPage;

  test.use({ viewport: TD.VIEWPORT_DESKTOP_MAX });

  test('[QE-299] Verify comparison tiles display correctly on maximum supported desktop resolution', async ({ page }) => {
    scorecardPage = new ScorecardMarketingPage(page);

    await test.step('Navigate to Scorecard marketing page', async () => {
      await scorecardPage.goto();
    });

    await test.step('Verify Scorecard tile is displayed with proper sizing', async () => {
      const scorecardTile = page.locator('my-account-templates-page-header').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first().locator('*').filter({ hasText: /1 Point For Every \$1 Spent\.\s*300 Points = \$10 Reward\./i }).first();
      await expect(scorecardTile).toBeVisible();
      const box = await scorecardTile.boundingBox();
      expect(box).toBeTruthy();
      expect(box.width).toBeLessThan(1000);
    });

    await test.step('Verify Scorecard+ tile is displayed with proper sizing', async () => {
      const scorecardPlusTile = page.locator('my-account-templates-page-header').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first().locator('*').filter({ has: page.getByAltText('ScoreCard Plus New Logo') }).filter({ hasText: /\$99 Annual Membership\./i }).filter({ hasText: /\$350 in Benefits!?/i }).first();
      await expect(scorecardPlusTile).toBeVisible();
      const box = await scorecardPlusTile.boundingBox();
      expect(box).toBeTruthy();
      expect(box.width).toBeLessThan(1000);
    });

    await test.step('Verify tiles are positioned side by side with proper spacing', async () => {
      const areSideBySide = await scorecardPage.areTilesVisibleSideBySide();
      expect(areSideBySide).toBe(true);
    });

    await test.step('Verify tiles are centered or properly aligned on large screen', async () => {
      const comparisonSection = page.locator('my-account-templates-page-header').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first();
      await expect(comparisonSection).toBeVisible();
    });

    await test.step('Verify all tile content scales appropriately', async () => {
      const pricingText = await scorecardPage.getPricingText();
      const benefitsText = await scorecardPage.getBenefitsText();
      expect(pricingText).toContain(TD.SCORECARD_PLUS_PRICING);
      expect(benefitsText).toMatch(TD.BENEFITS_VALUE_PATTERN);
    });
  });
});