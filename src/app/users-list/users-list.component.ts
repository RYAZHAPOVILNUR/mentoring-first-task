import { Component, OnInit, inject } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommonModule } from '@angular/common';
import { UsersService } from '../user.service';
import { MatButtonModule } from '@angular/material/button';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../user.model';
import { Store } from '@ngrx/store';
import * as UsersActions from '../state/users.actions';
import { AppStateInterface } from '../state/types/app-state.interface';
import { selectAllUsers } from '../state/users.selectors';

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
  private dialog = inject(MatDialog);

  dialogOpen = false;
  user!: User;
  data!: User;  

  public readonly users$ = this.store$.select(selectAllUsers);

  constructor(private store$: Store<AppStateInterface>){
  }

  ngOnInit(): void {
    this.store$.dispatch(UsersActions.getUsers())
  }
  
  onDeleteUser(id: number): void {
    this.store$.dispatch(UsersActions.deleteUserSuccess({id}))
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent);
    dialogRef.afterClosed().subscribe(newUser => {
      if (newUser) {
        this.store$.dispatch(UsersActions.addUserSuccess({user: newUser}));
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
        this.store$.dispatch(UsersActions.editUserSuccess({user: editUser}));
      }
    });
  }
}