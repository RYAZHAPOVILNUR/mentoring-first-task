import { createAction, props } from '@ngrx/store'
import { User } from '../user.model'

export const deleteUserAction = createAction("[LOGIC] deleteUserAction",
	props<{ id: number }>())

export const editUserAction = createAction("[LOGIC] editUserAction",
	props<{ id: number }>())

export const addUserAction = createAction("[LOGIC] addUserAction",
	props<{ user: User }>())

export const loadUserAction = createAction("[LOGIC] loadUserAction")

export const loadUserSuccessAction = createAction(
	"[LOGIC]loadUserActionSuccess", props<{ users: User[] }>()
)

export const loadUserFailureAction = createAction(
	"[LOGIC] Load User Failure", props<{ error: any }>()
);