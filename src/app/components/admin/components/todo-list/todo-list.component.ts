import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {AsyncPipe, NgFor} from "@angular/common";
import {TodoCardComponent} from "./todo-card/todo-card.component";
import {TodosService} from "../../services/todos.service";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {UsersActions} from "../store/users.actions";
import {TodosAction} from "../../storeToDo/todos.action";
import {selectUsers} from "../store/users.selectors";
import {selectTodos} from "../../storeToDo/todo.selector";
import {EditTodoDialogComponent} from "./edit-todo-dialog/edit-todo-dialog.component";


export interface Todo{
  userId: number;
  id: number;
  title: string;
  completed: boolean
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgFor, TodoCardComponent, AsyncPipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  todoApiService = inject(ApiService);
  todoService = inject(TodosService)
  url: string = 'https://jsonplaceholder.typicode.com/todos';
  readonly dialog = inject(MatDialog);
  private readonly store = inject(Store);
  public readonly todos$ = this.store.select(selectTodos);

  constructor() {
    this.todoApiService.getData().subscribe(
      (response: any) => {
        this.store.dispatch(TodosAction.set({todos: response}))
        this.todoService.setTodos(response)

      }
    )
  }

  deleteTodo(todoId: number){
    this.todoService.deleteTodo(todoId);
    this.store.dispatch(TodosAction.delete({id: todoId}))
  }

  openDialogTodo(todo?: Todo){
    this.dialog.open(EditTodoDialogComponent,
      {data: {todo: todo}
      }).afterClosed().subscribe(editResult => {
        console.log('Модалка закрылась',editResult)

      if(editResult) {
        if(todo){
          this.store.dispatch(TodosAction.edit({
            todo: {
              id: todo.id,
              title: editResult.title,
              userId: editResult.userId,
              completed: editResult.completed
            }

          }))
        } else {
          this.todoService.createTodo({
            id: new Date().getTime(),
            title: editResult.title,
            userId: editResult.userId,
            completed: editResult.completed
          })
          this.store.dispatch(TodosAction.create({
            todo: {
              id: new Date().getTime(),
              title: editResult.title,
              userId: editResult.userId,
              completed: editResult.completed
            }
          }))
        }

      }
    })
    // this.todoService.createTodo({
    //   id: new Date().getTime(),
    //   title: formData.title,
    //   userId: formData.userId,
    //   completed: formData.completed
    // })
  }

  editTodo(formData: Todo){
    return this.todoService.editTodos(formData)
  }

}
