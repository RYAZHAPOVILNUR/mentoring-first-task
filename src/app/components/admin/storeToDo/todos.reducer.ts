import {Todo} from "../components/todo-list/todo-list.component";
import {createReducer, on} from "@ngrx/store";
import {UsersActions} from "../components/store/users.actions";
import {TodosAction} from "./todos.action";
import {state} from "@angular/animations";


const initialState: {todos: Todo[]} = {
  todos: []
}

export const todoReducer = createReducer(
  initialState,
  on(TodosAction.set,(state,payload) => ({
    ...state,
    todos: payload.todos})),
  on(TodosAction.create,(state,payload) => ({
    ...state,
    todos: [...state.todos,payload.todo]})),
  on(TodosAction.edit,(state,payload) => ({
    ...state,
      todos: state.todos.map((todo) => {
        if(todo.id === payload.todo.id){
          return payload.todo;
        } else {
          return todo
        }
    })
  })),
  on(TodosAction.delete,(state,payload) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== payload.id)
  }))
)
