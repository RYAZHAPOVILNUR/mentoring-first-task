import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { IUser } from '../users.interface';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user?: IUser;
  @Output() deleteUser = new EventEmitter();
  @Output() editUser = new EventEmitter();

  readonly dialogCreate = inject(MatDialog);

  public openEditDialog(): void {
    const dialogRef = this.dialogCreate.open(CreateEditUserComponent, {
      data: { user: this.user, isEdit: true },
    });

    dialogRef.afterClosed().subscribe((editResult: IUser | undefined) => {
      if (!editResult) return;
      this.editUser.emit(editResult);
    });
  }

  public onDeleteUser(id: number | undefined) {
    if (!id) return;
    this.deleteUser.emit(id);
  }
}
