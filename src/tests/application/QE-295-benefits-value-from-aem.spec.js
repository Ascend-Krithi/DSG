const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-1][AC10] Benefits Value Retrieved from AEM', { tag: ['@regression', '@scorecard'] }, () => {
  let scorecardPage;

  test('[QE-295] Verify benefits value is retrieved from AEM and displayed dynamically', async ({ page }) => {
    scorecardPage = new ScorecardMarketingPage(page);

    await test.step('Navigate to Scorecard marketing page', async () => {
      await scorecardPage.goto();
    });

    await test.step('Locate benefits value text on Scorecard+ tile', async () => {
      const benefitsText = await scorecardPage.getBenefitsText();
      expect(benefitsText).toBeTruthy();
    });

    await test.step('Verify displayed benefits value matches AEM configuration', async () => {
      const benefitsText = await scorecardPage.getBenefitsText();
      expect(benefitsText).toMatch(TD.BENEFITS_VALUE_PATTERN);
    });

    await test.step('Verify benefits value is dynamically rendered', async () => {
      const benefitsText = await scorecardPage.getBenefitsText();
      const numericValue = benefitsText.match(/\$(\d+)/)?.[1];
      expect(numericValue).toBeTruthy();
      expect(parseInt(numericValue)).toBeGreaterThan(0);
    });
  });
});