import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {IUser} from "../../models/user.interface";
import {CreateEditUserComponent} from "../create-edit-user/create-edit-user.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {RouterLink} from "@angular/router";
import { Store } from '@ngrx/store';
import {UsersApiService} from "../../services/users-api.service";
import {UsersActions} from "../../store/Users/Users.actions";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!:IUser
  @Output() deleteEvent = new EventEmitter<number>();
  public store = inject(Store);
  constructor(public dialog: MatDialog, private usersApiService: UsersApiService) {}

  delete(id: number) {
    this.deleteEvent.emit(id)
  }

  edit(user: IUser) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = user;

    const dialogRef = this.dialog.open(CreateEditUserComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.store.dispatch(UsersActions.editUser({ userChanges: data }))
      // this.usersApiService.editUser(data);
    });
  }
}
