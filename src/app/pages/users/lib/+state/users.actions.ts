import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { IUser } from '../../interface/user.interface'

export const usersActions = createActionGroup({
	source: 'Users',
	events: {
		getUsers: emptyProps(),
		deleteUser: props<{ id: number | undefined }>(),
		addUser: props<{ userFormData: IUser }>(),
		editUser: props<{ user: IUser; userFormData: IUser }>(),

		getUsersSuccess: props<{ users: IUser[] }>(),
		deleteUserSuccess: props<{ id: number | undefined }>(),
		addUserSuccess: props<{ userFormData: IUser }>(),
		editUserSuccess: props<{ user: IUser; userFormData: IUser }>(),

		getUsersFailure: props<{ error: any }>(),
		deleteUserFailure: props<{ error: any }>(),
		addUserFailure: props<{ error: any }>(),
		editUserFailure: props<{ error: any }>(),

		increment: emptyProps(),
		decrement: emptyProps(),
		reset: emptyProps()
	}
})
