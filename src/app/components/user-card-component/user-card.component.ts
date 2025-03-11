import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { User } from '../user-list-component/user-list.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  standalone: true,
})
export class UserCard {
  @Input() user!: User;
  @Output() deleteUser = new EventEmitter();
  @Output() editUser = new EventEmitter();

  onEditUser(user: User) {
    this.editUser.emit(this.user);
  }

  onDeleteUser(userId: number): void {
    this.deleteUser.emit(userId);
  }
}
