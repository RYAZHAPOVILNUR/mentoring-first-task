import { Component, inject } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { User } from '../../../data/intefaces/user.interface';
import { Store } from '@ngrx/store';
import {
  createUser,
  deleteUser,
  loadUserData,
  updateUser,
} from '../../../reducer/users.actions';
import { selectUsers } from '../../../reducer/users.selectors';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent, CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  private isEdit: boolean = false;

  constructor(public dialog: MatDialog) {}
  private readonly store = inject(Store);
  public readonly users$ = this.store.select(selectUsers);

  ngOnInit(): void {
    this.store.dispatch(loadUserData());
  }

  openDialog(user?: User) {
    if (user) {
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
    const dialogRef = this.dialog.open<
      CreateEditUserComponent,
      { user?: User; isEdit: boolean }
    >(CreateEditUserComponent, {
      data: { user, isEdit: this.isEdit },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.isEdit) {
          this.store.dispatch(updateUser({ user: { ...user, ...result } }));
        } else {
          const newUser = { ...result, id: this.generateId() };
          this.store.dispatch(createUser({ user: { ...user, ...result } }));
        }
      }
    });
  }

  generateId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  onDeleteUser(id: number) {
    this.store.dispatch(deleteUser({ id }));
  }
}
