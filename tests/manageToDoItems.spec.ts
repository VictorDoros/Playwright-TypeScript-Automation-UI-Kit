import { test, expect } from '../fixtures/test.fixture.ts'
import { ENV } from '../utils/credentials.ts'

test.beforeEach(async ({ page }) => {
  await test.step('Access the application', async () => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
  })
})

test.describe('Manage ToDo Items @regression', async () => {
  test('Add, check and delete a todo item @manageItems', async ({ page, app }) => {
    // #1
    await test.step('Login the user', async () => {
      await app.home.userLogin(ENV.user.email, ENV.user.password)
    })

    // #2
    await test.step('Confirm there are no items in the list', async () => {
      await expect(app.profile.views.noAvailableTodos).toBeVisible()
    })

    // #3
    await test.step('Click on "+" icon to access the "new" todo page', async () => {
      await app.profile.buttons.addNewTodo.click()

      await expect(app.createNewTodo.views.createNewTodoPanelHeader).toBeVisible()

      await expect(app.createNewTodo.views.createNewTodoPanelHeader).toHaveText('Create a new Todo')
    })

    // #4
    await test.step('Add a new todo item', async () => {
      await app.createNewTodo.createTodoItem(page, 'item1')
    })

    // #5
    await test.step('Confirm the item was successfully added', async () => {
      await expect(app.profile.views.todoItems).toHaveCount(1)
    })

    // #6
    await test.step('Add another todo item', async () => {
      await app.profile.buttons.addNewTodo.click()

      await app.createNewTodo.createTodoItem(page, 'item2')
    })

    // #7
    await test.step('Confirm there are two items in the list', async () => {
      await expect(app.profile.views.todoItems).toHaveCount(2)
    })

    // #8
    await test.step('Check one item e.g., "item1"', async () => {
      await app.profile.checkTodoItem('item1')
    })

    // #9
    await test.step('Confirm that "item1" is checked only', async () => {
      await expect(app.profile.getTodoItemByName('item1').locator(app.profile.checkboxes.completeTask)).toBeChecked()

      await expect(
        app.profile.getTodoItemByName('item2').locator(app.profile.checkboxes.completeTask),
      ).not.toBeChecked()
    })

    // #10
    await test.step('Remove one item e.g., "item1"', async () => {
      await app.profile.removeTodoItem(page, 'item1')
    })

    // #11
    await test.step('Confirm there is only one item in the list', async () => {
      await expect(app.profile.views.todoItems).toHaveCount(1)
    })

    // #12
    await test.step('Remove the remained item', async () => {
      await app.profile.removeTodoItem(page, 'item2')
    })

    // #13
    await test.step('Confirm there is no item in the list', async () => {
      await expect(app.profile.views.todoItems).toHaveCount(0)
      await expect(app.profile.views.noAvailableTodos).toBeVisible()
    })
  })
})
