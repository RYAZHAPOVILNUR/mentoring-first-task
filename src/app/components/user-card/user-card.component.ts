import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../types/user.model";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() deleteUserEvent = new EventEmitter<number>();
  @Output() editUserEvent = new EventEmitter<User>();

  onDelete() {
    this.deleteUserEvent.emit(this.user.id);
  }

  onEdit() {
    this.editUserEvent.emit(this.user);
  }
}
