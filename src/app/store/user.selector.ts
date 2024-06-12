import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StateInterface } from "./user.interface";
import { InitialState } from "@ngrx/store/src/models";
import { UserState } from "./user.reducer";


export const featureSelector = createFeatureSelector<UserState>('user')
export const loadingSelector = createSelector(featureSelector, (state)=>state.isLoading)
export const usersSelector = createSelector(featureSelector, (state)=>state.users)
