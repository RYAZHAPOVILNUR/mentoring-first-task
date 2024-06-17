import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { USERS_FEATURE_KEY, usersReducer } from '../state/users.reducer';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  [USERS_FEATURE_KEY]: usersReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
