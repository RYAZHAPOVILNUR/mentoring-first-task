import { Component, OnInit,  inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../../ui/user-card/user-card.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserModalComponent } from '../../ui/modal/create-edit-user-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { UsersActions } from '../../store/users.actions';
import { Observable } from 'rxjs';
import { User } from '../../../types/user.type';
import { usersFeauture } from '../../store/users.reducers';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent, MatButtonModule],
  providers: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  public dialog = inject(MatDialog);
  public store = inject(Store);

  public readonly isLoading$: Observable<boolean> = this.store.select(usersFeauture.selectIsLoading);
  public readonly users$: Observable<User[]> = this.store.select(usersFeauture.selectUsers)
  public readonly errors$: Observable<string | null> = this.store.select(usersFeauture.selectErrors);

  ngOnInit(): void {
    this.store.dispatch(UsersActions.getUsers());
  }
  public openDialog(user?: User) {
    const dialogRef = this.dialog.open(CreateEditUserModalComponent, {
      height: '550px',
      width: '450px',
      data: user,
    });
    dialogRef.afterClosed().subscribe((data: User) => {
      if (data.id) {
        this.store.dispatch(UsersActions.editUser({ userChanges: data }));
      } else {
        this.store.dispatch(UsersActions.addUser({ user: data }));
      }
    });
  }
}