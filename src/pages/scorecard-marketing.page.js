const loc = require('./locators/scorecard-marketing.locators');
const URL = 'https://www.dickssportinggoods.com/ScoreCard';

class ScorecardMarketingPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async getSectionHeadingText() {
    const heading = loc.sectionHeading(this.page);
    await heading.waitFor({ state: 'visible', timeout: 10000 });
    return await heading.textContent();
  }

  async isSectionHeadingCentered() {
    const heading = loc.sectionHeading(this.page);
    await heading.waitFor({ state: 'visible', timeout: 10000 });
    const box = await heading.boundingBox();
    const viewportSize = this.page.viewportSize();
    if (!box || !viewportSize) return false;
    const centerX = box.x + box.width / 2;
    const viewportCenterX = viewportSize.width / 2;
    const tolerance = 50;
    return Math.abs(centerX - viewportCenterX) <= tolerance;
  }

  async captureLogoAttributes(logoLocator) {
    await logoLocator.waitFor({ state: 'visible', timeout: 10000 });
    const src = await logoLocator.getAttribute('src');
    const alt = await logoLocator.getAttribute('alt');
    const box = await logoLocator.boundingBox();
    return { src, alt, width: box?.width, height: box?.height };
  }

  async getScorecardLogoAttributes() {
    return await this.captureLogoAttributes(loc.scorecardLogo(this.page));
  }

  async getScorecardPlusLogoSummaryAttributes() {
    return await this.captureLogoAttributes(loc.scorecardPlusLogoSummary(this.page));
  }

  async getScorecardPlusLogoCardAttributes() {
    return await this.captureLogoAttributes(loc.scorecardPlusLogoCard(this.page));
  }

  async getPricingText() {
    const priceElement = loc.scorecardPlusPrice(this.page);
    await priceElement.waitFor({ state: 'visible', timeout: 10000 });
    return await priceElement.textContent();
  }

  async getBenefitsText() {
    const benefitsElement = loc.scorecardPlusBenefits(this.page);
    await benefitsElement.waitFor({ state: 'visible', timeout: 10000 });
    return await benefitsElement.textContent();
  }

  async getScorecardPointsText() {
    const pointsElement = loc.scorecardPointsText(this.page);
    await pointsElement.waitFor({ state: 'visible', timeout: 10000 });
    return await pointsElement.textContent();
  }

  async getScorecardRewardText() {
    const rewardElement = loc.scorecardRewardText(this.page);
    await rewardElement.waitFor({ state: 'visible', timeout: 10000 });
    return await rewardElement.textContent();
  }

  async getScorecardCtaText() {
    const ctaElement = loc.scorecardGuestCta(this.page).or(loc.viewAccountScorecardTile(this.page));
    await ctaElement.first().waitFor({ state: 'visible', timeout: 10000 });
    return await ctaElement.first().textContent();
  }

  async getScorecardPlusCtaText() {
    const ctaElement = loc.scorecardPlusGuestCta(this.page).or(loc.viewAccountScorecardPlusTile(this.page));
    await ctaElement.first().waitFor({ state: 'visible', timeout: 10000 });
    return await ctaElement.first().textContent();
  }

  async isComparisonSectionVisible() {
    const section = loc.comparisonSection(this.page);
    return await section.isVisible();
  }

  async areTilesVisibleSideBySide() {
    const scorecardTile = loc.scorecardTile(this.page);
    const scorecardPlusTile = loc.scorecardPlusTile(this.page);
    await scorecardTile.waitFor({ state: 'visible', timeout: 10000 });
    await scorecardPlusTile.waitFor({ state: 'visible', timeout: 10000 });
    const box1 = await scorecardTile.boundingBox();
    const box2 = await scorecardPlusTile.boundingBox();
    if (!box1 || !box2) return false;
    return Math.abs(box1.y - box2.y) < 50;
  }

  async signOut() {
    const myAccountBtn = loc.myAccountButton(this.page);
    await myAccountBtn.waitFor({ state: 'visible', timeout: 10000 });
    await myAccountBtn.click();
    const signOutLink = loc.signOutLink(this.page);
    await signOutLink.waitFor({ state: 'visible', timeout: 10000 });
    await signOutLink.click();
    await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
  }

  async captureAllContent() {
    const content = {
      scorecardLogo: await this.getScorecardLogoAttributes(),
      scorecardPlusLogoSummary: await this.getScorecardPlusLogoSummaryAttributes(),
      scorecardPlusLogoCard: await this.getScorecardPlusLogoCardAttributes(),
      pricingText: await this.getPricingText(),
      benefitsText: await this.getBenefitsText(),
      pointsText: await this.getScorecardPointsText(),
      rewardText: await this.getScorecardRewardText(),
      scorecardCta: await this.getScorecardCtaText(),
      scorecardPlusCta: await this.getScorecardPlusCtaText()
    };
    return content;
  }
}

module.exports = ScorecardMarketingPage;