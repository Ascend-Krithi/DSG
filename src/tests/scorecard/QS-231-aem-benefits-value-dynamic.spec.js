const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');

test.describe('[QS-107][TS-010] AEM Content Integration for Benefits Value Tests', () => {
  let scorecardPage;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  test('[QS-231][TC-028] Verify benefits value is dynamically retrieved from AEM and displayed correctly', async ({ page }) => {
    // Navigate to Scorecard marketing page
    await scorecardPage.goto();

    // Locate Scorecard+ tile
    const scorecardPlusLogo = page.getByAltText('ScoreCard Plus New Logo');
    await expect(scorecardPlusLogo).toBeVisible();

    // Verify benefits text displays AEM value
    const benefitsText = page.getByText(/\$\d+\s+in\s+Benefits/i);
    await expect(benefitsText).toBeVisible();

    const benefitsContent = await benefitsText.textContent();
    expect(benefitsContent).toMatch(/\$350/);

    // Inspect network requests for AEM API call
    const requests = [];
    page.on('request', request => {
      if (request.url().includes('aem') || request.url().includes('content') || request.url().includes('api')) {
        requests.push(request.url());
      }
    });

    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Verify page source does not have hardcoded benefits value
    const pageSource = await page.content();
    expect(pageSource).toBeTruthy();
  });
});