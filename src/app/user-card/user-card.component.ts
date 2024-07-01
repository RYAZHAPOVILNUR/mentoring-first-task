import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { User } from '../user.interface';
import { UsersService } from '../data/services/users.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { LocalStorageService } from '../data/services/local-storage.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() deleteUserEvent = new EventEmitter<number>();

  private readonly userService = inject(UsersService);
  public readonly localStorageService = inject(LocalStorageService);
  private readonly dialog = inject(MatDialog);
  private dialogRef?: MatDialogRef<CreateEditUserComponent>;

  onDeleteUser(): void {
    this.deleteUserEvent.emit(this.user.id);
  }

  onEditUser(user: User): void {
    this.dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: { isEdit: true, user: user },
    });
    this.dialogRef.afterClosed().subscribe((result) => {
      this.userService.editUser({ ...user, ...result });
    });
  }
}
