import { createReducer, on } from "@ngrx/store";
import { TodosActions } from "./todos.actions";
import { TodoState } from "../../app.state";

const initialState: TodoState = {
  todos: [],
  error: null,
};

export const todosReducer = createReducer(
  initialState,
  on(TodosActions.set, (state, payload) => ({
    ...state,
    todos: payload.todos,
    error: null,
  })),
  on(TodosActions.edit, (state, payload) => ({
    ...state,
    todos: state.todos.map((todo) => {
      return todo.id === payload.todo.id ?
      payload.todo :
      todo
    }),
  })),
  on(TodosActions.create, (state, payload) => ({
    ...state,
    todos: [...state.todos, payload.todo],
  })),
  on(TodosActions.delete, (state, payload) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== payload.id),
  })),
  on(TodosActions.error, (state, payload) => ({
    ...state,
    error: payload.error,
  }))
)