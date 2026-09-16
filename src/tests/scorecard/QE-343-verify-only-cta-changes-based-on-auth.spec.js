const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../page-objects/ScorecardPage');
const loc = require('../../locators/scorecard.locators');

test.describe('[QE-343][AC7] Verify only CTA changes based on authentication status while other content remains static', {
  tag: ['@functional', '@regression', '@scorecard']
}, () => {
  let scorecardPage;
  let guestContent = {};
  let authenticatedContent = {};

  test('[QE-343] Validate CTA changes while all other content remains static', async ({ page, context }) => {
    scorecardPage = new ScorecardPage(page);

    // Step 1: Ensure user is in guest state
    await context.clearCookies();
    await page.goto('about:blank');
    console.log('User session cleared - guest state confirmed');

    // Step 2: Navigate to Scorecard Marketing Page
    await scorecardPage.goto();
    await expect(page).toHaveURL(/\/scorecard/i, { timeout: 60000 });
    await expect(loc.sectionHeading(page)).toBeVisible({ timeout: 30000 });
    console.log('Scorecard Marketing Page loaded successfully');

    // Step 3: Verify guest CTA 'Sign In / Join Now' is displayed
    await expect(loc.comparisonSection(page)).toBeVisible({ timeout: 30000 });
    const guestCtaVisible = await loc.scorecardGuestCta(page).isVisible();
    expect(guestCtaVisible).toBe(true);
    console.log('Guest CTA "Sign In / Join Now" is visible on comparison tiles');

    // Step 4: Document all other content elements (logos, pricing, benefits, messaging)
    guestContent.scorecardLogo = await loc.scorecardLogoSummary(page).getAttribute('alt');
    guestContent.scorecardPoints = await loc.scorecardPoints(page).textContent();
    guestContent.scorecardRewards = await loc.scorecardRewards(page).textContent();
    guestContent.scorecardPlusLogo = await loc.scorecardPlusLogoSummary(page).getAttribute('alt');
    guestContent.scorecardPlusPrice = await loc.scorecardPlusPrice(page).textContent();
    guestContent.scorecardPlusBenefits = await loc.scorecardPlusBenefits(page).textContent();
    guestContent.sectionHeading = await loc.sectionHeading(page).textContent();
    console.log('All static content is visible and documented');

    // Step 5: Sign in with valid credentials
    await scorecardPage.signInUser('testuser@example.com', 'ValidPass123!');
    console.log('User authenticated successfully');

    // Step 6: Navigate to Scorecard Marketing Page
    await scorecardPage.goto();
    await expect(page).toHaveURL(/\/scorecard/i, { timeout: 60000 });
    await expect(loc.sectionHeading(page)).toBeVisible({ timeout: 30000 });
    console.log('Scorecard Marketing Page loaded successfully');

    // Step 7: Verify CTA has changed to 'View Account'
    await expect(loc.comparisonSection(page)).toBeVisible({ timeout: 30000 });
    const authCtaVisible = await loc.viewAccountScorecardTile(page).isVisible();
    expect(authCtaVisible).toBe(true);
    
    const guestCtaHidden = await loc.scorecardGuestCta(page).isVisible().catch(() => false);
    expect(guestCtaHidden).toBe(false);
    console.log('Authenticated CTA "View Account" is now displayed instead of guest CTA');

    // Step 8: Verify all other content elements remain unchanged
    authenticatedContent.scorecardLogo = await loc.scorecardLogoSummary(page).getAttribute('alt');
    authenticatedContent.scorecardPoints = await loc.scorecardPoints(page).textContent();
    authenticatedContent.scorecardRewards = await loc.scorecardRewards(page).textContent();
    authenticatedContent.scorecardPlusLogo = await loc.scorecardPlusLogoSummary(page).getAttribute('alt');
    authenticatedContent.scorecardPlusPrice = await loc.scorecardPlusPrice(page).textContent();
    authenticatedContent.scorecardPlusBenefits = await loc.scorecardPlusBenefits(page).textContent();
    authenticatedContent.sectionHeading = await loc.sectionHeading(page).textContent();
    
    expect(authenticatedContent.scorecardLogo).toBe(guestContent.scorecardLogo);
    expect(authenticatedContent.scorecardPoints).toBe(guestContent.scorecardPoints);
    expect(authenticatedContent.scorecardRewards).toBe(guestContent.scorecardRewards);
    expect(authenticatedContent.scorecardPlusLogo).toBe(guestContent.scorecardPlusLogo);
    expect(authenticatedContent.scorecardPlusPrice).toBe(guestContent.scorecardPlusPrice);
    expect(authenticatedContent.scorecardPlusBenefits).toBe(guestContent.scorecardPlusBenefits);
    expect(authenticatedContent.sectionHeading).toBe(guestContent.sectionHeading);
    console.log('All static content is identical to guest state, only CTA has changed');
  });
});