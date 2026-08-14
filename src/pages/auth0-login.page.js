const loc = require('./locators/auth0-login.locators');
const TD = require('../data/scorecard-test-data');

class Auth0LoginPage {
  constructor(page) {
    this.page = page;
  }

  async isOnAuth0LoginPage() {
    await this.page.waitForURL(TD.AUTH0_SSO_URL_PATTERN, { timeout: 10000 });
    return this.page.url().includes('sso-nonprod.dickssportinggoods.com/u/login/identifier');
  }

  async isHeadingVisible() {
    return await loc.heading(this.page).isVisible();
  }

  async getHeadingText() {
    return await loc.heading(this.page).textContent();
  }

  async isEmailInputVisible() {
    return await loc.emailInput(this.page).isVisible();
  }

  async isContinueButtonVisible() {
    return await loc.continueButton(this.page).isVisible();
  }

  async enterEmail(email) {
    await loc.emailInput(this.page).fill(email);
  }

  async clickContinue() {
    await loc.continueButton(this.page).click();
  }

  async isPasswordInputVisible() {
    return await loc.passwordInput(this.page).isVisible();
  }

  async enterPassword(password) {
    await loc.passwordInput(this.page).fill(password);
  }

  async clickSignIn() {
    await loc.signInButton(this.page).click();
  }

  async isErrorMessageVisible() {
    return await loc.errorMessage(this.page).isVisible();
  }

  async getErrorMessageText() {
    return await loc.errorMessage(this.page).textContent();
  }

  async isGoogleButtonVisible() {
    return await loc.googleButton(this.page).isVisible();
  }

  async isAppleButtonVisible() {
    return await loc.appleButton(this.page).isVisible();
  }

  async isJoinNowLinkVisible() {
    return await loc.joinNowLink(this.page).isVisible();
  }

  async signIn(email, password) {
    await this.enterEmail(email);
    await this.clickContinue();
    await this.page.waitForTimeout(1000);
    await this.enterPassword(password);
    await this.clickSignIn();
  }
}

module.exports = Auth0LoginPage;