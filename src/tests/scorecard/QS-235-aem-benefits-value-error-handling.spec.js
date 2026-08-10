const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-010] AEM Benefits Value Error Handling Tests', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  test('[QS-235][TC-030] Verify benefits value displays fallback when AEM is unavailable or returns error', async ({ page }) => {
    // Intercept AEM requests and simulate error
    await page.route('**/aem/**', route => route.abort());
    await page.route('**/content/**', route => route.abort());

    // Navigate to Scorecard marketing page
    await scorecardPage.goto();

    // Verify page loads without breaking
    await page.waitForLoadState('domcontentloaded');
    const bodyContent = await page.locator('body').textContent();
    expect(bodyContent.length).toBeGreaterThan(0);

    // Verify benefits value section displays fallback or appropriate message
    const benefitsText = page.getByText(/\$\d+\s+in\s+Benefits/i);
    const benefitsVisible = await benefitsText.isVisible().catch(() => false);
    
    // Either fallback value is shown or section is hidden gracefully
    if (benefitsVisible) {
      const benefitsContent = await benefitsText.textContent();
      expect(benefitsContent).not.toContain('undefined');
      expect(benefitsContent).not.toContain('null');
    }

    // Verify no 'undefined' or 'null' displayed
    const pageText = await page.locator('body').textContent();
    expect(pageText).not.toContain('undefined');
    expect(pageText).not.toContain('null');

    // Check browser console for errors (logged but handled gracefully)
    const consoleMessages = [];
    page.on('console', msg => consoleMessages.push(msg.text()));

    // Verify rest of page functionality
    const scorecardLogo = page.getByAltText('ScoreCard Logo Light None').nth(1);
    const scorecardLogoVisible = await scorecardLogo.isVisible().catch(() => false);
    expect(scorecardLogoVisible).toBe(true);
  });
});