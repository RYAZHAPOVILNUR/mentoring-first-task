import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../model/user';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatCard, MatCardContent, MatCardActions, MatButton],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input({ required: true })
  public user!: User;

  @Output()
  private deleteUserEvent = new EventEmitter<number>();
  @Output()
  private editUserEvent = new EventEmitter<User>();

  public onDeleteUser() {
    this.deleteUserEvent.emit(this.user.id);
  }

  public onEditUser() {
    this.editUserEvent.emit(this.user);
  }
}
