import { Inject, Injectable } from "@angular/core";
import { Todo } from "./todos-list/todos-list.component";
import { BehaviorSubject } from "rxjs";


@Injectable({providedIn: 'root'})
export class TodoServive {
    private todosSubject$ = new BehaviorSubject<Todo[]>([]);
    todos$ = this.todosSubject$.asObservable();

    setTodos(todos: Todo[]) {
        this.todosSubject$.next(todos);
    }


        editTodo(editedTodo: Todo) {
        this.todosSubject$.next(
            this.todosSubject$.value.map(
             todo => {
                    if(todo.id === editedTodo.id) {
                        return editedTodo;
                    }else {
                        return todo;
                    }
                }
            )
        );
    }


    createTodo(todo: Todo){
      const existingTodo = this.todosSubject$.value.find(
        (currentElement) => currentElement.title === todo.title
      );

      if (existingTodo !== undefined) {
        alert('this todo already exists');
      }else{
        this.todosSubject$.next([...this.todosSubject$.value, todo]);
        alert('todo is created')
      }
    }


    deleteTodo(id:number) {
    this.todosSubject$.next(
       this.todosSubject$.value.filter((todo: Todo) => {
             if(id === todo.id) {
                return false;
             } else {
                return true;
             }
          }
       )
    );
 }

 
}

function todo(value: Todo, index: number, array: Todo[]): value is Todo {
    throw new Error("Function not implemented.");
}
