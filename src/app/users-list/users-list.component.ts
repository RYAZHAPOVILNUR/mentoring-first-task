import { Component, OnInit, inject } from '@angular/core';
import { UsersService } from '../data/services/users.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommonModule } from '@angular/common';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from '../user.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LocalStorageService } from '../data/services/local-storage.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    CommonModule,
    CreateEditUserComponent,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  public readonly usersService = inject(UsersService);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly dialog = inject(MatDialog);
  public readonly dialogRef?: MatDialogRef<CreateEditUserComponent>;
  public readonly users$ = this.usersService.users$;

  ngOnInit(): void {
    this.usersService.usersSubject$.next(
      this.localStorageService.getItem('users')
    );
  }

  onDeleteUser(id: number): void {
    this.usersService.deleteUser(id);
    const user: User[] = this.localStorageService.getItem('user');
    const filterUser = user.filter((user: User) => user.id !== id);
    user !== null && this.localStorageService.setItem('user', filterUser);
  }

  openDialog(user?: User): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: { isEdit: false, user: user },
    });
    dialogRef.afterClosed().subscribe((result) => {
      user
        ? this.usersService.editUser({ ...user, ...result })
        : this.usersService.addUser(result);
      const saveUser = this.localStorageService.getItem('users').concat(result);
      this.localStorageService.setItem('users', saveUser);
    });
  }
}
