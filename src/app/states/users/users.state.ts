import {User} from "../../users.interface";

export interface UsersState {
  users: User[];
  loading: boolean;
  error?: string;
}
