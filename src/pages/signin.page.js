const loc = require('../locators/scorecard.locators');

class SignInPage {
  constructor(page) {
    this.page = page;
  }

  async isSignInPageLoaded() {
    return await loc.signInHeading(this.page).isVisible();
  }

  async fillEmail(email) {
    await loc.emailField(this.page).fill(email);
  }

  async fillPassword(password) {
    await loc.passwordField(this.page).fill(password);
  }

  async clickSignInButton() {
    await loc.signInButton(this.page).click();
  }

  async signIn(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSignInButton();
  }

  async isEmailFieldVisible() {
    return await loc.emailField(this.page).isVisible();
  }

  async isPasswordFieldVisible() {
    return await loc.passwordField(this.page).isVisible();
  }

  async isSignInButtonVisible() {
    return await loc.signInButton(this.page).isVisible();
  }
}

module.exports = SignInPage;