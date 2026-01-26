import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from '../models/todos.model';

export const TodosListActions = createActionGroup({
  source: 'Todos List',
  events: {
    'Load Todos': emptyProps(),
    'Load Todos Success': props<{ todos: Todo[] }>(),
    'Load Todos Failure': props<{ error: unknown }>(),

    'Delete Todo': props<{ todoId: number }>(),
    
  },
  
});
