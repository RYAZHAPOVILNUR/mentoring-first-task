import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TODOS_LIST_FEATURE_KEY, TodosListState } from './todos-list.reducer';

export const selectTodosListState =
  createFeatureSelector<TodosListState>(TODOS_LIST_FEATURE_KEY);

export const selectTodos = createSelector(
  selectTodosListState,
  (state) => state.todos
);

export const selectTodosLoading = createSelector(
  selectTodosListState,
  (state) => state.loading
);

export const selectTodosError = createSelector(
  selectTodosListState,
  (state) => state.error
);  