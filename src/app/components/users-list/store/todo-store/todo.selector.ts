import { createSelector } from '@ngrx/store';
import { Todo } from '../../../../Interfaces/todo-interface';



interface TodoState{
    todos: Todo[]
}

interface AppState{
    todos: TodoState
}

export let selectTodosFeature = (state: AppState) => state.todos;

export let selectTodos = createSelector(
    selectTodosFeature,
    (state: TodoState) => state.todos
)