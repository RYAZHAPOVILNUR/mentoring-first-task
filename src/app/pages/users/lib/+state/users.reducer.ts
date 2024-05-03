import { createFeature, createReducer, on } from '@ngrx/store'
import { usersActions } from './users.actions'
import { IState } from '../../interface/user.interface'

export const initialUserState: IState = {
  Users: [],
  error: null,
  counter: 0
}

export const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialUserState,
    on(usersActions.getUsers, state => ({
      ...state
    })),
    on(usersActions.getUsersSuccess, (state, { users }) => ({
      ...state,
      Users: users
    })),
    on(usersActions.getUsersFailure, (state, { error }) => ({
      ...state,
      error: error
    })),
    on(usersActions.deleteUser, state => ({
      ...state
    })),
    on(usersActions.deleteUserSuccess, (state, { id }) => ({
      ...state,
      Users: state.Users.filter(user => user.id !== id)
    })),
    on(usersActions.deleteUserFailure, (state, { error }) => ({
      ...state,
      error: error
    })),
    on(usersActions.addUser, state => ({
      ...state
    })),
    on(usersActions.addUserSuccess, (state, { userFormData }) => ({
      ...state,
      Users: state.Users.concat({ ...userFormData, id: state.Users.length + 1 })
    })),
    on(usersActions.addUserFailure, (state, { error }) => ({
      ...state,
      error: error
    })),
    on(usersActions.editUser, state => ({
      ...state
    })),
    on(usersActions.editUserSuccess, (state, { user, userFormData }) => ({
      ...state,
      Users: state.Users.map(item => {
        if (item.id !== user.id) {
          return item
        } else {
          return { ...item, name: userFormData.name, email: userFormData.email, username: userFormData.username }
        }
      })
    })),
    on(usersActions.editUserFailure, (state, { error }) => ({
      ...state,
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
