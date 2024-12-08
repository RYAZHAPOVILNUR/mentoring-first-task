import {createActionGroup, props} from "@ngrx/store";
import {User} from "../components/users-list/users-list.component";
import {Todo} from "../components/todo-list/todo-list.component";


export const TodosAction = createActionGroup({
  source: "Todo",
  events: {
    "set": props<{todos: Todo[]}>(),
    "edit": props<{todo: Todo}>(),
    "create": props<{todo: Todo}>(),
    "delete": props<{id: number}>()
  }
})
