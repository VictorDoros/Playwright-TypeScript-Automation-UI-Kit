import { Page, Locator } from '@playwright/test'

class Views {
  readonly createNewTodoPanelHeader: Locator

  constructor(page: Page) {
    this.createNewTodoPanelHeader = page.locator('[data-testid="header"]')
  }
}

class Inputs {
  readonly todoItem: Locator

  constructor(page: Page) {
    this.todoItem = page.locator('[data-testid="new-todo"]')
  }
}

class Butons {
  readonly submitNewTaks: Locator

  constructor(page: Page) {
    this.submitNewTaks = page.locator('[data-testid="submit-newTask"]')
  }
}

export class CreateNewTodo {
  views: Views
  inputs: Inputs
  buttons: Butons

  constructor(page: Page) {
    this.views = new Views(page)
    this.inputs = new Inputs(page)
    this.buttons = new Butons(page)
  }

  /**
   * Create a todo item
   * @param itemName - Item to be created
   */
  async createTodoItem(page: Page, itemName: string) {
    await this.inputs.todoItem.fill(itemName)

    await Promise.all([
      page.waitForURL('**/todo'),
      this.buttons.submitNewTaks.click(),
    ])
  }
}
