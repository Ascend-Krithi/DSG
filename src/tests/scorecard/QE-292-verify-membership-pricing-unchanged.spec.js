const { test, expect } = require('@playwright/test');
const ScorecardPage = require('../../pages/ScorecardPage');

test.describe('[QE-1][AC7] Verify membership pricing remains unchanged across guest and authenticated states', () => {
  let scorecardPage;
  let guestPricingText;

  test.beforeEach(async ({ page }) => {
    scorecardPage = new ScorecardPage(page);
  });

  test('QE-292: Verify membership pricing text remains unchanged across guest and authenticated states', async ({ page }) => {
    // Step 1: Navigate to Scorecard marketing page as guest user
    await scorecardPage.navigate();
    await expect(page).toHaveURL(/.*ScoreCard.*/);
    console.log('Scorecard marketing page loaded in guest state');

    // Step 2: Capture membership pricing text in guest state
    const guestPricingElement = await scorecardPage.getScorecardPlusPrice();
    await expect(guestPricingElement).toBeVisible();
    guestPricingText = await guestPricingElement.textContent();
    expect(guestPricingText).toMatch(/\$99 Annual Membership/i);
    console.log('Pricing text captured in guest state:', guestPricingText);

    // Step 3: Authenticate user with valid credentials
    await scorecardPage.authenticateUser('testuser@dickssportinggoods.com', 'ValidPass123!');
    console.log('User successfully authenticated');

    // Step 4: Navigate to Scorecard marketing page as authenticated user
    await scorecardPage.navigate();
    await expect(page).toHaveURL(/.*ScoreCard.*/);
    console.log('Scorecard marketing page loaded in authenticated state');

    // Step 5: Verify membership pricing text remains unchanged in authenticated state
    const authPricingElement = await scorecardPage.getScorecardPlusPrice();
    await expect(authPricingElement).toBeVisible();
    const authPricingText = await authPricingElement.textContent();
    expect(authPricingText).toMatch(/\$99 Annual Membership/i);
    expect(authPricingText).toBe(guestPricingText);
    console.log('Pricing text still displays $99 Annual Membership and is identical to guest state');
  });
});