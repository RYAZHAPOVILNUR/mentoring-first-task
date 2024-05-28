import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../services/users/users.service";
import {UserCardComponent} from "../user-card/user-card.component";
import {AsyncPipe} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {CreateEditUserComponent} from "../create-edit-user/create-edit-user.component";
import {HeaderComponent} from "../../header/header.component";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    AsyncPipe,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    HeaderComponent
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit{

  public readonly users$ = this.usersService.users$;

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog
  ){}

  //=====*******USERS*********=====//
  ngOnInit() {
    this.usersService.loadUsers();
    // this.users$.subscribe(console.log);
  }
  onDeleteUserId(id: number): void {
    this.usersService.deleteUser(id);
  }
  //=====****************=====//
  //
  //=====*******DIALOG*********=====//
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width: '250px',
      data: {}
    });

    // Подписываемся на закрытие диалога
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  //=====****************=====//
}
