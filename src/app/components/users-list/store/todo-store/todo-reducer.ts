import { ActionReducer, createReducer, on } from '@ngrx/store';
import { Todo } from '../../../../Interfaces/todo-interface';
import { TodoActions } from './todo-actions';

let initialState: { todos: Todo[] } = {
  todos: [],
};

export let todoReducer = createReducer(
  initialState,
  on(TodoActions.set, (state, payload) => ({
    ...state,
    todos: payload.todos
    })),
  on(TodoActions.edit, (state, payload) => ({
    ...state,
    todos: state.todos.map((todo) => {
      if (todo.id === payload.todo.id) {
        return payload.todo;
      } else {
        return todo;
      }
    }),
    
  })), 
  on(TodoActions.create, (state, payload) => ({
    ...state,
    todos: [...state.todos, payload.todo],
  })),
  on(TodoActions.delete, (state, payload) => ({
    ...state, 
    todos: state.todos.filter((todo) => todo.id !== payload.id)
  }))
  
);


export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
      console.log('Action:', action); // Логируем действие
      console.log('State before:', state); // Логируем состояние до изменения
      const nextState = reducer(state, action);
      console.log('State after:', nextState); // Логируем состояние после изменения
      return nextState;
    };
  }