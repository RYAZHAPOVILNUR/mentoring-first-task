import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../shared/models/user.models';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: IUser;
  @Output() onDeleteUser = new EventEmitter<number>();
  @Output() onEditUser = new EventEmitter<IUser>();
}
