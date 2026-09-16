const loc = require('../locators/scorecard.locators');
const URL = 'https://www.dickssportinggoods.com/ScoreCard';

class ScorecardPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async isUnavailablePageVisible() {
    return await loc.unavailablePage(this.page).isVisible().catch(() => false);
  }

  async waitForComparisonSection() {
    await loc.comparisonSection(this.page).waitFor({ state: 'visible', timeout: 30000 });
    return true;
  }

  async getSectionHeadingText() {
    await loc.sectionHeading(this.page).waitFor({ state: 'visible', timeout: 30000 });
    return await loc.sectionHeading(this.page).textContent();
  }

  async isScorecardTileVisible() {
    return await loc.scorecardTile(this.page).isVisible().catch(() => false);
  }

  async isScorecardPlusTileVisible() {
    return await loc.scorecardPlusTile(this.page).isVisible().catch(() => false);
  }

  async getScorecardLogoAlt() {
    await loc.scorecardLogoSummary(this.page).waitFor({ state: 'visible', timeout: 30000 });
    return await loc.scorecardLogoSummary(this.page).getAttribute('alt');
  }

  async getScorecardPointsText() {
    await loc.scorecardPoints(this.page).waitFor({ state: 'visible', timeout: 30000 });
    return await loc.scorecardPoints(this.page).textContent();
  }

  async getScorecardRewardsText() {
    await loc.scorecardRewards(this.page).waitFor({ state: 'visible', timeout: 30000 });
    return await loc.scorecardRewards(this.page).textContent();
  }

  async isComparisonSectionVisible() {
    return await loc.comparisonSection(this.page).isVisible().catch(() => false);
  }

  async isSectionHeadingVisible() {
    return await loc.sectionHeading(this.page).isVisible().catch(() => false);
  }

  async getScorecardPlusLogoAlt() {
    await loc.scorecardPlusLogoSummary(this.page).waitFor({ state: 'visible', timeout: 30000 });
    return await loc.scorecardPlusLogoSummary(this.page).getAttribute('alt');
  }

  async getScorecardPlusPriceText() {
    await loc.scorecardPlusPrice(this.page).waitFor({ state: 'visible', timeout: 30000 });
    return await loc.scorecardPlusPrice(this.page).textContent();
  }

  async getScorecardPlusBenefitsText() {
    await loc.scorecardPlusBenefits(this.page).waitFor({ state: 'visible', timeout: 30000 });
    return await loc.scorecardPlusBenefits(this.page).textContent();
  }

  async isScorecardPlusContentVisible() {
    const priceVisible = await loc.scorecardPlusPrice(this.page).isVisible().catch(() => false);
    const benefitsVisible = await loc.scorecardPlusBenefits(this.page).isVisible().catch(() => false);
    return priceVisible && benefitsVisible;
  }

  async isGuestCtaVisible() {
    return await loc.scorecardGuestCta(this.page).isVisible().catch(() => false);
  }

  async isAuthenticatedCtaVisible() {
    return await loc.viewAccountScorecardTile(this.page).isVisible().catch(() => false);
  }

  async clickGuestCta() {
    await loc.scorecardGuestCta(this.page).waitFor({ state: 'visible', timeout: 30000 });
    await loc.scorecardGuestCta(this.page).click();
  }

  async clickAuthenticatedCta() {
    await loc.viewAccountScorecardTile(this.page).waitFor({ state: 'visible', timeout: 30000 });
    await loc.viewAccountScorecardTile(this.page).click();
  }

  async signInUser(email, password) {
    const currentUrl = this.page.url();
    if (!currentUrl.includes('sign-in') && !currentUrl.includes('login')) {
      const signInLink = loc.signInLink(this.page);
      if (await signInLink.isVisible().catch(() => false)) {
        await signInLink.click();
        await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
      }
    }

    await loc.signInEmailInput(this.page).fill(email);
    await loc.signInPasswordInput(this.page).fill(password);
    await loc.signInSubmitButton(this.page).click();
    await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
  }

  async isSignInPageVisible() {
    return await loc.signInPageCheck(this.page).isVisible().catch(() => false);
  }

  async isAccountSummaryVisible() {
    return await loc.accountSummaryCheck(this.page).isVisible().catch(() => false);
  }

  async captureStaticContent() {
    const content = {
      scorecardLogo: await this.getScorecardLogoAlt(),
      scorecardPoints: await this.getScorecardPointsText(),
      scorecardRewards: await this.getScorecardRewardsText(),
      scorecardPlusLogo: await this.getScorecardPlusLogoAlt(),
      scorecardPlusPrice: await this.getScorecardPlusPriceText(),
      scorecardPlusBenefits: await this.getScorecardPlusBenefitsText(),
      sectionHeading: await this.getSectionHeadingText()
    };
    return content;
  }
}

module.exports = ScorecardPage;