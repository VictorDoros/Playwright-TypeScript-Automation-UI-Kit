# Playwright TypeScript UI Automation Kit

A Playwright + TypeScript UI automation framework for the [QAcart Todo App](https://todo.qacart.com/). The project uses the Page Object Model, custom fixtures, environment-based credentials, test tags, cross-browser projects, HTML reports, Allure reports, and GitHub Actions for CI execution.

## Tech stack

- [Playwright Test](https://playwright.dev/) with TypeScript
- Page Object Model structure
- Custom Playwright fixtures
- Faker for test data generation
- dotenv for local credential management
- HTML and Allure reporting
- GitHub Actions workflow with manual test-suite selection

## Project structure

```text
.
├── .github/workflows/
│   └── playwright.yml              # Manual GitHub Actions workflow
├── fixtures/
│   ├── app.pages.ts                # Central AppPages fixture container
│   └── test.fixture.ts             # Custom Playwright test fixture
├── pages/
│   ├── CreateNewTodo.ts            # Create Todo page object
│   ├── Home.ts                     # Login/Home page object
│   ├── Profile.ts                  # Todo/Profile page object
│   └── Registration.ts             # Registration page object
├── tests/
│   ├── healthcheck.spec.ts         # Application health checks
│   ├── login_logout.spec.ts        # Login and logout tests
│   ├── manageToDoItems.spec.ts     # CRUD operations for todo items
│   └── registerAccount.spec.ts     # New user registration flow
├── utils/
│   ├── credentials.ts              # Required environment variables
│   └── randomDataGeneration.ts     # Faker-based user generator
├── playwright.config.ts            # Playwright projects, reporters, retries
├── package.json
└── .prettierrc
```

## Test coverage

The current suite covers:

- Application health check
- Login
- Logout
- New user registration
- Creating todo items
- Checking todo items
- Deleting todo items
- Empty todo-list validation

## Test tags

Tags are used for local filtering and CI suite selection.

| Tag             | Purpose                             |
| --------------- | ----------------------------------- |
| `@smoke`        | Critical smoke checks               |
| `@regression`   | Regression scenarios                |
| `@healthcheck`  | App loading and basic UI validation |
| `@login_logout` | Login/logout scenarios              |
| `@register`     | User registration scenario          |
| `@manageItems`  | Todo item management scenario       |

## Prerequisites

Install the following before running the project:

- Node.js LTS
- npm
- Git

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd <repository-folder>
npm ci
```

Install Playwright:

```bash
npx playwright install
```

## Environment variables

Some tests require an existing user account. Locally, credentials are loaded from `.env.credentials`.

Create a `.env.credentials` file in the project root:

```env
USER_NAME=Your Name
USER_EMAIL=your.email@example.com
USER_PASSWORD=yourPassword
```

The file is ignored by Git through `.gitignore` and must not be committed.

In GitHub Actions, these values are expected to come from repository secrets:

- `USER_NAME`
- `USER_EMAIL`
- `USER_PASSWORD`

## Application environments

Environment base URLs are configured in `playwright.config.ts`:

| Environment | URL                        |
| ----------- | -------------------------- |
| `testing`   | `https://todo.qacart.com/` |
| `staging`   | `https://todo.qacart.com/` |

Both currently point to the same application URL, but the configuration is ready for separate test and staging URLs.

## Browser projects

The framework defines six Playwright projects:

| Project            | Environment | Browser                |
| ------------------ | ----------- | ---------------------- |
| `testing-chromium` | testing     | Chromium / Chrome      |
| `staging-chromium` | staging     | Chromium / Chrome      |
| `testing-firefox`  | testing     | Firefox                |
| `staging-firefox`  | staging     | Firefox                |
| `testing-webkit`   | testing     | WebKit / Safari engine |
| `staging-webkit`   | staging     | WebKit / Safari engine |

## Running tests locally

Run all tests across all configured projects:

```bash
npx playwright test
```

Run tests in one project:

```bash
npx playwright test --project=testing-chromium
```

Run smoke tests:

```bash
npx playwright test --grep @smoke
```

Run regression tests:

```bash
npx playwright test --grep @regression
```

Run a specific test tag:

```bash
npx playwright test --grep @login_logout
npx playwright test --grep @register
npx playwright test --grep @manageItems
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run tests with Playwright UI mode:

```bash
npx playwright test --ui
```

Debug a test:

```bash
npx playwright test --debug
```

## Reports

The project is configured with three reporters:

- `list` reporter for console output
- Playwright HTML report
- Allure report results

### Playwright HTML report

After running tests, open the HTML report:

```bash
npx playwright show-report html-report
```

### Allure report

Generate the Allure report:

```bash
npx allure generate allure-results --clean -o allure-report
```

Open the generated Allure report:

```bash
npx allure open allure-report
```

Or serve the report directly:

```bash
npx allure serve allure-results
```

## CI execution

The GitHub Actions workflow is located at:

```text
.github/workflows/playwright.yml
```

The workflow is triggered manually through `workflow_dispatch` and allows choosing:

- Test suite: `smoke` or `regression`
- Environment: `testing` or `staging`
- Browser: `chromium`, `firefox`, or `webkit`
- Optional additional grep tag, for example `@login_logout`

Example CI command generated by the workflow:

```bash
npx playwright test --project=testing-chromium --grep @smoke
```

If an additional grep value is provided, the workflow applies both the selected suite and the additional tag.

Reports are uploaded as GitHub Actions artifacts:

- `html-report`
- `allure-report`

## Framework design

### Page Object Model

UI locators and user actions are grouped by page under the `pages/` directory. Each page object separates page sections such as views, inputs, buttons, and checkboxes.

Example:

```ts
await app.home.userLogin(ENV.user.email, ENV.user.password)
await expect(app.profile.views.welcomeMessage).toContainText(new RegExp(ENV.user.name, 'i'))
```

### Custom fixtures

The custom fixture in `fixtures/test.fixture.ts` exposes a single `app` object to tests. This keeps tests clean and avoids manually creating page objects in every spec file.

Example:

```ts
test('example', async ({ app }) => {
  await app.home.userLogin(email, password)
})
```

### Test steps

Tests use `test.step()` to make execution flow easier to read in reports and traces.

```ts
await test.step('Login the user', async () => {
  await app.home.userLogin(ENV.user.email, ENV.user.password)
})
```

### Random test data

`RandomDataUtil` uses Faker to generate new registration data for tests that create users dynamically.

## Configuration highlights

`playwright.config.ts` includes:

- `testDir: './tests'`
- `timeout: 30000`
- Parallel execution enabled with `fullyParallel: true`
- CI-only retries with `retries: process.env.CI ? 2 : 0`
- CI worker limit with `workers: process.env.CI ? 1 : undefined`
- Trace collection on first retry with `trace: 'on-first-retry'`
- Allure, HTML, and list reporters

## Formatting

The project includes Prettier configuration in `.prettierrc`:

```json
{
  "printWidth": 120,
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "arrowParens": "avoid",
  "bracketSpacing": true,
  "endOfLine": "lf"
}
```

## Suggested package scripts

```json
{
  "scripts": {
    "test": "playwright test",
    "test:smoke": "playwright test --grep @smoke",
    "test:regression": "playwright test --grep @regression",
    "report:html": "playwright show-report html-report"
  }
}
```

Then commands can be run as:

```bash
npm run test:smoke
npm run test:regression
npm run report:html
```

## Notes for contributors

- Keep locators inside page objects, not in test files.
- Prefer stable locators such as `data-testid` and accessible role locators.
- Use `test.step()` for readable reports.
- Add meaningful tags to new tests.
- Avoid committing generated folders such as `allure-results`, `allure-report`, `html-report`, and `test-results`.
- Keep credentials in `.env.credentials` locally and GitHub Secrets in CI.
