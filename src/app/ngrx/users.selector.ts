import { createFeatureSelector, createSelector } from '@ngrx/store'
import { UserState } from './users.reducer'

export const featureSelector = createFeatureSelector<UserState>("logic")

export const UserSelector = createSelector(
	featureSelector,
	state => state.users
)


