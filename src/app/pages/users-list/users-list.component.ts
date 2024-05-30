import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserCardComponent } from "../user-card/user-card.component";
import { NgFor } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { getUsers, deleteUser, editUser, createUser, returnUsers } from '../../+state/users.action';
import { getUserSelector, getUsersFailureSelector, getUsersSuccessSelector } from '../../+state/users.selectors';
import { Observable } from 'rxjs';
import { User } from '../../interface/users.interface';
import { NgIf } from '@angular/common';
import { CreateUserEditComponent } from '../../create-user-edit/create-user-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-users-list',
    standalone: true,
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [UserCardComponent, NgFor, AsyncPipe, NgIf, MatButtonModule]
})
export class UsersListComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  errors$: Observable<string>;
  
  constructor(
    private store: Store,
    private dialog: MatDialog
  ){
    this.loading$ = this.store.pipe(select(getUserSelector));
    this.users$ = this.store.pipe(select(getUsersSuccessSelector));
    this.errors$ = this.store.pipe(select(getUsersFailureSelector));
  }
  ngOnInit(): void {
    this.store.dispatch(getUsers());
  }
  deleteUser(id: number): void {
    this.store.dispatch(deleteUser({ userId: id }))
  }
  editUser(user: User): void {
    const dialogRef = this.dialog.open(CreateUserEditComponent, {
      data: { user, isEdit: true }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(editUser({user: { ...user, ...result }}))
      }
    })
  }
  createUser(): void {
    const dialogRef = this.dialog.open(CreateUserEditComponent, {
      data: { user: {}, isEdit: false }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(createUser({ user: result }))
      }
    })
  }
  returnUsers(): void {
    this.store.dispatch(returnUsers());
  }
}