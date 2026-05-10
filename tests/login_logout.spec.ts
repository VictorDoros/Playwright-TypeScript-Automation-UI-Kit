import { test, expect } from '../fixtures/test.fixture.ts'
import { ENV } from '../utils/credentials.ts'

test.beforeEach(async ({ app }) => {
  await test.step('Access the application', async () => {
    await app.page.goto('/', { waitUntil: 'domcontentloaded' })
  })
})

test.describe('Login and Logout @smoke', async () => {
  test('Validate that user can log in @login_logout', async ({ app }) => {
    // #1
    await test.step('Login the user', async () => {
      await app.home.userLogin(ENV.user.email, ENV.user.password)
    })

    // #2
    await test.step('Confirm the user was logged in', async () => {
      await expect(app.profile.views.welcomeMessage).toContainText(new RegExp(ENV.user.name, 'i'))
    })
  })

  test('Validate that user can log out @login_logout', async ({ app }) => {
    // #1
    await test.step('Login the user', async () => {
      await app.home.userLogin(ENV.user.email, ENV.user.password)
    })

    // #2
    await test.step('Logout the user', async () => {
      await app.profile.buttons.logout.click()
    })

    // #3
    await test.step('Confirm the user was logged in', async () => {
      await expect(app.home.views.loginContainerHeader).toHaveText('Login to Application')
    })
  })
})
