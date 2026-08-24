const loc = require('../locators/scorecard.locators');
const TD = require('../data/scorecard-test-data');

class ScorecardPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(TD.urls.scorecardPage, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async setViewport(width, height) {
    await this.page.setViewportSize({ width, height });
  }

  // Scorecard tile methods
  async isScorecardTileVisible() {
    return await loc.scorecardTile(this.page).isVisible();
  }

  async isScorecardLogoVisible() {
    return await loc.scorecardLogo(this.page).isVisible();
  }

  async getScorecardLogoWidth() {
    const logo = loc.scorecardLogo(this.page);
    const box = await logo.boundingBox();
    return box ? box.width : 0;
  }

  async isPricingText1Visible() {
    return await loc.scorecardPricingText1(this.page).isVisible();
  }

  async getPricingText1Content() {
    return await loc.scorecardPricingText1(this.page).textContent();
  }

  async isPricingText2Visible() {
    return await loc.scorecardPricingText2(this.page).isVisible();
  }

  async getPricingText2Content() {
    return await loc.scorecardPricingText2(this.page).textContent();
  }

  async isScorecardCtaButtonVisible() {
    return await loc.scorecardCtaButton(this.page).isVisible();
  }

  async getScorecardCtaButtonStyles() {
    const button = loc.scorecardCtaButton(this.page);
    const backgroundColor = await button.evaluate(el => window.getComputedStyle(el).backgroundColor);
    const color = await button.evaluate(el => window.getComputedStyle(el).color);
    const padding = await button.evaluate(el => window.getComputedStyle(el).padding);
    return { backgroundColor, color, padding };
  }

  async getPricingTextFontSize(textNumber) {
    const element = textNumber === 1 ? loc.scorecardPricingText1(this.page) : loc.scorecardPricingText2(this.page);
    const fontSize = await element.evaluate(el => window.getComputedStyle(el).fontSize);
    return parseFloat(fontSize);
  }

  async arePricingTextsAligned() {
    const text1Box = await loc.scorecardPricingText1(this.page).boundingBox();
    const text2Box = await loc.scorecardPricingText2(this.page).boundingBox();
    return text1Box && text2Box ? text1Box.x === text2Box.x : false;
  }

  async getPricingTextsSpacing() {
    const text1Box = await loc.scorecardPricingText1(this.page).boundingBox();
    const text2Box = await loc.scorecardPricingText2(this.page).boundingBox();
    if (text1Box && text2Box) {
      return text2Box.y - (text1Box.y + text1Box.height);
    }
    return 0;
  }

  // Section heading methods
  async isSectionHeadingVisible() {
    return await loc.sectionHeading(this.page).isVisible();
  }

  async getSectionHeadingText() {
    return await loc.sectionHeading(this.page).textContent();
  }

  async getSectionHeadingPosition() {
    const heading = loc.sectionHeading(this.page);
    const tilesSection = loc.comparisonSection(this.page);
    const headingBox = await heading.boundingBox();
    const tilesBox = await tilesSection.boundingBox();
    return { headingBox, tilesBox };
  }

  async isSectionHeadingCentered() {
    const heading = loc.sectionHeading(this.page);
    const headingBox = await heading.boundingBox();
    const pageWidth = await this.page.viewportSize().then(vp => vp.width);
    if (headingBox) {
      const headingCenter = headingBox.x + headingBox.width / 2;
      const pageCenter = pageWidth / 2;
      return Math.abs(headingCenter - pageCenter);
    }
    return null;
  }

  async getSectionHeadingStyles() {
    const heading = loc.sectionHeading(this.page);
    const fontSize = await heading.evaluate(el => window.getComputedStyle(el).fontSize);
    const fontWeight = await heading.evaluate(el => window.getComputedStyle(el).fontWeight);
    const color = await heading.evaluate(el => window.getComputedStyle(el).color);
    const lineHeight = await heading.evaluate(el => window.getComputedStyle(el).lineHeight);
    const textAlign = await heading.evaluate(el => window.getComputedStyle(el).textAlign);
    return { fontSize: parseFloat(fontSize), fontWeight: parseInt(fontWeight), color, lineHeight, textAlign };
  }

  async getContrastRatio(element) {
    const el = typeof element === 'string' ? this.page.locator(element).first() : element;
    const color = await el.evaluate(el => {
      const style = window.getComputedStyle(el);
      return { text: style.color, background: style.backgroundColor };
    });
    return color;
  }

  async setZoomLevel(zoomPercent) {
    await this.page.evaluate((zoom) => {
      document.body.style.zoom = `${zoom}%`;
    }, zoomPercent);
  }

  // Scorecard+ tile methods
  async isScorecardPlusTileVisible() {
    return await loc.scorecardPlusTile(this.page).isVisible();
  }

  async getBenefitsValueText() {
    return await loc.scorecardPlusBenefitsValue(this.page).textContent();
  }

  async isBenefitsValueVisible() {
    return await loc.scorecardPlusBenefitsValue(this.page).isVisible();
  }

  // Network monitoring methods
  async captureAEMRequest() {
    return new Promise((resolve) => {
      this.page.on('response', async (response) => {
        const url = response.url();
        if (url.includes('/content/scorecard/benefits') || url.includes('/api/v4/content')) {
          const status = response.status();
          let body = null;
          try {
            body = await response.json();
          } catch (e) {
            body = await response.text();
          }
          resolve({ url, status, body });
        }
      });
    });
  }

  async clearBrowserCache() {
    const context = this.page.context();
    await context.clearCookies();
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  }

  async checkPageSource(searchText) {
    const content = await this.page.content();
    return content.includes(searchText);
  }
}

module.exports = ScorecardPage;