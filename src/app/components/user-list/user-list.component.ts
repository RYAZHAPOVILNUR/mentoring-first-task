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
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    UserCardComponent,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss',],
})
export class UserListComponent implements OnInit{
  private userService = inject(UsersService);
  private dialog = inject(MatDialog);
  private readonly localStorageAct = inject(LocalStorageAct);

  public readonly users$: Observable<IUser[]>;

  constructor() {
    this.users$ = this.userService.users$;
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
          this.userService.createUser(result);
        } else {
          this.userService.editUser(result);
        }
      }
    })
  }

  public onDeleteUser(username: string): void {
    this.userService.deleteUser(username);
  }

  ngOnInit(): void {
    if(this.localStorageAct.getItem() === null) {
      this.userService.loadUsers();
      this.users$.subscribe(
        (users) => {
            this.localStorageAct.setItem(JSON.stringify(users))
        }
      );
    } else {
      const data = this.localStorageAct.getItem();
      this.userService.loadUsers(JSON.parse(data!));
    }
  }
}
