const locators = {
  // Section Heading
  sectionHeading: (page) => page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }).first(),

  // Scorecard Tile Elements
  scorecardLogo: (page) => page.getByAltText('ScoreCard Logo Light None').nth(1).first(),
  scorecardPointsText: (page) => page.getByText('Earn 1 Point for every $1 spent', { exact: false }).first(),
  scorecardRewardText: (page) => page.getByText('300 Points = $10 Reward', { exact: false }).first(),

  // Scorecard+ Tile Elements
  scorecardPlusSummaryLogo: (page) => page.getByAltText('ScoreCard Plus New Logo').first(),
  scorecardPlusCardLogo: (page) => page.getByAltText('ScoreCard Logo + Light None').first(),
  scorecardPlusPrice: (page) => page.getByText('$99 Annual Membership', { exact: false }).first(),
  scorecardPlusBenefits: (page) => page.getByText("That's $350 in Benefits", { exact: false }).first(),

  // Comparison Section Wrapper
  comparisonSection: (page) => page.locator('div, section').filter({ has: page.getByRole('heading', { name: 'Score the Right Membership for You', level: 2 }) }).first(),

  // Guest CTAs
  signInJoinNowButton: (page) => page.getByRole('link', { name: /sign in \/ join now/i }).or(page.getByRole('button', { name: /sign in \/ join now/i })).or(page.getByText('Sign in to earn', { exact: false })).first(),
  joinNowButton: (page) => page.getByRole('button', { name: /join now/i }).or(page.getByRole('link', { name: /join now/i })).first(),
  joinScorecardPlusButton: (page) => page.getByRole('button', { name: /join scorecard\+ now/i }).first(),

  // Authenticated CTAs
  viewAccountButton: (page) => page.getByRole('link', { name: /view account/i }).or(page.getByRole('button', { name: /view account/i })).first(),
  viewAccountScorecardTile: (page) => page.getByRole('link', { name: /view account/i }).or(page.getByRole('button', { name: /view account/i })).first(),
  viewAccountScorecardPlusTile: (page) => page.getByRole('link', { name: /view account/i }).or(page.getByRole('button', { name: /view account/i })).last(),

  // AEM Benefits Value
  aemBenefitsValue: (page) => page.getByText(/\$\d+\s+in\s+Benefits/i).first(),

  // Auth0 Sign In Page Elements
  auth0EmailInput: (page) => page.getByLabel('Email Address').first(),
  auth0ContinueButton: (page) => page.getByRole('button', { name: /continue/i }).first(),
  auth0PasswordInput: (page) => page.getByLabel('Password').first(),
  auth0SignInButton: (page) => page.getByRole('button', { name: /sign in/i }).first(),
  auth0ErrorMessage: (page) => page.locator('[role="alert"]').first(),

  // My Account Elements
  myAccountButton: (page) => page.getByRole('button', { name: /my account/i }).first(),
  signOutLink: (page) => page.getByRole('link', { name: /sign out/i }).first()
};

module.exports = locators;