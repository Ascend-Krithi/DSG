module.exports = {
  urls: {
    scorecardPage: 'https://www.dickssportinggoods.com/scorecard',
    scorecardBenefits: '/s/scorecard-benefits',
    creditCard: '/s/scorecard/dicks-credit-card'
  },
  urlPatterns: {
    scorecardPage: /\/scorecard$/
  },
  viewport: {
    desktop: { width: 1920, height: 1080 }
  },
  headings: {
    comparisonSection: 'Score the Right Membership for You'
  },
  scorecard: {
    pricing: {
      pointsPerDollar: '1 Point Per Every $1 Spent.',
      rewardThreshold: '300 Points = $10 Reward.'
    },
    logo: {
      minWidth: 150,
      altText: /scorecard/i
    },
    button: {
      backgroundColor: '#0066CC',
      textColor: '#FFFFFF',
      padding: '12px 24px'
    }
  },
  scorecardPlus: {
    benefits: {
      initial: 'Over $200 in benefits annually',
      updated: 'Over $250 in exclusive benefits'
    },
    pricing: {
      annual: '$99',
      benefitsValue: '$350'
    }
  },
  aem: {
    contentPath: '/content/scorecard/benefits',
    endpoint: /\/api\/v4\/content/
  },
  styling: {
    fontSize: { min: 14, max: 16 },
    fontWeight: { normal: 400, semiBold: 600, bold: 700 },
    colors: {
      text: '#333333',
      black: '#000000',
      white: '#FFFFFF',
      primary: '#0066CC'
    },
    spacing: {
      elementGap: 16,
      tilePadding: { min: 20, max: 30 },
      headingMargin: { min: 30, max: 50 },
      lineSpacing: { min: 8, max: 12 }
    },
    heading: {
      fontSize: { min: 28, max: 36 },
      fontWeight: { min: 600, max: 700 },
      lineHeight: { min: 1.2, max: 1.5 }
    },
    contrast: {
      wcagAA: 4.5,
      blackOnWhite: 21
    }
  },
  zoomLevels: [100, 125, 150],
  tolerance: {
    centerAlignment: 5
  }
};