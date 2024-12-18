import {User} from "../../models/user";
import {createReducer, on} from "@ngrx/store";
import {UsersActions} from "./users.action";


const initialState: {users: User[],status?: string} = {
  users: []
}

export const userReducer = createReducer(
  initialState,
  on(UsersActions.loadUser, (state,payload) => ({
    users: state.users,
    status: payload.text,
  })),
  on(UsersActions.setUsers,(state,payload) => ({
    users: payload.users,
    status: "setSuccess"
  })),
  on(UsersActions.deleteUser, (state,payload) => ({
    users: state.users.filter(user => user.id !== payload.userId)
  })),
  on(UsersActions.createUser, (state,payload) => ({
    users: [...state.users,payload.user],
    status: "createSuccess"
  })),
  on(UsersActions.editUser, (state,payload) => ({
    users: state.users.map((user) => {
      if(user.id === payload.editedUser.id) {
        return payload.editedUser;
      } else {
        return user;
      }
    }),
  }))
)
