const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  // Test location
  testDir: './src/tests',

  // Maximum time for each test
  timeout: 120000,

  // Expect assertion timeout
  expect: {
    timeout: 30000
  },

  // Run tests in parallel
  fullyParallel: true,

  // Prevent accidental test.only from passing CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests in CI
  retries: process.env.CI ? 1 : 0,

  // Number of workers
  workers: process.env.CI ? 2 : undefined,

  // Reporter configuration
  reporter: [
    ['line'],
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never'
      }
    ]
  ],

  // Shared settings for all tests
  use: {
    headless: true,

    // Capture trace when a test is retried
    trace: 'on-first-retry',

    // Capture screenshot only when test fails
    screenshot: 'only-on-failure',

    // Keep video when test fails
    video: 'retain-on-failure'
  }
});
