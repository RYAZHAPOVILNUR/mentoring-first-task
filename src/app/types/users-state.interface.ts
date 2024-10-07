import {UserInterface} from "./user.interface";

export interface UsersStateInterface {
  users: UserInterface[];
  error: string | null;
}
