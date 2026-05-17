import { test, expect } from '../fixtures/test.fixture.ts'
import { ENV } from '../utils/credentials.ts'

test.beforeEach(async ({ app }) => {
  await test.step('Access the application', async () => {
    await app.page.goto('/', { waitUntil: 'domcontentloaded' })
  })
})

test.describe('Login and Logout @smoke', async () => {
  test('Validate that user can log in @login_logout', async ({ app }) => {
    // Uses current UTC hour to match greeting logic (time-dependent)
    const hour = new Date().getUTCHours()
    const expectedTextByPeriod = await app.profile.getGreetingByHour(hour, ENV.user.name)

    await test.step('Login the user', async () => {
      await app.home.userLogin(ENV.user.email, ENV.user.password)
    })

    await test.step('Confirm the user was logged in', async () => {
      await expect(app.profile.views.welcomeMessage).toHaveText(expectedTextByPeriod)
    })
  })

  test('Validate that user can log out @login_logout', async ({ app }) => {
    await test.step('Login the user', async () => {
      await app.home.userLogin(ENV.user.email, ENV.user.password)
    })

    await test.step('Logout the user', async () => {
      await app.profile.buttons.logout.click()
    })

    await test.step('Confirm the user was logged in', async () => {
      await expect(app.home.views.loginContainerHeader).toHaveText('Login to Application')
    })
  })
})
