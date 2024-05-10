import {IUser} from "./user.interface";

export interface IUserState{
  isLoading: boolean;
  users: IUser[];
  errors: string | null;
}
