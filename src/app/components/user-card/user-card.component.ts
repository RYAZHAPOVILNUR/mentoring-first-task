import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../shared/interfaces/user.interface'; 

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() deleteUser = new EventEmitter<User>();
  @Output() editUser = new EventEmitter<User>();

  public deleteUserById(user: User): void {
    this.deleteUser.emit(user);
  }

  public onEditUser(user: User): void {
    this.editUser.emit(user);
  }
}
