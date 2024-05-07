import {AppState} from '../../app.state'
import {createSelector} from '@ngrx/store'

export const selectUsers = (state: AppState) => state.users

export const selectAllUsers = createSelector(selectUsers, (users) => users)
