import { createReducer, on } from '@ngrx/store';
import { TodosActions } from './todo.actions';
import { Todo } from '../../interfaces/todos.interface';

export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error?: string;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
};

export const todoReducer = createReducer<TodosState>(
  initialState,

  on(TodosActions.load, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),

  on(TodosActions.loadSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false,
  })),

  on(TodosActions.loadFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TodosActions.edit, (state, { todo: Todo }) => ({
    ...state,
    todos: state.todos.map((todo: Todo) => todo.id === Todo.id ? Todo : todo),
  })),
  on(TodosActions.create, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
  })),
  on(TodosActions.delete, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo: Todo) => todo.id !== id),
  })),
);
