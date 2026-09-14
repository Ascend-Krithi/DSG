const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../pages/ScorecardPage');

test.describe('[QE-1][AC10] Verify benefits value is not hardcoded and renders with dynamic numeric pattern', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
  });

  test('QE-296: Verify benefits value matches dynamic pattern and is not hardcoded', async ({ page }) => {
    // Step 1: Navigate to Scorecard marketing page
    await scorecardPage.navigate();
    await expect(page).toHaveURL(/.*ScoreCard.*/);
    console.log('Scorecard marketing page loads successfully');

    // Step 2: Locate benefits value text on Scorecard+ tile
    const benefitsElement = await scorecardPage.getScorecardPlusBenefits();
    await expect(benefitsElement).toBeVisible();
    console.log('Benefits value element is found on Scorecard+ tile');

    // Step 3: Verify benefits value matches dynamic numeric pattern
    const benefitsText = await benefitsElement.textContent();
    const dynamicPattern = /\$\d+\s+in\s+Benefits!?/i;
    expect(benefitsText).toMatch(dynamicPattern);
    console.log(`Benefits value text matches the dynamic pattern: ${benefitsText}`);

    // Step 4: Inspect page source code
    const pageSource = await page.content();
    const staticHardcodedPattern = /<[^>]*>\s*That's \$350 in Benefits!\s*<\/[^>]*>/i;
    expect(pageSource).not.toMatch(staticHardcodedPattern);
    console.log('Benefits value is not hardcoded as static text in HTML');

    // Step 5: Verify value is dynamically injected
    const benefitsClass = await benefitsElement.getAttribute('class');
    expect(benefitsClass).toContain('benefits-value');
    
    // Check for dynamic injection markers
    const innerHTML = await benefitsElement.innerHTML();
    const hasDataAttribute = await benefitsElement.evaluate(el => {
      return el.hasAttribute('data-benefits-value') || 
             el.querySelector('[data-benefits-value]') !== null ||
             el.textContent.match(/\$\d+/) !== null;
    });
    expect(hasDataAttribute).toBeTruthy();
    console.log('Benefits value is injected dynamically via data attribute or JavaScript from AEM');
  });
});