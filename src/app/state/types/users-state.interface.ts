import { User } from "../../user.model";

type TLoadingStatus = 'init' | 'loading' | 'loaded' | 'error';

export interface UsersStateInterface {
  status: TLoadingStatus;
  users: User[];
  error: string | null;
}