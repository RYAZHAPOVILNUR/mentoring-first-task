import {createAction, props} from "@ngrx/store";
import {ITodo} from "../../interfaces/itodo";

export const loadTodos = createAction("[Todos] Load Todos");
export const loadTodosSuccess = createAction('[Todos] Load Todos Success', props<{ todos: ITodo[] }>());
export const loadTodosFailure = createAction('Todos] Load Todos Failure', props<{ error: string }>());
export const deleteTodo = createAction('[Todos] Delete Todo', props<{ id: number }>());

