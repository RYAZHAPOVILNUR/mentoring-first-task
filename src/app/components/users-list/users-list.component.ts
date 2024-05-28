import {Component, OnInit} from '@angular/core';
import {UserCardComponent} from "../user-card/user-card.component";
import {UsersService} from "../../services/users.service";
import {CommonModule} from "@angular/common";
import {CreateEditUserComponent} from "../create-edit-user/create-edit-user.component";
import {MatButton} from "@angular/material/button";
import {MatDialog, MatDialogConfig, MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    CommonModule,
    CreateEditUserComponent,
    MatDialogModule,
    MatButton,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  public readonly users$ = this.usersService.users$;
  name?: string;
  email?: string;

  constructor(
    private readonly usersService: UsersService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.usersService.loadUsers();
  }

  onDeleteUser(id: number) {
    this.usersService.deleteUser(id);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      name: this.name,
      email: this.email,
      title: 'Add User'
    }

    const dialogRef = this.dialog.open(CreateEditUserComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.name = result.name;
      // this.email = result.email;
    });
  }
}
