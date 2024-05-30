import { Component, OnInit, inject } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { IUser } from '../../types/users.interfase';
import { LocalStorageJwtService } from '../../services/local-storage-jwt.service';
import { Store } from '@ngrx/store';
import { addUser, deleteUser, editUser, getUsers, loadUsers } from '../../store/users.actions';
import { selectUsers } from '../../store/users.selector';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCardComponent,CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  private store = inject(Store);
  private dialog = inject(MatDialog);
  public usersStore$ = this.store.select(selectUsers);
  
  constructor() {}

  ngOnInit(): void {
    this.store.dispatch(getUsers())
  }

  deleteUser(id:number) {
    this.store.dispatch(deleteUser({id}))
  }

  openDialog(user?:IUser) {
    const isEdit = Boolean(user);

    const dialogRef = this.dialog.open(CreateEditUserComponent, {data: {user, isEdit}});

    dialogRef.afterClosed().subscribe((user: IUser) => {
      if(!user) return;

      isEdit ? this.store.dispatch(editUser({user})) : this.store.dispatch(addUser({newUsers:user}));
    });
  }
}
