// src/app/components/user-card/user-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-card',
  standalone: true,
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() edit = new EventEmitter<User>();
  @Output() userDeleted = new EventEmitter<number>();

  onEdit(): void {
    this.edit.emit(this.user);
  }
  deleteUser(): void {
    this.userDeleted.emit(this.user.id);
  }
}
