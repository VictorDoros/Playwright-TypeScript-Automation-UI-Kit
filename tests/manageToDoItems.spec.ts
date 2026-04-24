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

test('Add, check and delete a todo item', async ({ page }) => {
  // #1
  await test.step('Login the user', async () => {
    await appPages.home.userLogin(ENV.user.email, ENV.user.password)
  })

  // #2
  await test.step('Confirm there are no items in the list', async () => {
    await expect(appPages.profile.views.noAvailableToDos).toBeVisible()
  })

  // #3
  await test.step('Click on "+" icon to access the "new" todo page', async () => {
    await appPages.profile.buttons.addNewToDo.click()

    await expect(appPages.createNewToDos.views.createNewToDoPanel).toBeVisible()

    await expect(appPages.createNewToDos.views.createNewToDoHeader).toHaveText(
      'Create a new Todo',
    )
  })

  // #4
  await test.step('Add a new todo item', async () => {
    await appPages.createNewToDos.createTodoItem(page, 'item1')
  })

  // #5
  await test.step('Confirm the item was successfully added', async () => {
    await expect(appPages.profile.views.todoItems).toHaveCount(1)
  })

  // #6
  await test.step('Add another todo item', async () => {
    await appPages.profile.buttons.addNewToDo.click()

    await appPages.createNewToDos.createTodoItem(page, 'item2')
  })

  // #7
  await test.step('Confirm there are two items in the list', async () => {
    await expect(appPages.profile.views.todoItems).toHaveCount(2)
  })

  // #8
  await test.step('Check one item e.g., "item1"', async () => {
    await appPages.profile.checkTodoItem('item1')
  })

  // #9
  await test.step('Confirm that "item1" is checked only', async () => {
    await expect(
      appPages.profile
        .getTodoItemByName('item1')
        .locator(appPages.profile.checkboxes.completeTask),
    ).toBeChecked()

    await expect(
      appPages.profile
        .getTodoItemByName('item2')
        .locator(appPages.profile.checkboxes.completeTask),
    ).not.toBeChecked()
  })

  // #10
  await test.step('Remove one item e.g., "item1"', async () => {
    await appPages.profile.removeTodoItem(page, 'item1')
  })

  // #11
  await test.step('Confirm there is only one item in the list', async () => {
    await expect(appPages.profile.views.todoItems).toHaveCount(1)
  })

  // #12
  await test.step('Remove the remained item', async () => {
    await appPages.profile.removeTodoItem(page, 'item2')
  })

  // #13
  await test.step('Confirm there is no item in the list', async () => {
    await expect(appPages.profile.views.todoItems).toHaveCount(0)
    await expect(appPages.profile.views.noAvailableToDos).toBeVisible()
  })
})
