const loc = require('../locators/scorecard.locators');

class AccountPage {
  constructor(page) {
    this.page = page;
  }

  async isAccountSummaryPageLoaded() {
    return await loc.accountSummaryHeading(this.page).isVisible();
  }

  async getCurrentUrl() {
    return this.page.url();
  }
}

module.exports = AccountPage;