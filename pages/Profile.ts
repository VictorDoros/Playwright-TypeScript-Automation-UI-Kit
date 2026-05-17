import { Page, Locator } from '@playwright/test'

class Views {
  readonly welcomeMessage: Locator
  readonly noAvailableTodos: Locator
  readonly todoItems: Locator

  constructor(page: Page) {
    this.welcomeMessage = page.locator('[data-testid="welcome"]')
    this.noAvailableTodos = page.locator('[data-testid="no-todos"]')
    this.todoItems = page.locator('[data-testid="todo-item"]')
  }
}

class Buttons {
  readonly logout: Locator
  readonly addNewTodo: Locator
  readonly removeTask: Locator

  constructor(page: Page) {
    this.logout = page.getByText('Logout')
    this.addNewTodo = page.locator('[data-testid="add"]')
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
  buttons: Buttons
  checkboxes: Checkboxes

  constructor(page: Page) {
    this.views = new Views(page)
    this.buttons = new Buttons(page)
    this.checkboxes = new Checkboxes(page)
  }

  /**
   * Get an item from the list by its name
   * @param itemName - Item to interact
   */
  getTodoItemByName(itemName: string) {
    return this.views.todoItems.filter({ hasText: itemName })
  }

  /**
   * Check a todo item from the list
   * @param itemName - Item to interact
   */
  async checkTodoItem(name: string) {
    await this.getTodoItemByName(name).locator(this.checkboxes.completeTask).click()
  }

  /**
   * Remove a todo item
   * @param itemName - Item to interact
   */
  async removeTodoItem(page: Page, name: string) {
    await Promise.all([
      page.waitForResponse(
        res => res.url().includes('/tasks') && res.request().method() === 'DELETE' && res.status() === 200,
      ),
      this.getTodoItemByName(name).locator(this.buttons.removeTask).click(),
    ])
  }

  /**
   * Returns a greeting message based on the provided hour of the day.
   *
   * The greeting is determined using the following ranges (UTC or local time,
   * depending on the input provided):
   * - 06:00–12:00 → "Good morning"
   * - 12:01–17:00 → "Good afternoon"
   * - Otherwise   → "Time to sleep"
   *
   * @param hour - The hour of the day (0–23)
   * @param name - The user's name to include in the greeting
   * @returns A formatted greeting message for the given time period
   */
  async getGreetingByHour(hour: number, name: string) {
    if (hour >= 6 && hour <= 12) {
      return `Good morning ${name}`
    } else if (hour > 12 && hour <= 17) {
      return `Good afternoon ${name}`
    } else {
      return `Time to sleep ${name}`
    }
  }
}
