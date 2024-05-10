import { Component } from '@angular/core';
import { UsersType } from '../../../shared/types/users-types.type';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from "../../user-card/user-card.component";
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { getFilteredUsersList, getUserList } from '../../../core/state/users/users.selector';
import { Store } from '@ngrx/store';
import { deleteUser, filteredUsers, loadUsers } from '../../../core/state/users/users.actions';
import { UsersFilterComponent } from '../users-filter/users-filter.component';
import { UsersListModalWindowComponent } from '../users-list-modal-window/users-list-modal-window.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  imports: [
    CommonModule,
    UserCardComponent,
    MatButtonModule,
    UsersFilterComponent
  ],
})
export class UserListComponent {
  users: UsersType[] = []
  user!: UsersType
  redact: boolean = false

  some!: string
  onFilterChanged(event: string) {
    this.store.dispatch(filteredUsers({ name: event }))
    this.store.select(getFilteredUsersList).subscribe(data => {
      this.users = data
    });
  }
  constructor(
    public dialog: MatDialog,
    private store: Store
  ) { }

  ngOnInit() {
    this.getUsersForList()
  }

  getUsersForList() {
    this.store.dispatch(loadUsers())
    this.store.select(getUserList).subscribe(data => this.users = data)
  }

  deleteUser(user: UsersType) {
    if (confirm("Do you want to remove?")) {
      this.store.dispatch(deleteUser({ id: user.id }))
    }
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    redact: boolean
  ): void {
    this.dialog.open(UsersListModalWindowComponent,
      {
        width: '500px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: { redact }
      }
    )
  }

}
