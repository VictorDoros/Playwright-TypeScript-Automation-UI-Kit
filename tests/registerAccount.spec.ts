import { test, expect } from '../fixtures/test.fixture.ts'
import { RandomDataUtil } from '../utils/randomDataGeneration.ts'

test.beforeEach(async ({ app }) => {
  await test.step('Access the application', async () => {
    await app.page.goto('/', { waitUntil: 'domcontentloaded' })
  })
})

test.describe('Register Account @smoke', async () => {
  test('User Registration @register', async ({ app }) => {
    // Create a user
    const user = RandomDataUtil.generateUser()

    // Uses current UTC hour to match greeting logic (time-dependent)
    const hour = new Date().getUTCHours()
    const expectedTextByPeriod = await app.profile.getGreetingByHour(hour, user.firstName)

    await test.step('Open the registration page', async () => {
      await app.home.buttons.signUp.click()
      await expect(app.registration.views.registrationFormTitle).toHaveText('Register to Application')
    })

    await test.step('Complete the registration form and register the user', async () => {
      await app.registration.registerUser(app.page, user.firstName, user.lastName, user.email, user.password)
    })

    await test.step('Confirm user is logged in', async () => {
      await expect(app.profile.views.welcomeMessage).toHaveText(expectedTextByPeriod)
    })
  })
})
