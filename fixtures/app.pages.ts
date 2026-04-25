import { Page } from '@playwright/test'
import { Home } from '../pages/Home'
import { Registration } from '../pages/Registration'
import { Profile } from '../pages/Profile'
import { CreateNewToDo } from '../pages/CreateNewToDo'

export class AppPages {
  readonly home: Home
  readonly registration: Registration
  readonly profile: Profile
  readonly createNewToDo: CreateNewToDo

  constructor(page: Page) {
    this.home = new Home(page)
    this.registration = new Registration(page)
    this.profile = new Profile(page)
    this.createNewToDo = new CreateNewToDo(page)
  }
}
