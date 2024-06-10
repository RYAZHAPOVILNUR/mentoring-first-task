import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

  @Input({ required: true }) user!: User;
  @Output() deleteUserEvent = new EventEmitter<number>();
  @Output() editUserEvent = new EventEmitter<User>();

  deleteCard(): void {
    this.deleteUserEvent.emit(this.user.id);
  }

  editCard(): void {
    this.editUserEvent.emit(this.user);
  }

}
