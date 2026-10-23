const locators = {
  signInHeading: (page) => page.getByRole('heading', { name: /sign in/i }),
  signInForm: (page) => page.locator('form').filter({ hasText: /sign in/i }),
  emailInput: (page) => page.getByRole('textbox', { name: /email/i }).or(page.locator('input[type="email"]')),
  passwordInput: (page) => page.getByRole('textbox', { name: /password/i }).or(page.locator('input[type="password"]')),
  signInButton: (page) => page.getByRole('button', { name: /sign in/i }),
  signOutLink: (page) => page.getByRole('link', { name: /sign out/i }).or(page.getByRole('button', { name: /sign out/i }))
};

module.exports = locators;