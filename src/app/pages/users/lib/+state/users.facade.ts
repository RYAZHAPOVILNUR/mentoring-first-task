import { Injectable, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { usersActions } from './users.actions'
import { IUser } from '../../interface/user.interface'
import * as UsersSelectors from './users.selector'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class UserFacade {
  private readonly store = inject(Store)

  public Users$: Observable<IUser[]> = this.store.select(UsersSelectors.usersArray)

  getUsers() {
    this.store.dispatch(usersActions.getUsers())
  }

  deleteUser(id: number): void {
    this.store.dispatch(usersActions.deleteUserSuccess({ id }))
  }

  addUser(userFormData: IUser): void {
    this.store.dispatch(usersActions.addUserSuccess({ userFormData }))
  }

  editUser(user: IUser, userFormData: IUser): void {
    this.store.dispatch(usersActions.editUserSuccess({ user, userFormData }))
  }
}
