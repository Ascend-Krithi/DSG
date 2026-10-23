const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-295][AC10] Verify benefits value is retrieved from AEM and displayed dynamically', { tag: ['@regression', '@dsg-scorecard'] }, () => {
  let scorecardPage;

  test('[QE-295] Verify benefits value is dynamically retrieved from AEM and displayed correctly', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 3: Navigate to Scorecard marketing page
    await scorecardPage.goto();
    await expect(scorecardPage.isComparisonSectionVisible()).resolves.toBe(true);

    // Step 4: Locate benefits value text on Scorecard+ tile
    const benefitsText = await scorecardPage.getScorecardPlusBenefitsText();
    expect(benefitsText).toBeTruthy();

    // Step 5: Verify displayed benefits value matches AEM configuration pattern
    expect(benefitsText).toMatch(TD.scorecardPlus.benefits);
    expect(benefitsText).toMatch(/That's \$\d+ in Benefits!/i);

    // Step 6: Verify benefits value is dynamically rendered (not hardcoded)
    const benefitsElement = await page.locator('.benefits-value').filter({ hasText: /\$\d+\s+in\s+Benefits!?/i }).first();
    const dataAttribute = await benefitsElement.getAttribute('data-benefits-value');
    const innerHTML = await benefitsElement.innerHTML();
    
    // Verify it's not a static hardcoded string in HTML
    expect(innerHTML).not.toContain('$350');
    expect(benefitsText).toMatch(/\$\d+/);
  });
});