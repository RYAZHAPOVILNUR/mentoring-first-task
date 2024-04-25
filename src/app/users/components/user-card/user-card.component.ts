import {Component, EventEmitter, Input, Output} from '@angular/core'
import {MatIconModule} from '@angular/material/icon'
import {CommonModule} from '@angular/common'
import {MatButtonModule} from '@angular/material/button'
import {User} from '../../interface/users.interface'

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user!: User
  @Output() deleteUser = new EventEmitter<number>();
  @Output() editUser = new EventEmitter<User>();

  onDeleteClick():void {
    this.deleteUser.emit(this.user.id)
  }

  onEditClick(): void {
    this.editUser.emit(this.user);

  }

}
