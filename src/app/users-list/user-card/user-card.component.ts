import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-users-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  standalone: true,
})
export class UserCardComponent {
  @Input() user!: User;

  @Output() deleteUser = new EventEmitter();

  @Output() editUser = new EventEmitter();

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: {
        user: this.user,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.editUser.emit({ id: this.user.id, ...result });
    });
  }

  onDeleteUser(UserId: number) {
    this.deleteUser.emit(UserId);
  }
}
