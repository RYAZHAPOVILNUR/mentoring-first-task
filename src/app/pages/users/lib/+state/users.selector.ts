import { createFeatureSelector, createSelector } from '@ngrx/store'

export const selectUserState = createFeatureSelector('users')

export const selectUsersCount = createSelector(selectUserState, (state: any) => state.counter)
