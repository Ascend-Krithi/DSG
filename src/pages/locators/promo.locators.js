const locators = {
  promoTile: (page) => page.locator('[data-testid="promo-tile"]').first(),
  promoExpirationDate: (page) => page.locator('[data-testid="promo-expiration-date"]').first(),
  promoDrawer: (page) => page.locator('[data-testid="promo-drawer"]').first(),
  promoDrawerExpirationDate: (page) => page.locator('[data-testid="promo-drawer-expiration-date"]').first(),
  promoTitle: (page) => page.locator('[data-testid="promo-title"]').first(),
  promoDescription: (page) => page.locator('[data-testid="promo-description"]').first(),
  promoCTA: (page) => page.locator('[data-testid="promo-cta"]').first(),
  myAccountButton: (page) => page.locator('button:has-text("My Account")').first(),
  signInButton: (page) => page.locator('button:has-text("CONTINUE")').first(),
  emailInput: (page) => page.locator('input[type="email"]').first(),
  passwordInput: (page) => page.locator('input[type="password"]').first()
};

module.exports = locators;