const loc = require('./locators/promo.locators');
const URL = 'https://dickssportinggoods.dksxchange.com/';

class PromoPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(URL, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async login(email, password) {
    await loc.myAccountButton(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
    await loc.emailInput(this.page).fill(email);
    await loc.signInButton(this.page).click();
    await loc.passwordInput(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await loc.passwordInput(this.page).fill(password);
    await loc.signInButton(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
    return true;
  }

  async navigateToPromoSection() {
    await this.page.waitForLoadState('domcontentloaded');
    return true;
  }

  async isPromoExpirationDateVisible() {
    try {
      await loc.promoExpirationDate(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return await loc.promoExpirationDate(this.page).isVisible();
    } catch (error) {
      return false;
    }
  }

  async isPromoDrawerExpirationDateVisible() {
    try {
      await loc.promoDrawerExpirationDate(this.page).waitFor({ state: 'visible', timeout: 5000 });
      return await loc.promoDrawerExpirationDate(this.page).isVisible();
    } catch (error) {
      return false;
    }
  }

  async isPromoTileVisible() {
    await loc.promoTile(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.promoTile(this.page).isVisible();
  }

  async clickPromoTile() {
    await loc.promoTile(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
    return true;
  }

  async isPromoDrawerVisible() {
    await loc.promoDrawer(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.promoDrawer(this.page).isVisible();
  }

  async getPromoTitle() {
    await loc.promoTitle(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.promoTitle(this.page).textContent();
  }

  async getPromoDescription() {
    await loc.promoDescription(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.promoDescription(this.page).textContent();
  }

  async isPromoCTAVisible() {
    await loc.promoCTA(this.page).waitFor({ state: 'visible', timeout: 10000 });
    return await loc.promoCTA(this.page).isVisible();
  }
}

module.exports = PromoPage;