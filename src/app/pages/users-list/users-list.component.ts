import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UsersApiService } from '../../services/users-api.service';
import { UsersService } from '../../services/users.service';
import { CreateUserModalComponent } from '../../components/user-card-modal/user-card-modal.component';
import { ConfirmComponent } from '../../components/confirm/confirm/confirm.component';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { User } from '../../types/user.interface';

@Component({
  standalone: true,
  selector: 'users-list',
  imports: [CommonModule, UserCardComponent, MatButtonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  apiService = inject(UsersApiService);
  usersService = inject(UsersService);
  users$: Observable<User[]> = this.usersService.users$;
  dialog: MatDialog = inject(MatDialog);

  constructor() {
    const cache = localStorage.getItem('users');
    cache
      ? this.usersService.setUsers(JSON.parse(cache))
      : this.apiService.getUsers().subscribe((data) => {
          localStorage.setItem('users', JSON.stringify(data));
          this.usersService.setUsers(data);
        });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(CreateUserModalComponent, {
      data: {
        isEdit: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      result && this.usersService.addUser(result);
    });
  }

  public onEdit(user: User): void {
    const dialogRef = this.dialog.open(CreateUserModalComponent, {
      data: {
        user,
        isEdit: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      result && this.usersService.editUser(result);
    });
  }

  public onDelete([id, event]: [number, Event]): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        user: this.usersService.users.find((user) => user.id === id),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      result && this.usersService.deleteUser(id);
    });
  }
}
