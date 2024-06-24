import { createSelector } from "@ngrx/store";

import { IAppState } from "./state";

export const selectFeature = (state: IAppState) => state.users;

export const isLoadingSelector = createSelector(
    selectFeature, 
    (state) => state.isLoading
);

export const usersSelector = createSelector(
    selectFeature, 
    (state) => state.users
);

export const errorSelector = createSelector(
    selectFeature, 
    (state) => state.error
);