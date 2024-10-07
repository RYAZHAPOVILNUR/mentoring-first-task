import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {Observable} from "rxjs";

import {UserInterface} from "../types/user.interface";
import {AppState} from "../types/app-state.interface";
import {UserCardComponent} from "../user-card/user-card.component";
import {CreateEditUser} from "../create-edit-user/create-edit-user";

import {Store} from "@ngrx/store";
import {getUsersSelector} from "../store/users.selector";
import {deleteUser, loadUsers} from "../store/users.actions";

import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatDividerModule,
    MatButtonModule,
    UserCardComponent
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  users$: Observable<UserInterface[]>;

  store: Store<AppState> = inject(Store);

  constructor() {
    this.users$ = this.store.select(getUsersSelector)
  }


  ngOnInit() {
    this.store.dispatch(loadUsers())
  }

  deleteUser(id: number) {
    this.store.dispatch(deleteUser({id: id}))
  }

  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(CreateEditUser, {
      data: {
        name: null,
        company: null,
        website: null,
        phone: null,
      },
    });
  }
}
