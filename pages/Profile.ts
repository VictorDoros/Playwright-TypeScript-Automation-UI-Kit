import { Page, Locator } from '@playwright/test'

class Views {
  readonly welcomeMessage: Locator
  readonly noAvailableToDos: Locator
  readonly todoItems: Locator

  constructor(page: Page) {
    this.welcomeMessage = page.locator('[data-testid="welcome"]')
    this.noAvailableToDos = page.locator('[data-testid="no-todos"]')
    this.todoItems = page.locator('[data-testid="todo-item"]')
  }
}

class Butons {
  readonly logout: Locator
  readonly addNewToDo: Locator
  readonly removeTask: Locator

  constructor(page: Page) {
    this.logout = page.getByText('Logout')
    this.addNewToDo = page.locator('[data-testid="add"]')
    this.removeTask = page.locator('[data-testid="delete"]')
  }
}

class Checkboxes {
  readonly completeTask: Locator

  constructor(page: Page) {
    this.completeTask = page.locator('[data-testid="complete-task"]')
  }
}

export class Profile {
  views: Views
  buttons: Butons
  checkboxes: Checkboxes

  constructor(page: Page) {
    this.views = new Views(page)
    this.buttons = new Butons(page)
    this.checkboxes = new Checkboxes(page)
  }

  /**
   * Get an item from the list by its name
   * @param itemName - Item to intercat
   */
  getTodoItemByName(itemName: string) {
    return this.views.todoItems.filter({ hasText: itemName })
  }

  /**
   * Check a todo item from the list
   * @param itemName - Item to intercat
   */
  async checkTodoItem(name: string) {
    await this.getTodoItemByName(name)
      .locator(this.checkboxes.completeTask)
      .click()
  }

  /**
   * Remove a todo item
   * @param itemName - Item to intercat
   */
  async removeTodoItem(page: Page, name: string) {
    await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes('/tasks') &&
          res.request().method() === 'DELETE' &&
          res.status() === 200,
      ),
      this.getTodoItemByName(name).locator(this.buttons.removeTask).click(),
    ])
  }
}
