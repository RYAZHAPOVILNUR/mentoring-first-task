import { Component, OnInit, inject } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommonModule } from '@angular/common';
import { UsersService } from '../user.service';
import { MatButtonModule } from '@angular/material/button';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../user.model';
import { StorageService } from '../localstorage.service';
import { Store, select } from '@ngrx/store';
import * as UsersActions from '../state/users.actions';
import { errorSelector, isLoadingSelector, usersSelector } from '../state/users.selectors';
import { Observable } from 'rxjs';
import { AppStateInterface } from '../state/types/app-state.interface';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    AddUserDialogComponent,
    UserCardComponent,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  private usersService = inject(UsersService);
  private storageService = inject(StorageService);
  private dialog = inject(MatDialog);
  // public readonly users$ = this.usersService.users$

  dialogOpen = false;
  user!: User;
  data!: User;  

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  users$: Observable<User[]>;

  constructor(private store: Store<AppStateInterface>){
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.users$ = this.store.pipe(select(usersSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(UsersActions.getUsers())
    // if(this.storageService.getItem() === null) {
    //   this.usersService.loadUsers()
    // } else {
    //   this.usersService.loadStoredData()
    // }
  }
  
  onDeleteUser(id: number): void {
    this.usersService.deleteUser(id);
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent);
    dialogRef.afterClosed().subscribe(newUser => {
      if (newUser) {
        this.usersService.addUser(newUser)
        this.users$.subscribe({})
      }
    });
  }

  openDialogWithCard(currentUser: User): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      data: {
        name: currentUser.name,
        phone: currentUser.phone,
        email: currentUser.email,
        username: currentUser.username,
        website: currentUser.website,
      }
    });
    dialogRef.afterClosed().subscribe(editUser => {
      if (editUser) {
        editUser.id = currentUser.id
        this.usersService.updateUser(editUser)
        this.users$.subscribe({})
      }
    });
  }
}
