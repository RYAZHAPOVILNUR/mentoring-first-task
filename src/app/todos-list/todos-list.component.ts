import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodosCardComponent } from './todos-card/todos-card.component';

import { TodosListActions } from './store/todos-list.actions';
import { selectTodos } from './store/todos-list.selectors';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  imports: [NgFor, TodosCardComponent, AsyncPipe],
  standalone: true,
})
export class TodosListComponent implements OnInit {
  private readonly store = inject(Store);

  readonly todos$ = this.store.select(selectTodos);

  ngOnInit(): void {
    this.store.dispatch(TodosListActions.loadTodos());
  }

  deleteTodo(todoId: number): void {
    this.store.dispatch(TodosListActions.deleteTodo({ todoId }));
  }

}
