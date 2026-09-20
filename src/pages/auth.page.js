const loc = require('../locators/scorecard.locators');
const TD = require('../data/scorecard-test-data');

class AuthPage {
  constructor(page) {
    this.page = page;
  }

  async signIn(username, password) {
    await this.page.goto(TD.urls.signIn, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
    await this.page.fill('input[name="email"], input[type="email"], #email', username);
    await this.page.fill('input[name="password"], input[type="password"], #password', password);
    await this.page.click('button[type="submit"], button:has-text("Sign In")');
    await this.page.waitForLoadState('domcontentloaded');
    return true;
  }

  async signOut() {
    await this.page.click('button:has-text("Sign Out"), a:has-text("Sign Out"), [data-testid="sign-out"]');
    await this.page.waitForLoadState('domcontentloaded');
    return true;
  }

  async clearSession() {
    await this.page.context().clearCookies();
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    return true;
  }

  async isSignInPageVisible() {
    return await loc.signInHeading(this.page).isVisible();
  }

  async isAccountSummaryPageVisible() {
    return await loc.accountSummaryHeading(this.page).isVisible();
  }
}

module.exports = AuthPage;