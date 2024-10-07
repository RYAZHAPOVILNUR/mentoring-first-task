import {createReducer, on} from "@ngrx/store";
import {createUser, deleteUser, loadUsers, loadUsersStorage, loadUsersSuccess, updateUser} from "./users.actions";
import {UsersStateInterface} from "../types/users-state.interface";


const initialState: UsersStateInterface = {
  users: [],
  error: null,
}

export const usersReducer = createReducer(
  initialState,
  on(loadUsers, (state) => {
    return {
      ...state,
    };
  }),
  on(loadUsersSuccess, (state, action) => {
    return {
      ...state,
      users: action.users
    };
  }),
  on(loadUsersStorage, (state, action) => {
    return {
      ...state,
      users: action.users
    };
  }),
  on(deleteUser, (state, action) => {
    return {
      ...state,
      users: state.users.filter(user => user.id !== action.id)
    };
  }),

  on(createUser, (state, action) => {
    let newUser = {
      id: Number(new Date()),
      name: 'string',
      username: action.userNewData.name,
      email: 'string',
      address: {
        street: 'string',
        suite: 'string',
        city: 'string',
        zipcode: 'string',
        geo: {
          lat: 'string',
          lng: 'string'
        }
      },
      phone: action.userNewData.phone,
      website: action.userNewData.website,
      company: {
        name: action.userNewData.company,
        catchPhrase: 'string',
        bs: 'string'
      }
    }
    return {
      ...state,
      users: [newUser, ...state.users]
    };
  }),

  on(updateUser, (state, action) => {
    return {
      ...state,
      users: state.users.map(user => {
        if (user.id === action.userId) {
          let newUser = {
            ...user,
            username: action.userNewData.name,
            website: action.userNewData.website,
            phone: action.userNewData.phone,
            company: {...user.company, name: action.userNewData.company}
          }
          return newUser;
        } else {
          return user;
        }
      })
    };
  }),
)

