import {Component, inject} from '@angular/core';
import {UserCardComponent} from "../user-card/user-card.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {UsersApiService} from "../../services/usersApiService.service";
import {User} from "../../interface/users.interface";
import {UsersService} from "../../services/users.service";
import {CreateEditUserComponent} from "../create-edit-user/create-edit-user.component";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [ UserCardComponent,
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  users: User[] = [];

  public readonly usersService = inject(UsersService)
  private readonly usersApiService = inject(UsersApiService)
  private readonly dialog = inject(MatDialog)

  ngOnInit() {
    this.usersApiService.getUsers().subscribe(users => {
      this.users = users;
      this.usersService.setUsers(users);
    });
  }

  onAddUser():void{
    const dialogRef = this.dialog.open(CreateEditUserComponent, {})
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.addUser(result)
      }
    });
  }

  onEditUser(user: User): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.editUser(result);
      }
    });
  }

  onDeleteUser(userId: number):void {
    this.usersService.deleteUser(userId);


  }

}
