import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditUserDialog } from './edit-user-dialog/edit-user-dialog.component';
import { User } from '../../interface/users-interface';
import { DeleteUserComponent } from './delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  imports: [],
  standalone: true,
})
export class UserCardComponent {
  readonly dialog = inject(MatDialog);

  @Input()
  user: any;

  @Output()
  deleteUser = new EventEmitter();

  @Output()
  editedUser = new EventEmitter();

  onDeleteUser(userId: number) {
    this.deleteUser.emit(userId);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialog, {
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      console.log('e dialog was closed');

      if (result) {
        this.editedUser.emit(result);
      }
    });
  }

  deleteThisUser(): void {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      console.log(this.user);

      if (result) {
        this.deleteUser.emit(result);
      }
    });
  }
}
