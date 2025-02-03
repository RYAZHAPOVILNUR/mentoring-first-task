import { createSelector } from "@ngrx/store";
import { TodoState, AppState } from "../../app.state";

export const selectTodosFeature = (state: AppState) => state.todos;

export const selectTodos = createSelector(
  selectTodosFeature,
  (state: TodoState) => state.todos,
);

export const selectError = createSelector(
  selectTodosFeature,
  (state: TodoState) => state.error,
);