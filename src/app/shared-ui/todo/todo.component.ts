import {Component, inject, Input} from '@angular/core';
import {MatFormField, MatInput, MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {TodoApiServiceService} from "../../data/services/todo-api-service.service";
import {Todo} from "../../data/interfaces/todoApiService";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    MatInput,
    MatFormField,
    FormsModule,
    MatInputModule,
    TodoListComponent,
    JsonPipe
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

  http = inject(TodoApiServiceService)
  todos: Todo[] = []
  @Input() todo!: Todo
  newTodoTitle: string = '';

  displayMode: 'all' | 'completed' | 'uncompleted' = 'all'

  setDisplayMode(mode: 'all' | 'completed' | 'uncompleted') {
    this.displayMode = mode
  }

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.http.getApiTodo().subscribe(data => {
      this.todos = data
    })
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id)
  }

  toggleTodo(todo: Todo) {
    todo.completed = !todo.completed
  }

  addTodo() {
    if (!this.newTodoTitle.trim()) {
      return;
    }
    const newTodo: Todo = {
      id: this.todos.length + 1,
      title: this.newTodoTitle,
      completed: false
    };
    this.todos.push(newTodo);
    this.newTodoTitle = '';
  }
}
