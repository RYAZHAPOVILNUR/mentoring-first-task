import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {AsyncPipe, NgFor} from "@angular/common";
import {TodoCardComponent} from "./todo-card/todo-card.component";
import {TodosService} from "../../services/todos.service";
import {CreateTodoFormComponent} from "./create-todo-form/create-todo-form.component";
import {MatDialog} from "@angular/material/dialog";


export interface Todo{
  userId: number;
  id: number;
  title: string;
  completed: boolean
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgFor, TodoCardComponent, AsyncPipe, CreateTodoFormComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  todoApiService = inject(ApiService);
  todoService = inject(TodosService)
  url: string = 'https://jsonplaceholder.typicode.com/todos';
  readonly dialog = inject(MatDialog);

  constructor() {
    this.todoApiService.getData(this.url).subscribe(
      (response: any) => this.todoService.setTodos(response)
    )
  }

  deleteTodo(todoId: number){
    this.todoService.deleteTodo(todoId);
  }

  createTodo(){
    this.dialog.open(CreateTodoFormComponent,
      {data: {todo: '1234'}
      }).afterClosed().subscribe(editResult => {
        console.log('Модалка закрылась',editResult)
      if(editResult) {
        this.todoService.createTodo({
          id: new Date().getTime(),
          title: editResult.title,
          userId: editResult.userId,
          completed: editResult.completed
        })
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
