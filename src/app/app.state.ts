import { Todo } from "./models/todos.model";
import { User } from "./models/user.interface";

export interface UserState {
  users: User[],
  error: string | null,
};

export interface TodoState {
  todos: Todo[],
  error: string | null,
}

export interface AppState {
  users: UserState,
  todos: TodoState,
};