import { test as base } from '@playwright/test'
import { AppPages } from './app.pages.ts'

type Fixtures = {
  app: AppPages
}

export const test = base.extend<Fixtures>({
  app: async ({ page }, use) => {
    const appPages = new AppPages(page)
    await use(appPages)
  },
})

export const expect = test.expect
