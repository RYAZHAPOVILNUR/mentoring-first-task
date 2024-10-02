import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {ITodo} from "../interfaces/itodo";
import {TodoService} from "../services/todo.service";
import {TodoCardComponent} from "./todo-card/todo-card.component";
import {AsyncPipe, NgFor} from "@angular/common";
import {UsersService} from "../services/users.service";
import {selectTodos} from "../states/todos/todos.selectors";
import {Store} from "@ngrx/store";
import {deleteTodo, loadTodos} from "../states/todos/todos.actions";

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [
    TodoCardComponent,
    AsyncPipe,
    NgFor
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  public readonly todos$: Observable<ITodo[]> = this.store.select(selectTodos);
  constructor(private store: Store, private _usersService: UsersService) {}

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
    this._usersService.loadUsers();
  }

  deleteTodo(id: number) {
    this.store.dispatch(deleteTodo({ id }));
  }


}
