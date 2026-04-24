import { test, expect } from '@playwright/test'
import { ENV } from '../utils/credentials'
import { AppPages } from '../fixtures/app.pages'

let appPages: AppPages

test.beforeEach(async ({ page }) => {
  appPages = new AppPages(page)

  await test.step('Access the application', async () => {
    await page.goto('/')
  })
})

test('Login and Logout', async () => {
  // #1
  await test.step('Login the user', async () => {
    await appPages.home.userLogin(ENV.user.email, ENV.user.password)
    await expect(appPages.profile.views.welcomeMessage).toContainText(
      new RegExp(ENV.user.firstName, 'i'),
    )
  })

  // #2
  await test.step('Logout the user', async () => {
    await appPages.profile.buttons.logout.click()
    await expect(appPages.home.views.loginContainerHeader).toHaveText(
      'Login to Application',
    )
  })
})
