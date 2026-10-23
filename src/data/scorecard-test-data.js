const TD = {
  SCORECARD_URL: 'https://www.dickssportinggoods.com/ScoreCard',
  SECTION_HEADING: 'Score the Right Membership for You',
  SCORECARD_POINTS_TEXT: '1 Point For Every $1 Spent.',
  SCORECARD_REWARD_TEXT: '300 Points = $10 Reward.',
  SCORECARD_PLUS_PRICING: '$99 Annual Membership',
  SCORECARD_PLUS_BENEFITS: "That's $350 in Benefits!",
  BENEFITS_VALUE_PATTERN: /\$\d+\s+in\s+Benefits!?/i,
  GUEST_CTA_SCORECARD: /sign in\s*\/\s*join now/i,
  GUEST_CTA_SCORECARD_PLUS: /^join now$|join scorecard\+\s*now/i,
  AUTHENTICATED_CTA: /view account/i,
  TEST_USER_EMAIL: 'testuser@dickssportinggoods.com',
  TEST_USER_PASSWORD: 'ValidPass123!',
  VIEWPORT_DESKTOP_MIN: { width: 1024, height: 768 },
  VIEWPORT_DESKTOP_MAX: { width: 2560, height: 1440 },
  VIEWPORT_DESKTOP_STANDARD: { width: 1920, height: 1080 }
};

module.exports = TD;