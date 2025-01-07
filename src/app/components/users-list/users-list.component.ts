import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersApiService } from '../../services/users-api-service';
import { User } from '../../interfaces/User.interface';
import { AsyncPipe, NgFor } from '@angular/common';
import { UserCardComponent } from './user-card/user-card.component';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { CreateUser } from '../../interfaces/CreateUser.interface';
import { NewUser } from '../../interfaces/NewUser.interface';
import { LocalStorageService } from '../../services/locale-storage.service';
import { Store } from '@ngrx/store';
import { UsersActions } from './store/user.actions';
import { selectUsers } from './store/users.selectors';
import { Subject } from 'rxjs';

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
  private readonly userApiService = inject(UsersApiService);
  private readonly localeStorageServices = inject(LocalStorageService);
  private readonly createUserDialog = inject(MatDialog);
  private readonly store = inject(Store);
  public readonly users$ = this.store.select(selectUsers);
  private destroy$ = new Subject<void>();

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
      if (this.localeStorageServices.getItem()) {
        this.store.dispatch(
          UsersActions.set({
            users: this.localeStorageServices.getItem(),
          })
        );
      } else {
        this.store.dispatch(UsersActions.set({ users: response }));
        this.localeStorageServices.updateLocaleStorage();
      }
    });
  }

  public onCreateUserDialog() {
    this.openDialog(this.createUserItem);
  }

  public onEditedUser(editUser: NewUser) {
    this.openDialog({ ...editUser, isEdit: true });
  }

  public openDialog(item: NewUser): void {
    const dialogRef = this.createUserDialog.open(UserDialogComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe((result: CreateUser) => {
      if (result && result.isEdit === false) {
        this.store.dispatch(
          UsersActions.create({
            user: {
              ...result,
              company: {
                name: result.companyName,
              },
            },
          })
        );
        this.localeStorageServices.updateLocaleStorage();
      } else if (result && result.isEdit) {
        this.store.dispatch(
          UsersActions.edit({
            user: {
              ...result,
              company: {
                name: result.companyName,
              },
            },
          })
        );
        this.localeStorageServices.updateLocaleStorage();
      }
    });
  }

  public deletedUser(deletedUser: User) {
    this.store.dispatch(UsersActions.delete({ id: deletedUser.id }));
    this.localeStorageServices.updateLocaleStorage();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
