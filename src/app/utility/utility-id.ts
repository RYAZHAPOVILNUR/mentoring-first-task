import { User } from '../interface/users.interface';

export const createId = (users: User[]) => {
  return Math.max(...users.map((user) => user.id)) + 1;
};