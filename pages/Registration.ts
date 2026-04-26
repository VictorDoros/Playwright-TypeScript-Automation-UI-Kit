import { Page, Locator } from '@playwright/test'

class Inputs {
  readonly firstName: Locator
  readonly lastName: Locator
  readonly email: Locator
  readonly password: Locator
  readonly confirmPassword: Locator

  constructor(page: Page) {
    this.firstName = page.locator('[data-testid="first-name"]')
    this.lastName = page.locator('[data-testid="last-name"]')
    this.email = page.locator('[data-testid="email"]')
    this.password = page.locator('[data-testid="password"]')
    this.confirmPassword = page.locator('[data-testid="confirm-password"]')
  }
}

class Buttons {
  readonly submit: Locator

  constructor(page: Page) {
    this.submit = page.locator('[data-testid="submit"]')
  }
}

class Views {
  readonly registrationFormTitle: Locator

  constructor(page: Page) {
    this.registrationFormTitle = page.locator('.cQlBkf [data-testid="header"]')
  }
}

export class Registration {
  inputs: Inputs
  buttons: Buttons
  views: Views

  constructor(page: Page) {
    this.inputs = new Inputs(page)
    this.buttons = new Buttons(page)
    this.views = new Views(page)
  }

  /**
   * Check the registration form is rendered
   * @param firstName - First name to enter
   * @param lastName - Last name to enter
   * @param email - Email to enter
   * @param password - Password to enter
   */
  async completeRegistrationForm(firstName: string, lastName: string, email: string, password: string): Promise<void> {
    await this.inputs.firstName.fill(firstName)
    await this.inputs.lastName.fill(lastName)
    await this.inputs.email.fill(email)
    await this.inputs.password.fill(password)
    await this.inputs.confirmPassword.fill(password)

    await this.buttons.submit.click()
  }

  /**
   * Register a new user
   * @param firstName - First name to enter
   * @param lastName - Last name to enter
   * @param email - Email to enter
   * @param password - Password to enter
   */
  async registerUser(page: Page, firstName: string, lastName: string, email: string, password: string) {
    await Promise.all([page.waitForURL('**/todo'), this.completeRegistrationForm(firstName, lastName, email, password)])
  }
}
