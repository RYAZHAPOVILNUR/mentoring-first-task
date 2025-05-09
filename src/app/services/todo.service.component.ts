import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../Interfaces/todo-interface';

@Injectable({ providedIn: 'root' })
export class TodoUserComponent {
  
  todoSubject = new BehaviorSubject<Todo[]>([]);

  setTodo(todos: Todo[]) {
    this.todoSubject.next(todos);
  }

  editedTodo(edTodo: Todo) {
    this.todoSubject.next(
      this.todoSubject.value.map((todo) => {
        if (todo.id == edTodo.id) {
          return edTodo;
        } else {
          return todo;
        }
      })
    );
  }

  deletedTodo(id: string) {
    this.todoSubject.next(
      this.todoSubject.value.filter((item) => {
        if (id === item.title) {
          return false;
        } else {
          return true;
        }
      })
    );
  }

  createTodo(todo: Todo) {
    this.todoSubject.next([...this.todoSubject.value, todo]);
  }
}
