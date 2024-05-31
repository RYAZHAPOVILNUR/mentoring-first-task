import { Component, OnInit, inject } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { IUser } from '../types/users.interfase';
import { LocalStorageJwtService } from '../services/local-storage-jwt.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCardComponent,CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  private usersService = inject(UsersService);
  private dialog = inject(MatDialog);
  private localStore = inject(LocalStorageJwtService);
  public readonly users$ = this.usersService.users$;

  constructor() {}

  ngOnInit(): void {
    const localStorageUsers = this.localStore.getItem();
    !localStorageUsers ? this.usersService.loadUsers() : this.usersService.loadUsersLocalStorage(JSON.parse(localStorageUsers));
  }

  deleteUser(id:number) {
    this.usersService.deleteUsers(id);
  }

  openDialog(user?:IUser) {
    const isEdit = Boolean(user);

    const dialogRef = this.dialog.open(CreateEditUserComponent, {data: {user,isEdit}});

    dialogRef.afterClosed().subscribe((user:IUser) => {
      if(!user) return;
      
      isEdit ? this.usersService.editUser(user) : this.usersService.addUser(user);

    });
  }
}
