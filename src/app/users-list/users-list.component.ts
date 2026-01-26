import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserCardComponent } from './user-card/user-card.component';
import { UsersActions } from './store/users-list.actions';
import { selectUsers } from './store/users-list.selectors';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  imports: [NgFor, UserCardComponent, AsyncPipe],
  standalone: true,
})
export class UsersListComponent implements OnInit {
  private readonly store = inject(Store);

  readonly users$ = this.store.select(selectUsers);

  ngOnInit(): void {
    this.store.dispatch(UsersActions.loadUsers());
  }

  deleteUser(userId: number): void {
    this.store.dispatch(UsersActions.deleteUser({ userId }));
  }

  editUser(updatedUser: any): void {
    this.store.dispatch(UsersActions.editUser({ user: updatedUser }));
  }
}
