import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { UserCardComponent } from './user-card/user-card.component';
import { User } from '../interfaces/users.interface';
import { CreateUser } from '../interfaces/create-user.interface';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { UsersActions } from './store/user.actions';
import { Observable } from 'rxjs/internal/Observable';
import { selectUsers } from './store/users.selectors';
import { MatTooltip, TooltipComponent } from '@angular/material/tooltip';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  standalone: true,
  imports: [
    NgFor,
    UserCardComponent,
    AsyncPipe,
    MatIcon,
    MatButtonModule,
    MatDialogModule,
    MatTooltip,
    TooltipComponent,
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly usersApiService: UsersApiService = inject(UsersApiService);

  readonly dialog: MatDialog = inject(MatDialog);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly store = inject(Store);
  public readonly users$: Observable<User[]> = this.store.select(selectUsers);

  constructor() {
    this.usersApiService.getUsers().subscribe((response: User[]) => {
      this.store.dispatch(UsersActions.set({ users: response }));
    });
  }

  createUser(formDateUser: CreateUser) {
    this.store.dispatch(
      UsersActions.create({
        user: {
          id: new Date().getTime(),
          name: formDateUser.name,
          username: formDateUser.username,
          email: formDateUser.email,
          company: {
            name: formDateUser.company.name,
          },
        },
      }),
    );
  }

  editUser(user: User) {
    this.store.dispatch(UsersActions.edit({ user }));
  }

  deleteUser(id: number) {
    this.store.dispatch(UsersActions.delete({ id }));
  }

  openDialogCreateUser(): void {
    const dialogRef: MatDialogRef<CreateUserDialogComponent> = this.dialog.open(
      CreateUserDialogComponent,
      { data: {} },
    );
    dialogRef.afterClosed().subscribe((createResult: CreateUser) => {
      if (!createResult) {
        this.snackBar.open('Отмена добавления!', 'ok', { duration: 3000 });
        return;
      }
      if (createResult) {
        this.createUser(createResult);
        this.snackBar.open('Пользователь добавлен!', 'ok', {
          duration: 3000,
        });
      }
    });
  }
}
