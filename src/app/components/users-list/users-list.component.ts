import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '@services/users.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommonModule } from '@angular/common';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { IUser } from "@models/user.model";
import { FormsModule } from "@angular/forms";
import { Observable } from "rxjs";
import { LocalStorageAct } from "@services/localStorageAct";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    UserCardComponent,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss',],
})
export class UsersListComponent implements OnInit{
  private readonly usersService = inject(UsersService);
  private readonly dialog = inject(MatDialog);
  private readonly localStorageAct = inject(LocalStorageAct);

  public readonly users$: Observable<IUser[]>;

  constructor() {
    this.users$ = this.usersService.users$;
  }

  public openCreateEditUser(user?: Partial<IUser>): void {
    const dialogRef= this.dialog.open(CreateEditUserComponent, {
      width: '400px',
      data: user,
    });

    dialogRef.componentInstance.isEdit = !!user;

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if(!user) {
          this.usersService.createUser(result);
        } else {
          this.usersService.editUser(result);
        }
      }
    })
  }

  public onDeleteUser(username: string): void {
    this.usersService.deleteUser(username);
  }

  ngOnInit(): void {
    if(this.localStorageAct.getItem() === null) {
      this.usersService.loadUsers();
      this.users$.subscribe(
        (users) => {
            this.localStorageAct.setItem(JSON.stringify(users))
        }
      );
    } else {
      const data = this.localStorageAct.getItem();
      this.usersService.loadUsers(JSON.parse(data!));
    }
  }
}
