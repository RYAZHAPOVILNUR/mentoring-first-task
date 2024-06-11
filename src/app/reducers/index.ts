import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { UsersState, usersReducer } from './users.reducer';

export interface State {
  usersState: UsersState;
}

export const reducers: ActionReducerMap<State> = {
  usersState: usersReducer,
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
