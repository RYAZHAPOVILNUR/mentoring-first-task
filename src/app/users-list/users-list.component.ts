import { AsyncPipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  ViewChild,
} from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { UserCardComponent } from './user-card/user-card.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { CreateEditUserDialogComponent } from './create-edit-user-dialog/create-edit-user-dialog.component';
import { Store } from '@ngrx/store';
import { UsersActions } from './store/users.actions';
import { selectUsers } from './store/users.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface User {
  id: number;
  name: string;
  username?: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone?: string;
  website: string;
  company: {
    name: string;
    catchPhrase?: string;
    bs?: string;
  };
}

export interface userData {
  id: number;
  name: string;
  email: string;
  website: string;
  companyName: string;
}

@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  imports: [NgFor, UserCardComponent, AsyncPipe, MatButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  private readonly usersApiService = inject(UsersApiService);
  private readonly dialog = inject(MatDialog);
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private isEdit: Boolean = false;
  public readonly users$ = this.store.select(selectUsers);

  constructor() {
    this.usersApiService.getUsers().subscribe((response: any) => {
      this.store.dispatch(UsersActions.set({ users: response }));
    });
  }

  public openDialog(user?: User): void {
    this.isEdit = !!user;
    const dialogRef = this.dialog.open(CreateEditUserDialogComponent, {
      data: {
        user: user,
        isEdit: this.isEdit,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (!result) return;
        this.isEdit
          ? this.editUser({ ...user, ...result })
          : this.createUser(result);
      });
  }

  deleteUser(id: number) {
    this.store.dispatch(UsersActions.delete({ id }));
  }

  public createUser(userData: userData) {
    this.store.dispatch(
      UsersActions.create({
        user: {
          id: new Date().getTime(),
          name: userData.name,
          email: userData.email,
          website: userData.website,
          company: {
            name: userData.companyName,
          },
        },
      })
    );
  }

  public editUser(user: userData) {
    this.store.dispatch(
      UsersActions.edit({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          website: user.website,
          company: {
            name: user.companyName,
          },
        },
      })
    );
  }
}
