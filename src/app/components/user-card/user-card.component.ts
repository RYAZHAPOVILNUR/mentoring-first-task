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

  constructor() {
  }

  onDeleteUser() {
    this.deleteUserEvent.emit(this.user.id);
  }
}
