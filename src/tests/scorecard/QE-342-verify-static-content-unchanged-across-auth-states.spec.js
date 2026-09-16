const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');
const loc = require('../../locators/scorecard.locators');

test.describe('[QE-342][AC7] Verify static marketing content remains unchanged regardless of authentication state', {
  tag: ['@functional', '@regression', '@scorecard']
}, () => {
  let scorecardPage;
  let guestStaticContent = {};
  let authenticatedStaticContent = {};

  test('[QE-342] Validate static content stability across authentication states', async ({ page, context }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Ensure user is in guest state
    await context.clearCookies();
    await page.goto('about:blank');
    console.log('User session cleared - guest state confirmed');

    // Step 2: Navigate to Scorecard Marketing Page
    await scorecardPage.goto();
    await expect(page).toHaveURL(/\/scorecard/i, { timeout: 60000 });
    await expect(loc.sectionHeading(page)).toBeVisible({ timeout: 30000 });
    console.log('Scorecard Marketing Page loaded successfully in guest state');

    // Step 3: Capture static content on Scorecard tile (logo, messaging)
    await expect(loc.scorecardTile(page)).toBeVisible({ timeout: 30000 });
    await expect(loc.scorecardLogoSummary(page)).toBeVisible();
    guestStaticContent.scorecardLogo = await loc.scorecardLogoSummary(page).getAttribute('alt');
    guestStaticContent.scorecardPoints = await loc.scorecardPoints(page).textContent();
    guestStaticContent.scorecardRewards = await loc.scorecardRewards(page).textContent();
    console.log('Guest state - Scorecard tile static content captured');

    // Step 4: Capture static content on Scorecard+ tile (Dark Logo, pricing, benefits)
    await expect(loc.scorecardPlusTile(page)).toBeVisible({ timeout: 30000 });
    await expect(loc.scorecardPlusLogoSummary(page)).toBeVisible();
    guestStaticContent.scorecardPlusLogo = await loc.scorecardPlusLogoSummary(page).getAttribute('alt');
    guestStaticContent.scorecardPlusPrice = await loc.scorecardPlusPrice(page).textContent();
    guestStaticContent.scorecardPlusBenefits = await loc.scorecardPlusBenefits(page).textContent();
    console.log('Guest state - Scorecard+ tile static content captured');

    // Step 5: Sign in with valid credentials
    await scorecardPage.signInUser('testuser@example.com', 'ValidPass123!');
    console.log('User authenticated successfully');

    // Step 6: Navigate to Scorecard Marketing Page
    await scorecardPage.goto();
    await expect(page).toHaveURL(/\/scorecard/i, { timeout: 60000 });
    await expect(loc.sectionHeading(page)).toBeVisible({ timeout: 30000 });
    console.log('Scorecard Marketing Page loaded successfully in authenticated state');

    // Step 7: Compare Scorecard tile static content with guest state
    await expect(loc.scorecardTile(page)).toBeVisible({ timeout: 30000 });
    authenticatedStaticContent.scorecardLogo = await loc.scorecardLogoSummary(page).getAttribute('alt');
    authenticatedStaticContent.scorecardPoints = await loc.scorecardPoints(page).textContent();
    authenticatedStaticContent.scorecardRewards = await loc.scorecardRewards(page).textContent();
    
    expect(authenticatedStaticContent.scorecardLogo).toBe(guestStaticContent.scorecardLogo);
    expect(authenticatedStaticContent.scorecardPoints).toBe(guestStaticContent.scorecardPoints);
    expect(authenticatedStaticContent.scorecardRewards).toBe(guestStaticContent.scorecardRewards);
    console.log('Scorecard tile static content is identical to guest state');

    // Step 8: Compare Scorecard+ tile static content with guest state
    authenticatedStaticContent.scorecardPlusLogo = await loc.scorecardPlusLogoSummary(page).getAttribute('alt');
    authenticatedStaticContent.scorecardPlusPrice = await loc.scorecardPlusPrice(page).textContent();
    authenticatedStaticContent.scorecardPlusBenefits = await loc.scorecardPlusBenefits(page).textContent();
    
    expect(authenticatedStaticContent.scorecardPlusLogo).toBe(guestStaticContent.scorecardPlusLogo);
    expect(authenticatedStaticContent.scorecardPlusPrice).toBe(guestStaticContent.scorecardPlusPrice);
    expect(authenticatedStaticContent.scorecardPlusBenefits).toBe(guestStaticContent.scorecardPlusBenefits);
    console.log('Scorecard+ tile static content is identical to guest state');

    // Step 9: Verify only CTAs differ between authentication states
    const guestCtaVisible = await loc.scorecardGuestCta(page).isVisible().catch(() => false);
    const authCtaVisible = await loc.viewAccountScorecardTile(page).isVisible().catch(() => false);
    
    expect(guestCtaVisible).toBe(false);
    expect(authCtaVisible).toBe(true);
    console.log('CTAs change based on authentication state while all other content remains static');
  });
});