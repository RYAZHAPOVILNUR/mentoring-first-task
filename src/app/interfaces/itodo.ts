import {IUser} from "./iuser";
type UserId = IUser|number;
export interface ITodo {
  userId: UserId;
  id: number;
  title: string;
  completed: boolean;
}
