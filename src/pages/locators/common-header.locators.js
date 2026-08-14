const locators = {
  // Header navigation elements
  hamburgerMenu: (page) => page.locator('button[aria-label="Open Navigation Menu"]').first(),
  logo: (page) => page.locator('a img[alt="logo"]').first(),
  searchBar: (page) => page.locator('input[role="searchbox"]').first(),
  myAccountButton: (page) => page.locator('button:has-text("My Account")').first(),
  cartIcon: (page) => page.locator('a:has-text("Cart")').first(),
  signInToEarnPointsBanner: (page) => page.locator('button:has-text("Sign In to Earn Points")').first(),
};

module.exports = locators;