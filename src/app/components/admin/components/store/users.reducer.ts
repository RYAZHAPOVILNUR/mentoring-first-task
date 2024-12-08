import {User} from "../users-list/users-list.component";
import {createReducer, on, props} from "@ngrx/store";
import {UsersActions} from "./users.actions";


const initialState: {users: User[]} = {
  users: []
}

export const userReducer = createReducer(
  initialState,
  on(UsersActions.set, (state,payload) => ({
    ...state,
    users: payload.users,
    status: 'loaded!'
  })),
  on(UsersActions.edit, (state, payload) => ({
    ...state,
    users: state.users.map((user) => {
      if (user.id === payload.user.id) {
        return payload.user;
      } else {
        return user;
      }
    })
  })),
  on(UsersActions.delete, (state, payload) => ({
    ...state,
    users: state.users.filter((user) => user.id !== payload.id)
  })),
  on(UsersActions.create, (state, payload) => ({
    ...state,
    users: [...state.users, payload.user]
  })),
  on(UsersActions.searchByName, (state, payload) => ({
    ...state,
    users: state.users.filter((user) => {
      if(payload.name.length){
        return user.name.toLowerCase().includes(payload.name.toLowerCase())
      } else {
        console.log(1)
        return user
      }
    })
  })),
  on(UsersActions.deleteAll, (state, payload) => ({
    ...state,
    users: []
  })),
  on(UsersActions.loadUser, (state) => ({
    ...state,
    status: 'loading...' as const
  }))
)
