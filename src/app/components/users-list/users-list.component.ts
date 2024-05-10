import {Component, inject, OnInit} from '@angular/core';
import {UserCardComponent} from "../user-card/user-card.component";
import {UsersApiService} from "../../services/users-api.service";
import {IUser} from "../../models/user.interface";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {UsersService} from "../../services/users.service";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateEditUserComponent} from "../create-edit-user/create-edit-user.component";
import {UsersActions} from "../../store/Users/Users.actions";
import {Store} from "@ngrx/store";
import {usersFeauture} from "../../store/Users/Users.reducer";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCardComponent, AsyncPipe, NgForOf, NgIf, MatButtonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  public store = inject(Store);

  // public usersList$!: Observable<IUser[]>;
  public readonly usersList$: Observable<IUser[]> = this.store.select(usersFeauture.selectUsers)
  constructor(private userApi: UsersApiService, public dialog: MatDialog) {}

  ngOnInit() {
    // this.userApi.getUsers();
    // this.usersList$ = this.userApi.entities$;
    this.store.dispatch(UsersActions.getUsers())
  }

  openDialog() {
    let dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(CreateEditUserComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log('Диалоговое окно закрыто. Создание Пользователя');
      console.log('Результат: ', data); // result - это значение, переданное при закрытии окна

      // this.userApi.addUser(data);

      this.store.dispatch(UsersActions.addUser({ user: data }));
    });
  }

  deleteEvent(id: number) {
    // this.userApi.deleteUser(id);
    this.store.dispatch(UsersActions.deleteUser({id}))
  }
}
