import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'user-card',
  standalone: true,
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() user: IUser | null = null;

  @Output() deleteUser = new EventEmitter<number>();
  @Output() editUser = new EventEmitter<IUser>();

  onDeleteUser(id: number | undefined): void {
    this.deleteUser.emit(id);
  }

  onEditUser(): void {
    if (this.user) {
      this.editUser.emit(this.user);
    }
  }
}
