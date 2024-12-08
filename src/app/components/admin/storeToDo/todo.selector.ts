import {Todo} from "../components/todo-list/todo-list.component";
import {createSelector} from "@ngrx/store";

interface TodoState{
  todos: Todo[];
}

interface AppState{
  todos: TodoState;
}

export const selectTodosFeature = (state: AppState) => state.todos;

export const selectTodos = createSelector(
  selectTodosFeature,
  (state:TodoState) => state?.todos
)
