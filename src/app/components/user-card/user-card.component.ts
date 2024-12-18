import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../models/user";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle, MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

  @Input() user!: User;

  @Output() UserDelete = new EventEmitter<number>();
  @Output() UserEdit = new EventEmitter<User>();

  deleteUser(userId: number): void {
    this.UserDelete.emit(userId);
  }

  editUser(user: User){
    this.UserEdit.emit(user);
  }

  protected readonly Number = Number;
}
