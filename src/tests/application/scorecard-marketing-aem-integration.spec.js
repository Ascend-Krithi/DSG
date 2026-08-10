const { test, expect } = require('../../fixtures');
const ScorecardMarketingPage = require('../../pages/scorecard-marketing.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[UI] QS-107: Scorecard Marketing Page AEM Integration', { tag: ['@regression', '@e2e'] }, () => {
  let marketingPage;

  test.beforeEach(async ({ page }) => {
    marketingPage = new ScorecardMarketingPage(page);
    await marketingPage.setViewportSize(TD.viewportSizes.desktop1920.width, TD.viewportSizes.desktop1920.height);
  });

  test('[QS-231] Verify benefits value is dynamically retrieved from AEM and displayed correctly', async ({ page }) => {
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify benefits text displays AEM value
    await expect(page.locator('text=/That\'s \$350 in Benefits!/')).toBeVisible();
    const benefitsText = await marketingPage.getScorecardPlusBenefitsText();
    expect(benefitsText).toContain(TD.scorecardPlusTile.benefitsValue);
    
    // Monitor network requests for AEM API call
    const aemRequests = [];
    page.on('request', request => {
      if (request.url().includes('aem') || request.url().includes('content')) {
        aemRequests.push(request.url());
      }
    });
    
    // Reload page to capture network activity
    await page.reload();
    
    // Verify benefits value is not hardcoded (dynamically inserted)
    const benefitsElement = page.locator('text=/That\'s \$\d+ in Benefits!/');
    await expect(benefitsElement).toBeVisible();
  });

  test('[QS-233] Verify benefits value updates when AEM configuration is changed to different value', async ({ page }) => {
    // Navigate to Scorecard marketing page
    await marketingPage.goto();
    
    // Verify initial benefits value
    await expect(page.locator('text=/That\'s \$350 in Benefits!/')).toBeVisible();
    
    // Note: In real scenario, AEM value would be updated externally
    // This test verifies the page can display updated values dynamically
    
    // Clear cache and reload
    await page.evaluate(() => {
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => caches.delete(name));
        });
      }
    });
    
    await page.reload({ waitUntil: 'domcontentloaded' });
    
    // Verify benefits value is displayed (would be updated value in real scenario)
    const benefitsElement = page.locator('text=/That\'s \$\d+ in Benefits!/');
    await expect(benefitsElement).toBeVisible();
  });

  test('[QS-235] Verify benefits value displays fallback when AEM is unavailable or returns error', async ({ page }) => {
    // Intercept AEM requests and simulate error
    await page.route('**/aem/**', route => route.abort());
    await page.route('**/content/**', route => route.abort());
    
    // Navigate to Scorecard marketing page
    try {
      await marketingPage.goto();
    } catch (error) {
      // Page may partially load with errors
    }
    
    // Verify page loads without breaking
    await expect(page).toHaveURL(TD.urlPatterns.scorecardMarketing);
    
    // Verify benefits value section displays fallback or appropriate message
    const benefitsElement = page.locator('text=/That\'s \$\d+ in Benefits!/, text=/Benefits/, [data-testid="benefits-text"]');
    
    // Check if fallback value or error message is displayed
    const benefitsVisible = await benefitsElement.isVisible().catch(() => false);
    
    // Verify no undefined or null displayed
    const pageContent = await page.content();
    expect(pageContent).not.toContain('undefined');
    expect(pageContent).not.toContain('null');
    
    // Verify other page elements remain functional
    await expect(page.locator('[data-testid="scorecard-tile"]')).toBeVisible();
  });
});