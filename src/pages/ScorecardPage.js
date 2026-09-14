class ScorecardPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://www.dickssportinggoods.com/ScoreCard';
  }

  // Navigation
  async navigate() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('networkidle');
  }

  // Comparison Section
  async getComparisonSection() {
    return this.page.locator('my-account-templates-page-header')
      .filter({ has: this.page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) })
      .first();
  }

  // Section Heading
  async getSectionHeading() {
    const comparisonSection = await this.getComparisonSection();
    return comparisonSection.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 });
  }

  // Tile Root Elements
  async getScorecardTile() {
    const comparisonSection = await this.getComparisonSection();
    return comparisonSection.locator('.tile-body-copy')
      .filter({ hasText: /1 Point For Every \$1 Spent/i })
      .first();
  }

  async getScorecardPlusTile() {
    const comparisonSection = await this.getComparisonSection();
    return comparisonSection.locator('.tile-body-copy')
      .filter({ has: this.page.getByAltText('ScoreCard Plus New Logo') })
      .first();
  }

  // ScoreCard Content Elements
  async getScorecardLogo() {
    const comparisonSection = await this.getComparisonSection();
    return comparisonSection.getByAltText('ScoreCard Logo Light None').first();
  }

  async getScorecardPointsText() {
    const comparisonSection = await this.getComparisonSection();
    return comparisonSection.getByText(/1 Point For Every \$1 Spent\./i).first();
  }

  async getScorecardRewardText() {
    const comparisonSection = await this.getComparisonSection();
    return comparisonSection.getByText(/300 Points = \$10 Reward\./i).first();
  }

  // ScoreCard+ Content Elements
  async getScorecardPlusLogo() {
    const comparisonSection = await this.getComparisonSection();
    return comparisonSection.getByAltText('ScoreCard Plus New Logo').first();
  }

  async getScorecardPlusLogoCard() {
    const comparisonSection = await this.getComparisonSection();
    return comparisonSection.getByAltText('ScoreCard Logo \\+ Light None').first();
  }

  async getScorecardPlusPrice() {
    const comparisonSection = await this.getComparisonSection();
    return comparisonSection.getByText(/\$99 Annual Membership\./i).first();
  }

  async getScorecardPlusBenefits() {
    const comparisonSection = await this.getComparisonSection();
    return comparisonSection.locator('.benefits-value')
      .filter({ hasText: /\$\d+\s+in\s+Benefits!?/i })
      .first();
  }

  // Guest User CTAs
  async getScorecardGuestCta() {
    const scorecardTile = await this.getScorecardTile();
    return scorecardTile.getByRole('button', { name: /sign in\s*\/\s*join now/i })
      .or(scorecardTile.getByRole('link', { name: /sign in\s*\/\s*join now/i }));
  }

  async getScorecardPlusGuestCta() {
    const scorecardPlusTile = await this.getScorecardPlusTile();
    return scorecardPlusTile.getByRole('button', { name: /^join now$/i })
      .or(scorecardPlusTile.getByRole('link', { name: /^join now$/i }))
      .or(scorecardPlusTile.getByRole('button', { name: /join scorecard\+\s*now/i }));
  }

  // Authenticated User CTAs
  async getViewAccountScorecardTile() {
    const scorecardTile = await this.getScorecardTile();
    return scorecardTile.getByRole('button', { name: /view account/i })
      .or(scorecardTile.getByRole('link', { name: /view account/i }));
  }

  async getViewAccountScorecardPlusTile() {
    const scorecardPlusTile = await this.getScorecardPlusTile();
    return scorecardPlusTile.getByRole('button', { name: /view account/i })
      .or(scorecardPlusTile.getByRole('link', { name: /view account/i }));
  }

  // Authentication
  async authenticateUser(username, password) {
    // Navigate to sign-in page
    await this.page.goto('https://www.dickssportinggoods.com/signin');
    
    // Fill in credentials
    await this.page.fill('input[type="email"], input[name="email"], #email', username);
    await this.page.fill('input[type="password"], input[name="password"], #password', password);
    
    // Click sign-in button
    await this.page.click('button[type="submit"], button:has-text("Sign In")');
    
    // Wait for navigation to complete
    await this.page.waitForLoadState('networkidle');
    
    // Verify authentication success
    await this.page.waitForTimeout(2000);
  }
}

module.exports = ScorecardPage;