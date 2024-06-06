import { ActionReducerMap, createReducer, on } from '@ngrx/store'
import { User } from '../user.model'
import { addUserAction, deleteUserAction, editUserAction, loadUserAction, loadUserSuccessAction } from './users.actions'

export interface UserState { users: User[] }

export const initialState: UserState = { users: [] }

export interface State{
	logic:UserState
}

export const LogicReducer = createReducer(
	initialState,
	on(addUserAction, (state, { user }) => ({
		...state, users: [...state.users, user]
	})),

	on(editUserAction, (state, { id, ...update }) => ({
		...state,
		users: state.users.map(u => u.id === id ? { ...u, ...update } : u)
	})),

	on(deleteUserAction, (state, { id }) => ({
		...state,
		users: state.users.filter(user => user.id !== id)
	})),

	on(loadUserSuccessAction, (state, { users }) => ({
		...state, users
	}))
)

export const reducers: ActionReducerMap<State> = {
	logic:LogicReducer,
}