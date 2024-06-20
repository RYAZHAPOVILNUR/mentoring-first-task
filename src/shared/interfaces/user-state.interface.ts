import { User } from "./user.interface";

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string;
}
