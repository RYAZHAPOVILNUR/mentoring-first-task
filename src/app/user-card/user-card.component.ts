import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../types/users.interfase';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user:IUser
  @Output() deleteUser = new EventEmitter<number>()
  @Output() editUser = new EventEmitter<IUser>()

  public delete(id:number) {
      this.deleteUser.emit(id);
  }

  public edit(user:IUser) {
    this.editUser.emit(user);
  }
}
