import {ITodo} from "../../interfaces/itodo";
import {createReducer, on} from "@ngrx/store";
import {deleteTodo, loadTodos, loadTodosFailure, loadTodosSuccess} from "./todos.actions";

export interface TodosState {
  todos: ITodo[],
  loading: boolean,
  error: string | null,
}

export const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
}

export const todosReducer = createReducer(
    initialState,
    on(loadTodos, (state) => ({...state, loading: true})),
    on(loadTodosSuccess, (state, { todos }) => ({ ...state, todos, loading: false })),
    on(loadTodosFailure, (state, { error }) => ({...state, error, loading:false})),
    on(deleteTodo, (state, { id }) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id),
    }))

);
