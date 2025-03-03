import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrl: './user-cart.component.scss',
  standalone: true,
})
export class UserCartComponent {
  @Input()
  user: any;

  @Output()
  deleteUser = new EventEmitter();

  @Output()
  editUser = new EventEmitter();

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((editResult) => {
      if (editResult) {
        this.editUser.emit(editResult);
      }
    });
  }

  onDeleteUser(userId: number) {
    this.deleteUser.emit(userId);
  }
}
