import { Component, Input, OnInit, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UsersCardComponent } from '../users-card/users-card.component';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserEntity } from '../../entities/UserEntity';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    UsersCardComponent,
    MatButton,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {

  private readonly usersService = inject(UsersService);
  public readonly users$ = this.usersService.users$;

  private readonly dialog = inject(MatDialog);

  public openCreateEditUserDialog(user?: UserEntity) {
    const isEdit = Boolean(user);
    const dialogRef = this.dialog.open(CreateEditUserComponent, {data: {user, isEdit}});

    dialogRef.afterClosed().subscribe((editedUser?: UserEntity) => {
      if (!editedUser) return;
      isEdit
        ? this.usersService.editUser(editedUser)
        : this.usersService.addUser(editedUser)
    })
  }

  public onUserDelete(id: number) {
    this.usersService.deleteUser(id);
  }
}
