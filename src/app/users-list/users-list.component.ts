import { Component, OnInit, inject } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../users.interface';
import { StorageService } from '../services/localestorage.service';
import {Store} from "@ngrx/store";
import {addUser, deleteUser, loadStoredData, loadUsers, updateUser} from "../states/users/users.actions";
import {selectUsers} from "../states/users/users.selectors";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    AddUserDialogComponent,
    UserCardComponent,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  private store = inject(Store);
  private usersService = inject(UsersService);

  private usersSubject$ = new BehaviorSubject<User[]>([]);
  private readonly usersConstant$ = this.usersSubject$.asObservable();
  private storageService = inject(StorageService);

  public readonly users$ = this.store.select(selectUsers);
  dialogOpen = false;
  user!: User;
  data!: User;

  constructor(private dialog: MatDialog){}

  ngOnInit(): void {
    // this.store.dispatch(loadUsers())
    if(this.storageService.getItem() === null) {
   //   this.usersService.loadUsers()
      this.store.dispatch(loadUsers())
      console.log(this.store)
    } else {
     // this.usersService.loadStoredData()
      this.store.dispatch(loadStoredData())
    }
  }

  onDeleteUser(id: number): void {
    console.log(id)
    this.storageService.saveData(deleteUser({id}));
    this.store.dispatch(deleteUser({id}));

  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent);
    dialogRef.afterClosed().subscribe((newUser: User) => {
      if (newUser) {
        // this.usersService.addUser(newUser)

        this.store.dispatch(addUser({userData: newUser}))
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
        website: currentUser.website,
        username: currentUser.username,
      }
    });
    dialogRef.afterClosed().subscribe((editUser: User) => {
      if (editUser) {
        editUser.id = currentUser.id
        this.store.dispatch(updateUser({updatedUser: editUser})); // instead

        this.users$.subscribe({})
      }
    });
  }
}
