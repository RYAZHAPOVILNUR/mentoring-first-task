import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Todo } from '../../Interfaces/todo-interface';
import { TodoApiComponent } from '../../services/todo-api.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { TodoCardComponent } from './todo-cards/todo-card.component';
import { TodoUserComponent } from '../../services/todo.service.component';
import { UserFormComponent } from '../forms/user-form/user-form.component';
import { TodoFormComponents } from '../forms/create-todo-form/create-todo-form.component';
import { Store } from '@ngrx/store';
import { TodoActions } from '../users-list/store/todo-store/todo-actions';
import { selectTodos } from '../users-list/store/todo-store/todo.selector';

@Component({
  selector: 'app-todo',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  standalone: true,
  imports: [
    NgFor,
    TodoCardComponent,
    AsyncPipe,
    TodoFormComponents,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  apiService = inject(TodoApiComponent);
  todoService = inject(TodoUserComponent);
  todos = this.todoService;
  store = inject(Store);
  todos$ = this.store.select(selectTodos)

  constructor() {
    this.apiService.getTodo().subscribe((response) => {
      console.log(response);
      this.store.dispatch(TodoActions.set({ todos: response }));
    });
  }

  deleteTodo(id: number) {
    this.store.dispatch(TodoActions.delete({ id }));
  }

  createTodo(todo: Todo) {
    this.store.dispatch(
      TodoActions.create({
        todo: {
          userId: todo.userId,
          id: todo.id,
          title: todo.title,
          completed: todo.completed,
        },
      })
    );
}

}
  
