import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { UsersApiService } from '../services/users-api.service';
import { UserCardComponent } from './user-card/user-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';
import {
  MatCard,
  MatCardContent,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { CreateEditUser, User } from '../interfaces/user.interface';
import { Store } from '@ngrx/store';
import { UsersActions } from './store/users.actions';
import { selectUsers } from './store/users.selectors';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  standalone: true,
  imports: [
    NgForOf,
    UserCardComponent,
    AsyncPipe,
    MatButtonModule,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
  ],
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  private readonly usersApiService = inject(UsersApiService);
  private readonly dialog = inject(MatDialog);
  private readonly store = inject(Store);
  public readonly users$ = this.store.select(selectUsers);

  constructor() {
    this.usersApiService.getUsers().subscribe((response: User[]) => {
      this.store.dispatch(UsersActions.set({ users: response }));
    });
  }

  public deleteUser(id: number) {
    this.store.dispatch(UsersActions.delete({ id }));
  }

  public editUser(user: CreateEditUser) {
    this.store.dispatch(UsersActions.edit({ user }));
  }

  public createUser(formData: CreateEditUser) {
    this.store.dispatch(
      UsersActions.create({
        user: {
          id: new Date().getTime(),
          name: formData.name,
          email: formData.email,
          website: formData.website,
          company: {
            name: formData.name,
          },
        },
      }),
    );
  }

  public openDialog(user: string | User = ''): void {
    const isEdit = user !== '';

    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: { user, isEdit },
    });

    dialogRef.afterClosed().subscribe((result: CreateEditUser) => {
      if (result) {
        return isEdit ? this.editUser(result) : this.createUser(result);
      }
    });
  }
}
