import { User } from './user.type';

export type UserStateType = {
  isLoading: boolean;
  users: User[];
  errors: string | null;
};

export type AppStateType = {
  users: UserStateType;
};
