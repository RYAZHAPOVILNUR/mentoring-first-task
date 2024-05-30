import { createFeatureSelector, createSelector } from "@ngrx/store";
import { USERS_FEATURE_KEY, UsersState } from "./users.reducers";

export const userSelector = createFeatureSelector<UsersState>(USERS_FEATURE_KEY)


export const getUserSelector = createSelector(
    userSelector,
    (state: UsersState) => state.loading
);
export const getUsersSuccessSelector = createSelector(
    userSelector,
    (state: UsersState) => state.users
);
export const getUsersFailureSelector = createSelector(
    userSelector,
    (state: UsersState) => state.error
);


export const deleteUserSelector = createSelector(
    userSelector,
    (state: UsersState) => state.loading
);
export const deleteUserSuccessSelector = createSelector(
    userSelector,
    (state: UsersState) => state.users
)
export const deleteUserFailureSelector = createSelector(
    userSelector,
    (state: UsersState) => state.error
)


export const editUserSelector = createSelector(
    userSelector,
    (state: UsersState) => state.loading
)
export const editUserSuccessSelector = createSelector(
    userSelector,
    (state: UsersState) => state.users
)
export const editUserFailureSelector = createSelector(
    userSelector,
    (state: UsersState) => state.error
)


export const createUserSelector = createSelector(
    userSelector,
    (state: UsersState) => state.loading
)
export const createUserSuccessSelector = createSelector(
    userSelector,
    (state: UsersState) => state.users
)
export const createUserFailureSelector = createSelector(
    userSelector,
    (state: UsersState) => state.error
)


export const returnUserSelector = createSelector(
    userSelector,
    (state: UsersState) => state.loading
)
export const returnUserSuccessSelector = createSelector(
    userSelector,
    (state: UsersState) => state.users
)
export const returnUserFailureSelector = createSelector(
    userSelector,
    (state: UsersState) => state.error
)