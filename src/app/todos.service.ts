import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './todos-list/todos.interface';

@Injectable({ providedIn: 'root' })
export class TodosService {
  private todosSubject$ = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject$.asObservable();

  setTodos(todos: Todo[]) {
    this.todosSubject$.next(todos);
  }

  editTodo(editTodo: Todo) {
    this.todosSubject$.next(
      this.todosSubject$.value.map((todo:Todo) => {
        if (todo.id === editTodo.id) {
          return editTodo
        } else {
          return todo
        }
      })
    );
  }

  createTodo(todo: Todo) {
    this.todosSubject$.next([...this.todosSubject$.value, todo]);
  }

  deleteTodo(id: number) {
    this.todosSubject$.next(
      this.todosSubject$.value.filter((item) => item.id !== id)
    )
  }
}