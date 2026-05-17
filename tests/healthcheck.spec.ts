import { test, expect } from '../fixtures/test.fixture.ts'

test.beforeEach(async ({ app }) => {
  await test.step('Access the application', async () => {
    await app.page.goto('/', { waitUntil: 'domcontentloaded' })
  })
})

test.describe('Health Check @smoke', async () => {
  test('Loading the app @healthcheck', async ({ app }) => {
    await test.step('Confirm the correct title of the page is displayed', async () => {
      await expect(app.page).toHaveTitle('QAcart Todo App - Login page')
    })

    await test.step('Confirm the login container is displayed', async () => {
      await expect(app.home.views.loginContainer).toBeVisible()
    })

    await test.step('Confirm the corresponding navbar buttons are visible', async () => {
      await expect(app.home.buttons.home).toBeVisible()
      await expect(app.home.buttons.login).toBeVisible()
      await expect(app.home.buttons.signUp).toBeVisible()
    })
  })
})
