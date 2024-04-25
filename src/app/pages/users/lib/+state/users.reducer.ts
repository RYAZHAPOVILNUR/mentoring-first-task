import { createFeature, createReducer, on } from '@ngrx/store'
import { usersActions } from './users.actions'
import { IState } from '../../interface/user.interface'

export const initialUserState: IState = {
	Users: [],
	status: 'init',
	error: null,
	counter: 0
}

export const usersFeature = createFeature({
	name: 'users',
	reducer: createReducer(
		initialUserState,
		on(usersActions.addUser, state => ({
			...state,
			status: 'loading' as const
		})),
		on(usersActions.addUserFailure, (state, { error }) => ({
			...state,
			status: 'error' as const,
			error: error
		})),
		on(usersActions.increment, state => ({
			...state,
			counter: state.counter + 1
		})),
		on(usersActions.decrement, state => ({
			...state,
			counter: state.counter - 1
		})),
		on(usersActions.reset, state => ({
			...state,
			counter: 0
		}))
	)
})
