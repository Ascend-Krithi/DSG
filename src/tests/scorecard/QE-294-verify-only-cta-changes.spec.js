const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../pages/ScorecardPage');

test.describe('[QE-1][AC7] Verify only CTA changes based on authentication status while all other content remains static', () => {
  let scorecardPage;
  let guestContent;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
  });

  test('QE-294: Verify only CTA changes while all other content remains static', async ({ page }) => {
    // Step 1: Navigate to Scorecard marketing page as guest user
    await scorecardPage.navigate();
    await expect(page).toHaveURL(/.*ScoreCard.*/);
    console.log('Scorecard marketing page loaded in guest state');

    // Step 2: Capture all content elements in guest state
    const guestScorecardLogo = await scorecardPage.getScorecardLogo();
    const guestScorecardPlusLogo = await scorecardPage.getScorecardPlusLogo();
    const guestPricing = await scorecardPage.getScorecardPlusPrice();
    const guestBenefits = await scorecardPage.getScorecardPlusBenefits();
    const guestPointsText = await scorecardPage.getScorecardPointsText();
    
    guestContent = {
      scorecardLogoSrc: await guestScorecardLogo.getAttribute('src'),
      scorecardPlusLogoSrc: await guestScorecardPlusLogo.getAttribute('src'),
      pricingText: await guestPricing.textContent(),
      benefitsText: await guestBenefits.textContent(),
      pointsText: await guestPointsText.textContent()
    };
    console.log('All content elements captured for comparison');

    // Step 3: Verify guest CTAs are displayed
    const guestScorecardCta = await scorecardPage.getScorecardGuestCta();
    const guestScorecardPlusCta = await scorecardPage.getScorecardPlusGuestCta();
    await expect(guestScorecardCta).toBeVisible();
    await expect(guestScorecardPlusCta).toBeVisible();
    const guestScorecardCtaText = await guestScorecardCta.textContent();
    const guestScorecardPlusCtaText = await guestScorecardPlusCta.textContent();
    expect(guestScorecardCtaText).toMatch(/Sign In.*Join Now/i);
    expect(guestScorecardPlusCtaText).toMatch(/Join Now/i);
    console.log('Guest CTAs are displayed on both tiles');

    // Step 4: Authenticate user with valid credentials
    await scorecardPage.authenticateUser('testuser@dickssportinggoods.com', 'ValidPass123!');
    console.log('User successfully authenticated');

    // Step 5: Navigate to Scorecard marketing page as authenticated user
    await scorecardPage.navigate();
    await expect(page).toHaveURL(/.*ScoreCard.*/);
    console.log('Scorecard marketing page loaded in authenticated state');

    // Step 6: Verify CTAs have changed to authenticated state
    const authScorecardCta = await scorecardPage.getViewAccountScorecardTile();
    const authScorecardPlusCta = await scorecardPage.getViewAccountScorecardPlusTile();
    await expect(authScorecardCta).toBeVisible();
    await expect(authScorecardPlusCta).toBeVisible();
    const authScorecardCtaText = await authScorecardCta.textContent();
    const authScorecardPlusCtaText = await authScorecardPlusCta.textContent();
    expect(authScorecardCtaText).toMatch(/View Account/i);
    expect(authScorecardPlusCtaText).toMatch(/View Account/i);
    console.log('CTAs now display View Account on both tiles');

    // Step 7: Verify all other content remains unchanged
    const authScorecardLogo = await scorecardPage.getScorecardLogo();
    const authScorecardPlusLogo = await scorecardPage.getScorecardPlusLogo();
    const authPricing = await scorecardPage.getScorecardPlusPrice();
    const authBenefits = await scorecardPage.getScorecardPlusBenefits();
    const authPointsText = await scorecardPage.getScorecardPointsText();
    
    expect(await authScorecardLogo.getAttribute('src')).toBe(guestContent.scorecardLogoSrc);
    expect(await authScorecardPlusLogo.getAttribute('src')).toBe(guestContent.scorecardPlusLogoSrc);
    expect(await authPricing.textContent()).toBe(guestContent.pricingText);
    expect(await authBenefits.textContent()).toBe(guestContent.benefitsText);
    expect(await authPointsText.textContent()).toBe(guestContent.pointsText);
    console.log('All non-CTA content is identical to guest state');
  });
});