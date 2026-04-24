import { Page } from '@playwright/test'
import { Home } from '../pages/Home'
import { Registration } from '../pages/Registration'
import { Profile } from '../pages/Profile'
import { CreateNewToDos } from '../pages/CreateNewToDo'

export class AppPages {
  readonly home: Home
  readonly registration: Registration
  readonly profile: Profile
  readonly createNewToDos: CreateNewToDos

  constructor(page: Page) {
    this.home = new Home(page)
    this.registration = new Registration(page)
    this.profile = new Profile(page)
    this.createNewToDos = new CreateNewToDos(page)
  }
}
