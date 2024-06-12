import { Component, OnInit, inject } from '@angular/core';
import { AppComponent } from '../../app.component';
import { User } from '../../interface/users.interface';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserApiService } from '../../service/userApiService';
import { UserService } from '../../service/user.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DialogModule } from '@angular/cdk/dialog';
import { CreateEditUserComponen } from '../create-edit-user/create-edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { Store, StoreModule, select } from '@ngrx/store';
import * as actionsUser from '../../store/user.action';
import * as selectorUser from '../../store/user.selector';
import { Observable } from 'rxjs';
import { StateInterface } from '../../store/user.interface';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    AppComponent,
    UserCardComponent,
    FormsModule,
    AsyncPipe,
    MatButtonModule,
    DialogModule,
    CreateEditUserComponen,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  public readonly userService = inject(UserService);
  public readonly userApi = inject(UserApiService);

  public users$?: Observable<User[]>;

  public constructor(
    private dialog: MatDialog,
    private store: Store<StateInterface>
  ) {}

  public ngOnInit() {
    this.store.dispatch(actionsUser.actionLoading());
    this.users$ = this.store.pipe(select(selectorUser.usersSelector));
  }

  public openDialog(user?: User) {
    const dialogRef = this.dialog.open(CreateEditUserComponen, {
      data: {
        user: user,
      },
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (user) {
        this.store.dispatch(
          actionsUser.actionUpdate({ user: { ...user, ...result } })
        );
        console.log({ ...user, ...result });
      } else {
        this.store.dispatch(actionsUser.actionAddUser({ user: result }));
      }
    });
  }
}
