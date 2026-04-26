import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

/**
 * Load sensitive credentials (users, passwords, etc.)
 * from a local .env file.
 *
 * NOTE:
 * - This file should NOT be committed to GitHub.
 * - In CI (GitHub Actions), values come from secrets instead.
 */
dotenv.config({ path: '.env.credentials' })

/**
 * Application environments used for testing.
 *
 * These URLs are reused across all browser configurations.
 * Keeping them centralized avoids duplication and mistakes.
 */
const environments = {
  testing: 'https://todo.qacart.com/',
  staging: 'https://todo.qacart.com/',
}

export default defineConfig({
  /**
   * Maximum time one test is allowed to run.
   */
  timeout: 30000,

  /**
   * Directory where test files are located.
   */
  testDir: './tests',

  /**
   * Run tests in parallel within each file.
   * Improves execution speed.
   */
  fullyParallel: true,

  /**
   * Prevent accidental commits of focused tests (test.only)
   * This is enforced only in CI.
   */
  forbidOnly: !!process.env.CI,

  /**
   * Retry failed tests only in CI environment.
   * Helps reduce flaky failures in pipelines.
   */
  retries: process.env.CI ? 2 : 0,

  /**
   * Limit workers in CI to avoid resource issues.
   * Locally, Playwright uses maximum parallelism.
   */
  workers: process.env.CI ? 1 : undefined,

  /**
   * HTML report is generated after test execution.
   */
  reporter: [['allure-playwright'], ['html', { outputFolder: 'html-report' }], ['list']],

  /**
   * Global test settings applied to all projects.
   */
  use: {
    /**
     * Trace is collected only on retry.
     * Useful for debugging failed tests without overhead.
     */
    trace: 'on-first-retry',
  },

  /**
   * Projects define combinations of:
   * - Environment (testing / staging)
   * - Browser (chromium / firefox / webkit)
   *
   * Naming convention: {environment}-{browser}
   */

  projects: [
    // =========================
    // CHROMIUM (Chrome)
    // =========================

    /**
     * Testing environment - Chrome
     * Default and most commonly used setup.
     */
    {
      name: 'testing-chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: environments.testing,
      },
    },

    /**
     * Staging environment - Chrome
     * Used for pre-production validation.
     */
    {
      name: 'staging-chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: environments.staging,
      },
    },

    // =========================
    // FIREFOX
    // =========================

    /**
     * Testing environment - Firefox
     * Used for cross-browser validation.
     */
    {
      name: 'testing-firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: environments.testing,
      },
    },

    /**
     * Staging environment - Firefox
     */
    {
      name: 'staging-firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: environments.staging,
      },
    },

    // =========================
    // WEBKIT (Safari engine)
    // =========================

    /**
     * Testing environment - WebKit (Safari)
     * Used for Apple/Safari compatibility checks.
     */
    {
      name: 'testing-webkit',
      use: {
        ...devices['Desktop Safari'],
        baseURL: environments.testing,
      },
    },

    /**
     * Staging environment - WebKit (Safari)
     */
    {
      name: 'staging-webkit',
      use: {
        ...devices['Desktop Safari'],
        baseURL: environments.staging,
      },
    },
  ],
})
