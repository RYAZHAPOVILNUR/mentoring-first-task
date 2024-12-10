import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { UsersApiService } from '../../services/users-api.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { User } from '../../models/users.model';
import { UserActions } from '../../store/users.actions';
import { selectUsers } from '../../store/users.selectors';
import { filter } from 'rxjs';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, UserCardComponent, AsyncPipe, MatTooltipModule, JsonPipe],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  private readonly usersApiService = inject(UsersApiService);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly store = inject(Store);
  public readonly users$ = this.store.select(selectUsers);

  constructor() {
    this.initializeUsers();
  }

  editUser(editedUser: User): void {
    if (editedUser && editedUser.id) {
      this.store.dispatch(UserActions.edit({editedUser}));
    }
  }

  deleteUser(userId: number, name: string): void {
    const confirmed = window.confirm(
      `Вы действительно хотите удалить пользователя ${name}?`
    );
    if (confirmed) {
      this.store.dispatch(UserActions.delete({userId}));
    }
  }

  openUserDialog(user?: User): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      width: '30%',
      data: {isEdit: !!user, user},
    });

    dialogRef.afterClosed()
      .pipe(
        filter(result => !!result) // Пропускаем только непустые значения
      )
      .subscribe((result) => {
        if (user) {
          this.editUser(result); // Если передан user, редактируем.
        } else {
          this.store.dispatch(UserActions.create({user: result})); // Иначе создаём нового пользователя.
        }
      });
  }

  private initializeUsers(): void {
    this.usersApiService
      .getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response: User[]) => {
        this.store.dispatch(UserActions.set({users: response}));
      });
  }
}
