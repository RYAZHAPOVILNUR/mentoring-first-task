import { createReducer, on } from '@ngrx/store';
import { TodosListActions } from './todos-list.actions';
import { Todo } from '../models/todos.model';

export const TODOS_LIST_FEATURE_KEY = 'todosList';

export interface TodosListState {
  todos: Todo[];
  loading: boolean;
  error: unknown | null;
}

export const initialState: TodosListState = {
  todos: [],
  loading: false,
  error: null,
};

export const todosListReducer = createReducer(
  initialState,

  on(TodosListActions.loadTodos, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TodosListActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos: todos,
    loading: false,
  })),

  on(TodosListActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

    on(TodosListActions.deleteTodo, (state, { todoId }) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== todoId),
  })),

    on(TodosListActions.editTodo, (state, { todo }) => ({
    ...state,
    todos: state.todos.map(t => t.id === todo.id ? todo : t),
  })),


);