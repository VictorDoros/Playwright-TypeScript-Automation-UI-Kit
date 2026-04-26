import { test, expect } from '../fixtures/test.fixture'
import { RandomDataUtil } from '../utils/randomDataGeneration'

test.beforeEach(async ({ page }) => {
  await test.step('Access the application', async () => {
    await page.goto('/')
  })
})

test.describe('Register Account @smoke', async () => {
  test('User Registration @register', async ({ page, app }) => {
    // Create a user
    const user = RandomDataUtil.generateUser()

    // #1
    await test.step('Open the registration page', async () => {
      await app.home.buttons.signUp.click()
      await expect(app.registration.views.registrationFormTitle).toHaveText('Register to Application')
    })

    // #2
    await test.step('Complete the registration form and register the user', async () => {
      await app.registration.registerUser(page, user.firstName, user.lastName, user.email, user.password)
    })

    // #3
    await test.step('Confirm user is logged in', async () => {
      await expect(app.profile.views.welcomeMessage).toContainText(user.firstName)
    })
  })
})
