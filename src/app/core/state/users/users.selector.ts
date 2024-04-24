import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserModel } from '../../../shared/types/users-types.type';

const getuserstate = createFeatureSelector<UserModel>('Users')

export const getUserList = createSelector(getuserstate, (state) => { return state.list })
export const getEditdata = createSelector(getuserstate, (state) => { return state.editdata })