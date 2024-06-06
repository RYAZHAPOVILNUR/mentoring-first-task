import { Component, EventEmitter, Input, Output } from '@angular/core'
import { User } from '../../user.model'

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: User
  @Output() onDeleteUser = new EventEmitter<number>()
  @Output() onEditUser = new EventEmitter<User>();
  
  public deleteUser(): void { this.onDeleteUser.emit(this.user.id)}
  public editUser(): void { this.onEditUser.emit(this.user)}
}