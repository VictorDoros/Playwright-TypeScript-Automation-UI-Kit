import { test, expect } from '@playwright/test'
import { RandomDataUtil } from '../utils/randomDataGeneration'
import { AppPages } from '../fixtures/app.pages'

let appPages: AppPages

test.beforeEach(async ({ page }) => {
  appPages = new AppPages(page)

  await test.step('Access the application', async () => {
    await page.goto('/')
  })
})

test.describe('Register Account @smoke', async () => {
  test('User Registration @register', async ({ page }) => {
    // Create a user
    const user = RandomDataUtil.generateUser()

    // #1
    await test.step('Open the registration page', async () => {
      await appPages.home.buttons.signUp.click()
      await expect(
        appPages.registration.views.registrationFormTitle,
      ).toHaveText('Register to Application')
    })

    // #2
    await test.step('Complete the registration form and register the user', async () => {
      await appPages.registration.registerUser(
        page,
        user.firstName,
        user.lastName,
        user.email,
        user.password,
      )
    })

    // #3
    await test.step('Confirm user is logged in', async () => {
      await expect(appPages.profile.views.welcomeMessage).toContainText(
        user.firstName,
      )
    })
  })
})
