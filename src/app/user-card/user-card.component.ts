import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { User } from '../users.interface';
// import {UsersService} from "../Services/user.service";


@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() deleteUser = new EventEmitter();

  // constructor(private usersService: UsersService) {}

  // private readonly usersService = inject(UsersService);


  delete(user: User): void {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      // Call deleteUser from UsersService
      console.log(user.id +' user is deleted');
      this.deleteUser.emit(user.id);
    }
  }
}
