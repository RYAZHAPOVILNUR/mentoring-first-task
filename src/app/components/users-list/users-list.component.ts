import { Component, Inject, OnInit, inject } from '@angular/core';
import { UsersService } from '../../services/users-service.service';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { AsyncPipe } from '@angular/common';
import { CreateEditUser } from '../create-edit-user/create-edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UserCardComponent } from '../user-card/user-card.component';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    AsyncPipe,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  public readonly usersService = inject(UsersService);
  private readonly dialog = inject(MatDialog);

  public users$: Observable<User[]> = this.usersService.users$;

  ngOnInit() {
    this.usersService.loadUsers();
    
  }

  openDialog(user?: User): void {

    let isEdit: boolean = false;

    if (user) {
      isEdit = true;
    }

    const dialogRef = this.dialog.open(CreateEditUser, {
      data: {
        user: user,
        isEdit: isEdit,
      }
    });

    dialogRef.afterClosed().subscribe((userData) => {
      if (userData !== undefined) {
        isEdit ?
          this.usersService.editUser(userData) :
          this.usersService.createUser(userData);
      }
    });
  }

}
