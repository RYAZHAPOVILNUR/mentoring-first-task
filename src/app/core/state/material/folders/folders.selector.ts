import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserModel } from '../../../shared/types/users-types.type';

const getuserstate = createFeatureSelector<UserModel>('Users')

export const getUserList = createSelector(getuserstate, (state) => { return state.list })
export const getEditdata = createSelector(getuserstate, (state) => { return state.editdata })

export const getFilteredUsersList = createSelector(getuserstate, (state) => {
  if (state.filterName == '') {
    return state.list
  }
  else return state.list.filter(user => user.name.toLowerCase().includes(state.filterName.toLowerCase()))
})