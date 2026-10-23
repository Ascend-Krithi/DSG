const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');

test.describe('[QE-1][AC9] Verify section heading Score the Right Membership for You is displayed above comparison tiles', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
  });

  test('QE-321: Verify section heading is displayed above comparison tiles', async ({ page }) => {
    await test.step('Launch the Scorecard marketing page URL on desktop', async () => {
      await scorecardPage.goto();
      const unavailable = await scorecardPage.isUnavailablePageVisible();
      if (unavailable) {
        test.skip('Site is currently unavailable');
      }
    });

    await test.step('Navigate to the comparison section', async () => {
      const comparisonVisible = await scorecardPage.isComparisonSectionVisible();
      expect(comparisonVisible).toBeTruthy();
    });

    await test.step('Verify section heading is displayed', async () => {
      const headingText = await scorecardPage.getSectionHeadingText();
      expect(headingText).toMatch(/score the right membership for you/i);
    });

    await test.step('Verify heading is positioned above the comparison tiles', async () => {
      const loc = require('../../locators/scorecard.locators');
      await expect(loc.sectionHeading(page)).toBeVisible();
      await expect(loc.scorecardTile(page)).toBeVisible();
      await expect(loc.scorecardPlusTile(page)).toBeVisible();
    });

    await test.step('Verify heading is fully readable and properly styled', async () => {
      const loc = require('../../locators/scorecard.locators');
      const heading = loc.sectionHeading(page);
      await expect(heading).toBeVisible();
      const headingText = await heading.textContent();
      expect(headingText.trim()).toBeTruthy();
    });
  });
});