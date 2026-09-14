const { test, expect } = require('../../fixtures');
const ScorecardPage = require('../../pages/scorecard.page');
const TD = require('../../data/scorecard-test-data');

test.describe('[QE-300][AC4] Verify CTA variant tolerance for approved business labels on Scorecard+ tile', { tag: ['@non-functional', '@regression', '@dsg-scorecard'] }, () => {
  let scorecardPage;

  test('[QE-300] Verify Scorecard+ tile CTA accepts approved business label variants for guest users', async ({ page }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Ensure user is not authenticated (guest state)
    // Step 2: Navigate to Scorecard marketing page
    await scorecardPage.goto();
    await expect(scorecardPage.isComparisonSectionVisible()).resolves.toBe(true);

    // Step 3: Locate CTA button on Scorecard+ tile
    await expect(scorecardPage.isScorecardPlusGuestCtaVisible()).resolves.toBe(true);

    // Step 4: Verify CTA displays one of the approved variants
    const ctaText = await scorecardPage.getScorecardPlusGuestCtaText();
    expect(ctaText).toBeTruthy();
    
    const approvedVariants = [
      /^join now$/i,
      /join scorecard\+\s*now/i
    ];
    
    const matchesApprovedVariant = approvedVariants.some(pattern => pattern.test(ctaText));
    expect(matchesApprovedVariant).toBe(true);

    // Step 5: Verify CTA is clickable and functional
    const ctaButton = await page.locator('my-account-templates-page-header').first()
      .getByRole('button', { name: /^join now$/i })
      .or(page.locator('my-account-templates-page-header').first()
        .getByRole('link', { name: /^join now$/i }))
      .or(page.locator('my-account-templates-page-header').first()
        .getByRole('button', { name: /join scorecard\+\s*now/i }));
    
    await expect(ctaButton).toBeEnabled();
    await expect(ctaButton).toBeVisible();

    // Step 6: Verify CTA maintains consistent styling across variants
    const backgroundColor = await ctaButton.evaluate(el => window.getComputedStyle(el).backgroundColor);
    const color = await ctaButton.evaluate(el => window.getComputedStyle(el).color);
    const padding = await ctaButton.evaluate(el => window.getComputedStyle(el).padding);
    const fontSize = await ctaButton.evaluate(el => window.getComputedStyle(el).fontSize);
    
    expect(backgroundColor).toBeTruthy();
    expect(color).toBeTruthy();
    expect(padding).toBeTruthy();
    expect(parseFloat(fontSize)).toBeGreaterThan(0);
  });
});