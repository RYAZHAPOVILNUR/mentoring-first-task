import { User } from "../../user.model";

export interface UsersStateInterface {
  isLoading: boolean;
  users: User[];
  error: string | null;
}