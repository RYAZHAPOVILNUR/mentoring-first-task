import { User } from '../user.model';


export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}
