import { Injectable, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { usersActions } from './users.actions'
import { IUser } from '../../interface/user.interface'
import * as UsersSelectors from './users.selector'

@Injectable({ providedIn: 'root' })
export class UserFacade {
	private readonly store = inject(Store)

	counter$ = this.store.select(UsersSelectors.selectUsersCount)

	getUser() {
		this.store.dispatch(usersActions.getUsers())
	}

	deleteUser(id: number | undefined) {
		this.store.dispatch(usersActions.deleteUser({ id }))
	}

	addUser(userFormData: IUser) {
		this.store.dispatch(usersActions.addUser({ userFormData }))
	}

	editUser(user: IUser, userFormData: IUser) {
		this.store.dispatch(usersActions.editUser({ user, userFormData }))
	}

	increment() {
		this.store.dispatch(usersActions.increment())
	}
	decrement() {
		this.store.dispatch(usersActions.decrement())
	}
	reset() {
		this.store.dispatch(usersActions.reset())
	}
}
