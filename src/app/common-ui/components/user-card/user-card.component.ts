import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { User } from '../../../data/intefaces/user.interface';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../data/services/users.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() deleteUser = new EventEmitter<number>();
  @Output() editUser = new EventEmitter<User>();
  usersService = inject(UsersService);
}
