const loc = require('./locators/signIn.locators');

class SignInPage {
  constructor(page) {
    this.page = page;
  }

  async signIn(email, password) {
    await loc.emailInput(this.page).fill(email);
    await loc.passwordInput(this.page).fill(password);
    await loc.signInButton(this.page).click();
    await this.page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    return true;
  }

  async signOut() {
    await loc.signOutLink(this.page).click();
    await this.page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    return true;
  }

  async isSignInFormVisible() {
    return await loc.signInForm(this.page).isVisible();
  }

  async clearSession() {
    await this.page.context().clearCookies();
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    return true;
  }
}

module.exports = SignInPage;