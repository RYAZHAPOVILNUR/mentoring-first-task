import {createSelector} from "@ngrx/store";
import {AppState} from "../types/app-state.interface";

export const selectFeature = (state: AppState) => state.users;

export const getUsersSelector = createSelector(
  selectFeature,
  (state) => state.users
);
