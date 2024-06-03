import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "@app/types/user.model";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() public user!: User;
  @Output() private readonly editUserEvent = new EventEmitter<User>();
  @Output() private readonly deleteUserEvent = new EventEmitter<number>();

  public onDelete() {
    this.deleteUserEvent.emit(this.user.id);
  }

  public onEdit() {
    this.editUserEvent.emit(this.user);
  }
}
