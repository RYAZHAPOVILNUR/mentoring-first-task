import {IUser} from "../../models/user.interface";
import {IUserState} from "../../models/user-state.interface";

export const initialState: IUserState = {
  isLoading: false,
  users: [],
  errors: null,
};
