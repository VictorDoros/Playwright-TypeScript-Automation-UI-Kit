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

test.describe('Login and Logout @smoke', async () => {
  test('Validate thet user can log in @login_logout', async () => {
    // #1
    await test.step('Login the user', async () => {
      await appPages.home.userLogin(ENV.user.email, ENV.user.password)
    })

    // #2
    await test.step('Confirm the user was logged in', async () => {
      await expect(appPages.profile.views.welcomeMessage).toContainText(
        new RegExp(ENV.user.name, 'i'),
      )
    })
  })

  test('Validate that user can log out @login_logout', async () => {
    // #1
    await test.step('Login the user', async () => {
      await appPages.home.userLogin(ENV.user.email, ENV.user.password)
    })

    // #2
    await test.step('Logout the user', async () => {
      await appPages.profile.buttons.logout.click()
    })

    // #3
    await test.step('Confirm the user was logged in', async () => {
      await expect(appPages.home.views.loginContainerHeader).toHaveText(
        'Login to Application',
      )
    })
  })
})
