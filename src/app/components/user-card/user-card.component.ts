import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../../models/users.model';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { OnlyNumbersPipe } from '../../../only-numbers.pipe';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatTooltip, MatIcon, OnlyNumbersPipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() deleteUser = new EventEmitter();
  @Output() editUser = new EventEmitter();

  readonly dialog = inject(MatDialog);

  onDeleteUser(userId: number): void {
    this.deleteUser.emit(userId);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: {
        isEdit: true,
        user: this.user,
      },
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((editResult) => {
      this.editUser.emit(editResult);
    });
  }
}