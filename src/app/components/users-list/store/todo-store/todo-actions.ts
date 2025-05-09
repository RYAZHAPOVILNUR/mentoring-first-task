import { createActionGroup, props } from "@ngrx/store";
import { Todo } from "../../../../Interfaces/todo-interface";


export let TodoActions = createActionGroup({
    source: 'Todo',
    events: {
        'set': props<{todos: Todo[]}>(),
        
        'edit': props<{todo: Todo}>(),
        
        'create': props<{todo: Todo}>(),
        
        'delete': props<{id: number}>(),
    }
    
})