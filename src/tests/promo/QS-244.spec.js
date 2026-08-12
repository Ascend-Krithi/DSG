const { test, expect } = require('@playwright/test');
const PromoPage = require('../../pages/promo.page');
const TD = require('../../data/test-data');

test.describe('[QS-244] Verify promo expiration date is hidden when promoExpirationDateEnabled is false', { tag: ['@non-functional', '@promo'] }, () => {
  let promoPage;

  test('[QS-244][TC-001] Verify expiration date is hidden on promo tile and drawer', async ({ page }) => {
    promoPage = new PromoPage(page);

    // Step 1: Log in to the Athlete Account
    await promoPage.goto();
    await promoPage.login(TD.credentials.validEmail, TD.credentials.validPassword);

    // Step 2: Navigate to the page/section where promo tiles are displayed
    await promoPage.navigateToPromoSection();

    // Step 3: Verify promo tile is visible
    const isPromoTileVisible = await promoPage.isPromoTileVisible();
    expect(isPromoTileVisible).toBe(true);

    // Step 4: Verify expiration date is NOT visible on promo tile
    const isExpirationDateVisible = await promoPage.isPromoExpirationDateVisible();
    expect(isExpirationDateVisible).toBe(false);

    // Step 5: Click on promo tile to open drawer
    await promoPage.clickPromoTile();

    // Step 6: Verify promo drawer is visible
    const isPromoDrawerVisible = await promoPage.isPromoDrawerVisible();
    expect(isPromoDrawerVisible).toBe(true);

    // Step 7: Verify expiration date is NOT visible on promo drawer
    const isDrawerExpirationDateVisible = await promoPage.isPromoDrawerExpirationDateVisible();
    expect(isDrawerExpirationDateVisible).toBe(false);

    // Step 8: Verify other promo details are displayed
    const promoTitle = await promoPage.getPromoTitle();
    expect(promoTitle).toBeTruthy();

    const promoDescription = await promoPage.getPromoDescription();
    expect(promoDescription).toBeTruthy();

    const isPromoCTAVisible = await promoPage.isPromoCTAVisible();
    expect(isPromoCTAVisible).toBe(true);
  });
});