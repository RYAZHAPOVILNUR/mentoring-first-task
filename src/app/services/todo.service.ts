import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Todo } from "../interface/todo-interface";



@Injectable({providedIn: 'root'})

export class TodoService {
    todoSubject = new BehaviorSubject<Todo[]>([])
    todos: Todo[] = [];

    setUsers(users: Todo[]) {
        this.todos = users;
        this.todoSubject.next(this.todos);
      }
    
      editUser(editedTodo: Todo) {
        this.todoSubject.next(
          this.todoSubject.value.map((todo) => {
            if (todo.id === editedTodo.id) {
              return editedTodo;
            } else {
              return todo;
            }
          })
        );
      }
    
      createUser(todo: Todo) {
        this.todoSubject.next([...this.todoSubject.value, todo]);
      }
    
      deleteUser(id: number) {
        this.todoSubject.next(
          this.todoSubject.value.filter((item) => item.id !== id)
        );
      }
}