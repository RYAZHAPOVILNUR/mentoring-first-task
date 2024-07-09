import { Component, inject } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../data/services/users.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { User } from '../../../data/intefaces/user.interface';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent, CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  usersService = inject(UsersService);
  public readonly users$ = this.usersService.users$;
  private isEdit: boolean = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.usersService.loadUserData();
  }

  openDialog(user?: User) {
    if (user) {
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
    const dialogRef = this.dialog.open<
      CreateEditUserComponent,
      { user?: User; isEdit: boolean }
    >(CreateEditUserComponent, {
      data: { user, isEdit: this.isEdit },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.isEdit) {
          this.usersService.updateUser({ ...user, ...result });
        } else {
          const newUser = { ...result, id: this.generateId() };
          this.usersService.createUser(newUser);
        }
      }
    });
  }

  generateId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  onDeleteUser(id: number) {
    this.usersService.deleteUser(id);
  }
}
