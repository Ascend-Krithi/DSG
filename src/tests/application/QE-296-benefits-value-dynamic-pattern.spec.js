const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-1][AC10] Benefits Value Dynamic Pattern Validation', { tag: ['@regression', '@scorecard', '@negative'] }, () => {
  let scorecardPage;

  test('[QE-296] Verify benefits value is not hardcoded and renders with dynamic numeric pattern', async ({ page }) => {
    scorecardPage = new ScorecardMarketingPage(page);

    await test.step('Navigate to Scorecard marketing page', async () => {
      await scorecardPage.goto();
    });

    await test.step('Locate benefits value text on Scorecard+ tile', async () => {
      const benefitsText = await scorecardPage.getBenefitsText();
      expect(benefitsText).toBeTruthy();
    });

    await test.step('Verify benefits value matches dynamic numeric pattern', async () => {
      const benefitsText = await scorecardPage.getBenefitsText();
      expect(benefitsText).toMatch(TD.BENEFITS_VALUE_PATTERN);
    });

    await test.step('Inspect page source code', async () => {
      const pageContent = await page.content();
      const hardcodedPattern = /That's \$350 in Benefits!/;
      const hasHardcodedValue = hardcodedPattern.test(pageContent);
      expect(hasHardcodedValue).toBe(false);
    });

    await test.step('Verify value is dynamically injected', async () => {
      const benefitsElement = page.locator('.benefits-value').filter({ hasText: TD.BENEFITS_VALUE_PATTERN }).first();
      const dataAttribute = await benefitsElement.getAttribute('data-value');
      const innerText = await benefitsElement.textContent();
      expect(innerText).toMatch(/\$\d+/);
    });
  });
});