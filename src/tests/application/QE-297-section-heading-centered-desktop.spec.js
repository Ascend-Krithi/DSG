const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-1][AC9] Section Heading Centered on Desktop', { tag: ['@regression', '@scorecard', '@non-functional'] }, () => {
  let scorecardPage;

  test.use({ viewport: TD.VIEWPORT_DESKTOP_STANDARD });

  test('[QE-297] Verify section heading is centered and fully readable on desktop', async ({ page }) => {
    scorecardPage = new ScorecardMarketingPage(page);

    await test.step('Navigate to Scorecard marketing page', async () => {
      await scorecardPage.goto();
    });

    await test.step('Locate section heading element', async () => {
      const headingText = await scorecardPage.getSectionHeadingText();
      expect(headingText).toContain(TD.SECTION_HEADING);
    });

    await test.step('Verify heading is horizontally centered', async () => {
      const isCentered = await scorecardPage.isSectionHeadingCentered();
      expect(isCentered).toBe(true);
    });

    await test.step('Verify heading text is fully visible', async () => {
      const headingText = await scorecardPage.getSectionHeadingText();
      expect(headingText).toBe(TD.SECTION_HEADING);
    });

    await test.step('Verify heading has proper spacing', async () => {
      const headingLocator = page.locator('my-account-templates-page-header').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first().getByRole('heading', { name: 'Score the Right Membership for You', level: 2 });
      const box = await headingLocator.boundingBox();
      expect(box).toBeTruthy();
      expect(box.y).toBeGreaterThan(0);
    });

    await test.step('Verify heading font is readable', async () => {
      const headingLocator = page.locator('my-account-templates-page-header').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first().getByRole('heading', { name: 'Score the Right Membership for You', level: 2 });
      await expect(headingLocator).toBeVisible();
    });
  });
});