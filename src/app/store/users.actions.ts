import {createAction, props} from "@ngrx/store";
import {UserInterface} from "../types/user.interface";
import {userNewDataInterface} from "../types/user-new-data.interface";


export const loadUsers=createAction('Load Users');
export const loadUsersSuccess=createAction(
  'Load Users Success',
  props<{ users: UserInterface[] }>()
);
export const loadUsersStorage=createAction(
  'Load Users Storage',
  props<{ users: UserInterface[] }>()
);

export const updateUser = createAction(
  "[User List Component] Update User",
  props<{userId: number, userNewData: userNewDataInterface}>()
);

export const createUser = createAction(
  "[User List Component] Create User",
  props<{userNewData: userNewDataInterface}>()
);

export const deleteUser = createAction(
  "[User List Component] Delete User",
  props<{ id: number }>()
);
