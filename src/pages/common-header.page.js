const loc = require('./locators/common-header.locators');

class CommonHeaderPage {
  constructor(page) {
    this.page = page;
  }

  async clickMyAccount() {
    await loc.myAccountButton(this.page).click();
  }

  async isMyAccountButtonVisible() {
    return await loc.myAccountButton(this.page).isVisible();
  }

  async clearCookies() {
    await this.page.context().clearCookies();
  }

  async clearSessionStorage() {
    await this.page.evaluate(() => sessionStorage.clear());
  }

  async clearLocalStorage() {
    await this.page.evaluate(() => localStorage.clear());
  }

  async clearAllAuthData() {
    await this.clearCookies();
    await this.clearSessionStorage();
    await this.clearLocalStorage();
  }
}

module.exports = CommonHeaderPage;