import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AsyncPipe } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';
import { UsersApiService } from '../services/users-api.service';
import { MatButton } from '@angular/material/button';
import { User } from '../model/user';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [AsyncPipe, UserCardComponent, MatButton],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  private readonly usersApiService = inject(UsersApiService);
  private readonly usersService = inject(UsersService);
  public readonly users$ = this.usersService.users$;

  constructor(public dialog: MatDialog) {}

  public openDialog(user?: User): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: {
        user: user,
      },
    });
    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        if (user) {
          this.usersService.editUser({ ...user, ...result });
        } else this.usersService.addUser(result);
      }
    });
  }

  ngOnInit(): void {
    this.usersService.loadUsers();
  }

  public onDeleteUser(id: number): void {
    this.usersService.deleteUser(id);
  }
}
