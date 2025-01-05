import { createFeatureSelector } from '@ngrx/store';
import { createSelector } from '@ngrx/store';
import { UserState } from './reducer';
import { USER_KEY } from '../NGRX/reducer';

export const featureSelector = createFeatureSelector<UserState>(USER_KEY);

export const usersSelector = createSelector(
  featureSelector,
  (state) => state.users
);

export const loadingSelector = createSelector(
  featureSelector,
  (state) => state.loading
);
