import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { UsersApiService } from '../../shared/services/users-api.service';
import { UsersService } from '../../shared/services/users.service';
import { Observable } from 'rxjs';
import { IUser } from '../../shared/models/user.models';
import { UserCardComponent } from '../user-card/user-card.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../../shared/components/create-edit-user/create-edit-user.component';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import {MatButton} from "@angular/material/button";


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent, NgFor, MatButton],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  private readonly localStorageService = inject(LocalStorageService);

  private dialog = inject(MatDialog);
  private dialogRef!: MatDialogRef<CreateEditUserComponent>;

  private readonly userService = inject(UsersService);
  private readonly usersApiService = inject(UsersApiService);

  public readonly users$: Observable<IUser[]> = this.userService.users$.asObservable();

  ngOnInit(): void {
    const usersOfStorage = this.localStorageService.getItem('users');
    if (usersOfStorage) {
      const users: IUser[] = JSON.parse(usersOfStorage);
      if (users.length !== 0) {
        this.userService.setUsers(users);
        return;
      }
    }
    this.usersApiService.getUsers().subscribe((data: IUser[]) => {
      this.userService.setUsers(data);
      this.localStorageService.setItem('users', JSON.stringify(data));
    });
  }

  openDialog(user?: IUser): void {
    this.dialogRef = this.dialog.open(CreateEditUserComponent, { data: user });
    this.dialogRef.afterOpened().subscribe(() => {
      if (user) {
        this.dialogRef.componentInstance.isEdit = true;
        this.dialogRef.componentInstance.formnameControl.patchValue(user);
      }
       else this.dialogRef.componentInstance.isEdit = false;
    });

    this.dialogRef.afterClosed().subscribe(() => {
      if (this.dialogRef.componentInstance.isEdit && user && this.dialogRef.componentInstance.formnameControl.valid) {
        this.editUser(user);
      } else if (this.dialogRef.componentInstance.formnameControl.valid) {
        this.addUser(this.dialogRef.componentInstance.formnameControl.value);
      }
    });
  }

  addUser(user: IUser): void {
    this.userService.addUser(user);
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id);
  }

  editUser(user: IUser): void {
    const newUser = this.dialogRef.componentInstance.formnameControl.value;
    this.userService.editUser({...user, ...newUser});
  }
}
