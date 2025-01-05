import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { User } from '../../../interfaces/User.interface';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatButton, MatButtonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input()
  user!: User;

  @Output()
  onDeletedUser = new EventEmitter();

  @Output()
  onEditUser = new EventEmitter();

  deleteUser(user: User) {
    this.onDeletedUser.emit(user);
  }

  editUser(user: User) {
    this.onEditUser.emit(user);
  }
}
