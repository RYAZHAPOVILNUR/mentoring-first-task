import { createActionGroup, props } from "@ngrx/store";
import { Todo } from "../../models/todos.model";

export const TodosActions = createActionGroup({
  source: "Todos",
  events: {
    'set': props<{todos: Todo[]}>(),
    'edit': props<{todo: Todo}>(),
    'create': props<{todo: Todo}>(),
    'delete': props<{id: number}>(),
    'error': props<{error: string}>(),
  }
})