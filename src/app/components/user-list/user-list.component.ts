import { Component } from '@angular/core';
import { UsersType } from '../../shared/types/users-types.type';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from "../user-card/user-card.component";
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UsersListModalWindowComponent } from '../users-list-modal-window/users-list-modal-window.component';
import { getUserList } from '../../core/state/users/users.selector';
import { Store } from '@ngrx/store';
import { deleteUser, loadUsers } from '../../core/state/users/users.actions';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  imports: [CommonModule, UserCardComponent, MatButtonModule],
})
export class UserListComponent {
  constructor(
    public dialog: MatDialog,
    private store: Store
  ) { }

  users: UsersType[] = []
  user!: UsersType
  redact: boolean = false

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
    redact: boolean): void {
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
