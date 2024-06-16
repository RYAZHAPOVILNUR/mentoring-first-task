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
  @Input({required: true}) public user!: User;
  @Output() private readonly editUser = new EventEmitter<User>();
  @Output() private readonly deleteUser = new EventEmitter<number>();

  public onDelete(): void {
    this.deleteUser.emit(this.user.id);
  }

  public onEdit(): void {
    this.editUser.emit(this.user);
  }
}
