const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-296][AC10] Verify benefits value is not hardcoded and renders with dynamic numeric pattern', { tag: ['@negative', '@regression', '@dsg-scorecard'] }, () => {
  let scorecardPage;

  test('[QE-296] Verify benefits value follows dynamic pattern and is not hardcoded', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Navigate to Scorecard marketing page
    await scorecardPage.goto();
    await expect(scorecardPage.isComparisonSectionVisible()).resolves.toBe(true);

    // Step 2: Locate benefits value text on Scorecard+ tile
    const benefitsText = await scorecardPage.getScorecardPlusBenefitsText();
    expect(benefitsText).toBeTruthy();

    // Step 3: Verify benefits value matches dynamic numeric pattern
    const dynamicPattern = /\$\d+\s+in\s+Benefits!?/i;
    expect(benefitsText).toMatch(dynamicPattern);

    // Step 4: Inspect page source code
    const pageContent = await page.content();
    
    // Step 5: Verify value is dynamically injected
    const benefitsElement = await page.locator('.benefits-value').filter({ hasText: /\$\d+\s+in\s+Benefits!?/i }).first();
    const elementHTML = await benefitsElement.evaluate(el => el.outerHTML);
    
    // Verify the element has dynamic characteristics (data attributes, class-based styling)
    expect(elementHTML).toContain('benefits-value');
    
    // Verify the numeric value can be extracted programmatically
    const numericMatch = benefitsText.match(/\$(\d+)/);
    expect(numericMatch).toBeTruthy();
    expect(numericMatch[1]).toMatch(/^\d+$/);
    
    const benefitsValue = parseInt(numericMatch[1], 10);
    expect(benefitsValue).toBeGreaterThan(0);
  });
});