import { Component, EventEmitter, Input, Output, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { UsersActions } from '../../store/users.actions';
import { User } from '../../../types/user.type';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  public store = inject(Store);
  @Input({ required: true }) public user!: User;
  @Input({ required: true }) public index!: number;
  @Output() public editableUser = new EventEmitter<User>();

  public onDeleteClick(id: number) {
    this.store.dispatch(UsersActions.deleteUser({ id }));
  }
  public onEditClick(user: User) {
    this.editableUser.emit(user);
  }
}
