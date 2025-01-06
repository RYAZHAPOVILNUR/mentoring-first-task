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
import { LocalStorageService } from '../../services/locale-storage.service';

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
  readonly localeStorageServices = inject(LocalStorageService);
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

  constructor() {
    this.userApiService.getUsers().subscribe((response: User[]) => {
      if (!localStorage.getItem('users')) {
        this.userService.setUsers(response);
        this.localeStorageServices.setToLocale();
      } else {
        this.localeStorageServices.setToStore();
      }
    });
  }

  public onCreateUserDialog() {
    this.openDialog(this.createUserItem);
  }

  public editedUser(editUser: NewUser) {
    this.openDialog({ ...editUser, isEdit: true });
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
        this.localeStorageServices.editToLocale();
      } else if (result && result.isEdit) {
        this.userService.editUser({
          ...result,
          company: {
            name: result.companyName,
          },
        });
        this.localeStorageServices.editToLocale();
      }
    });
  }

  public deletedUser(deletedUser: User) {
    this.userService.deleteuser(deletedUser);
    this.localeStorageServices.editToLocale();
  }
}
