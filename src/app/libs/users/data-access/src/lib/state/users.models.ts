import { EntityState } from "@ngrx/entity";
import { IUser } from "../../../../../../shared/models/user.models";

type TLoadingStatus = 'init' | 'loading' | 'loaded' | 'error';

export interface IUsersStateInterface extends EntityState<IUser> {
  status: TLoadingStatus,
  error: string | null;
}

export enum UsersActionTypes {
  LoadUsers = '[Users Page] Load Users',
  LoadUsersSuccess = '[Users Page] Load Users Success',
  LoadUsersFailure = '[Users Page] Load Users Failure',

  AddUser = '[Users Page] Add User',
  AddUserSuccess = '[Users Page] Add User Success',
  AddUserFailure = '[Users Page] Add User Failure',

  DeleteUser = '[Users Page] Delete User',
  DeleteUsersSuccess = '[Users Page] Delete User Success',
  DeleteUsersFailure = '[Users Page] Delete User Failure',

  EditUser = '[Users Page] Edit User',
  EditUserSuccess = '[Users Page] Edit User Success',
  EditUserFailure = '[Users Page] Edit User Failure',

  SetUsers = '[Users Page] Set Users',
  SetUsersSuccess = '[Users Page] Set Users Success',
  SetUsersFailure = '[Users Page] Set Users Failure',
}

