import { Page } from '@playwright/test'
import { Home } from '../pages/Home.ts'
import { Registration } from '../pages/Registration.ts'
import { Profile } from '../pages/Profile.ts'
import { CreateNewTodo } from '../pages/CreateNewToDo.ts'

export class AppPages {
  readonly page: Page

  readonly home: Home
  readonly registration: Registration
  readonly profile: Profile
  readonly createNewTodo: CreateNewTodo

  constructor(page: Page) {
    this.page = page

    this.home = new Home(page)
    this.registration = new Registration(page)
    this.profile = new Profile(page)
    this.createNewTodo = new CreateNewTodo(page)
  }
}
