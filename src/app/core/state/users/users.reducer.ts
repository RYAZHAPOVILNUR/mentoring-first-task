import { createReducer, on } from '@ngrx/store'
import { addUserSuccess, deleteUserSuccess, filteredUsers, getUserSuccess, loadUserFail, loadUserSuccess, updateUserSuccess } from './users.actions'
import { UserModel } from '../../../shared/types/users-types.type'

export const userState: UserModel = {
  list: [],
  errormessage: '',
  editdata: {
    id: 0,
    name: '',
    email: '',
    phone: '',
    company: {
      name: '',
    }
  },
  filterName: ''
}

const userReducer = createReducer(userState,
  on(loadUserSuccess, (state, action) => {
    return {
      ...state,
      list: action.list,
      errormessage: '',
      editdata: {
        id: 0,
        name: '',
        email: '',
        phone: '',
        company: {
          name: '',
        }
      }
    }
  }),

  on(loadUserFail, (state, action) => {
    return {
      ...state,
      list: [],
      errormessage: action.errormessage
    }
  }),

  on(getUserSuccess, (state, action) => {
    return {
      ...state,
      errormessage: '',
      editdata: action.obj,
    }
  }),

  on(deleteUserSuccess, (state, action) => {
    let _newdate = state.list.filter(o => o.id != action.id)
    return {
      ...state,
      list: _newdate,
      errormessage: ''
    }
  }),

  on(updateUserSuccess, (state, action) => {
    return {
      ...state,
      list: state.list.map(item => item.id == action.inputdata.id ? action.inputdata : item),
      errormessage: ''
    }
  }),

  on(addUserSuccess, (state, action) => {
    return {
      ...state,
      list: [...state.list, action.inputdata],
      errormessage: ''
    }
  }),

  on(filteredUsers, (state, action) => {
    if (action.name.trim() === '') {
      return {
        ...state,
        list: state.list,
        errormessage: '',
        filterName: ''
      };
    }
    return {
      ...state,
      list: state.list,
      errormessage: '',
      filterName: action.name
    };
  }),


)

export function UserReducer(state: any, action: any) {
  return userReducer(state, action)
}