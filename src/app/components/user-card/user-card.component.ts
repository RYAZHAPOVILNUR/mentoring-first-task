import { Component, EventEmitter, Input, Output } from '@angular/core'
import { User } from '../../data/interfaces/users.interface'
import { MatButton, MatFabButton } from '@angular/material/button'
import { MatCard, MatCardContent } from '@angular/material/card'

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatFabButton, MatCard, MatCardContent, MatButton],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user!: User
  @Output() deleteUserEvent: EventEmitter<number> = new EventEmitter<number>()
  @Output() editUserEvent: EventEmitter<User> = new EventEmitter<User>()

  public onDeleteUser(user: User): void {
    this.deleteUserEvent.emit(user.id)
  }

  public onEditUser(user: User): void {
    this.editUserEvent.emit(user)
  }
}
