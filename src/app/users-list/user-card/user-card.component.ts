import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CreateEditUser, User } from '../../interfaces/user.interface';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  standalone: true,
  imports: [MatButton, MatCardSubtitle, MatCardContent, MatCardTitle, MatCard],
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input({ required: true })
  user!: User;

  @Output()
  deleteUser = new EventEmitter<number>();

  @Output()
  editUser = new EventEmitter<User>();

  public onDeleteUser(userId: number) {
    this.deleteUser.emit(userId);
  }
}
