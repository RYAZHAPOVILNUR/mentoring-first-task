import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersApiService } from '../../services/users-api-service';
import { User } from '../../interfaces/User.interface';
import { UserService } from '../../services/users.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { UserCardComponent } from './user-card/user-card.component';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { CreateUser } from '../../interfaces/CreateUser.interface';
import { NewUser } from '../../interfaces/NewUser.interface';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    NgFor,
    AsyncPipe,
    UserCardComponent,
    MatButton,
    MatDialogModule,
    MatCardModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly userService = inject(UserService);
  readonly userApiService = inject(UsersApiService);
  readonly createUserDialog = inject(MatDialog);

  private createUserItem: NewUser = {
    name: '',
    email: '',
    website: '',
    company: {
      name: '',
    },
    isEdit: false,
  };

  usersText = 'test';
  key = 'users';

  constructor() {
    this.userApiService.getUsers().subscribe((response: User[]) => {
      this.userService.setUsers(response);
      this.setToLocaleStorage();
    });
  }

  private setToLocaleStorage() {
    localStorage.setItem(
      this.key,
      JSON.stringify(this.userService.usersSubject$.value)
    );
  }

  public getToLocaleStorage() {
    if (localStorage) {
      let locale = JSON.parse(localStorage.getItem(this.key));
      console.log(locale);
    }
  }

  public onCreateUserDialog() {
    this.openDialog(this.createUserItem);
    this.setToLocaleStorage();
  }

  public editedUser(editUser: NewUser) {
    this.openDialog({ ...editUser, isEdit: true });
    this.setToLocaleStorage();
  }

  public openDialog(item: NewUser): void {
    const dialogRef = this.createUserDialog.open(UserDialogComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe((result: CreateUser) => {
      if (result && result.isEdit === false) {
        this.userService.createUser({
          ...result,
          company: {
            name: result.companyName,
          },
        });
      } else if (result && result.isEdit) {
        this.userService.editUser({
          ...result,
          company: {
            name: result.companyName,
          },
        });
      }
    });
  }

  public deletedUser(deletedUser: User) {
    this.userService.deleteuser(deletedUser);
  }
}
