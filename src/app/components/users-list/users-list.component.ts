import { Component, inject, OnInit } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommonModule } from '@angular/common';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { IUser } from "@models/user.model";
import { FormsModule } from "@angular/forms";
import { Observable } from "rxjs";
import { LocalStorageAct } from "@services/localStorageAct";
import { UsersFacade } from "@state/users/users.facade";

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
  private readonly dialog = inject(MatDialog);
  private readonly localStorageAct = inject(LocalStorageAct);
  private readonly usersFacade = inject(UsersFacade);

  public readonly users$: Observable<IUser[]> = this.usersFacade.usersState$;

  public openCreateEditUser(user?: IUser): void {
    const dialogRef = this.dialog.open<CreateEditUserComponent, IUser, IUser>(CreateEditUserComponent, {
      width: '400px',
      data: user,
    });

    dialogRef.componentInstance.isEdit = !!user;

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if(!user) {
          this.usersFacade.createUser(result);
        } else {
          this.usersFacade.editUser(result);
        }
      }
    });
  }

  public onDeleteUser(user: IUser): void {
    this.usersFacade.deleteUser(user);
  }

  ngOnInit(): void {
    if(this.localStorageAct.getItem() === null) {
      this.usersFacade.loadUsers();
      this.users$.subscribe(
        (users) => {
            this.localStorageAct.setItem(JSON.stringify(users));
        }
      );
    } else {
      this.usersFacade.loadUsers();
    }
  }
}
