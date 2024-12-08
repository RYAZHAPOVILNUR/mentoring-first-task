import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Todo} from "../components/todo-list/todo-list.component";

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private todosSubject$ = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject$.asObservable();
  setTodos(response: Todo[]){
    this.todosSubject$.next(response)
  }

  editTodos(editedTodo: Todo){
    this.todosSubject$.next(
      this.todosSubject$.value.map(
         item => {
          if(item.id === editedTodo.id){
            return editedTodo
          } else {
            return item
          }
        }
      )
    )
  }

  createTodo(todo: Todo){
    const existingTodo = this.todosSubject$.value.find((item: Todo) => item.title === todo.title);
    if(existingTodo === undefined){
      this.todosSubject$.next([...this.todosSubject$.value,todo]);
      alert('ЗАДАЧА УСПЕШНО ДОБАВЛЕНА')
    } else {
      alert('ЗАДАЧА УЖЕ СУЩЕСТВУЕТ')
    }

  }

  deleteTodo(id: number){
    this.todosSubject$.next(
      this.todosSubject$.value.filter(
        (item: Todo) => item.id !== id
      )
    )
  }
}
