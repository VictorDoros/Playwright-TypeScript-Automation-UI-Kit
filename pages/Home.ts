import { Page, Locator } from '@playwright/test'

class Views {
  readonly loginContainer: Locator
  readonly navBar: Locator
  readonly loginContainerHeader: Locator

  constructor(page: Page) {
    this.loginContainer = page.locator('.login-container')
    this.navBar = page.locator('.iOQdwL')
    this.loginContainerHeader = page.locator('.login-container .header')
  }
}

class Buttons {
  readonly signUp: Locator
  readonly submit: Locator

  constructor(page: Page) {
    this.signUp = page.locator('[href="/signup"]')
    this.submit = page.locator('#submit')
  }
}

class Inputs {
  readonly email: Locator
  readonly password: Locator

  constructor(page: Page) {
    this.email = page.locator('#email')
    this.password = page.locator('#password')
  }
}

export class Home {
  views: Views
  buttons: Buttons
  inputs: Inputs

  constructor(page: Page) {
    this.views = new Views(page)
    this.buttons = new Buttons(page)
    this.inputs = new Inputs(page)
  }

  /**
   * Login the user
   * @param email - Email to enter
   * @param password - Password to enter
   */
  async userLogin(email: string, password: string): Promise<void> {
    await this.inputs.email.fill(email)
    await this.inputs.password.fill(password)

    await this.buttons.submit.click()
  }
}
