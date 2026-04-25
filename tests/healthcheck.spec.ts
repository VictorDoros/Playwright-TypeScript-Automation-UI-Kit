import { test, expect } from '@playwright/test'
import { AppPages } from '../fixtures/app.pages'

let appPages: AppPages

test.beforeEach(async ({ page }) => {
  appPages = new AppPages(page)

  await test.step('Access the application', async () => {
    await page.goto('/')
  })
})

test.describe('Health Check @smoke', async () => {
  test('Loading the app @healthcheck', async ({ page }) => {
    // #1
    await test.step('Confirm the correct title of the page is displayed', async () => {
      await expect(page).toHaveTitle('QAcart Todo App - Login page')
    })

    // #2
    await test.step('Confirm the login container is displayed', async () => {
      await expect(appPages.home.views.loginContainer).toBeVisible()
    })

    // #3
    await test.step('Confirm the presence of nav bar', async () => {
      await expect(appPages.home.views.navBar).toBeVisible()
    })
  })
})
