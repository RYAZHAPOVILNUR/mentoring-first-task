import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../../../interface/users-interface';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { EditUserDialog } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  templateUrl: './delete-user-dialog.component.html',
  standalone: true,
  imports: [MatDialogClose],
})
export class DeleteUserComponent {
  readonly data = inject<{ user: User }>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<DeleteUserComponent>);

  @Output()
  deleteUser = new EventEmitter();

  @Input()
  user: any;

  confirmDelete() {
    this.dialogRef.close(this.data.user.id);
  }

   cancel() {
    this.dialogRef.close(); 
  }
}
