import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { Store } from '@ngrx/store';

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

  editCard(): void {
    this.editUserEvent.emit(this.user);
  }
}
