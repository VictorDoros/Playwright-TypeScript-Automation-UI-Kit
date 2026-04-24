import { test, expect } from '@playwright/test'
import { AppPages } from '../fixtures/app.pages'

let appPages: AppPages

test.beforeEach(async ({ page }) => {
  appPages = new AppPages(page)

  await test.step('Access the application', async () => {
    await page.goto('/')
  })
})

test('Loading the app', async ({ page }) => {
  await expect(page).toHaveTitle('QAcart Todo App - Login page')

  await expect(appPages.home.views.loginContainer).toBeVisible()

  await expect(appPages.home.views.navBar).toBeVisible()
})
