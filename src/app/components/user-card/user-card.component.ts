import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { Input } from '@angular/core';
import { User } from '../../interface/users.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CreateEditUserComponen } from '../create-edit-user/create-edit-user.component';
import { Store } from '@ngrx/store';
import * as actionUser from '../../store/user.action';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    UserListComponent,
    MatButtonModule,
    MatCardModule,
    CreateEditUserComponen,
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input({ required: true }) user!: User;
  @Output() remove = new EventEmitter<number>();
  @Output() editUserEvent = new EventEmitter<User>();

  constructor(private store: Store) {}

  public removeUser(id: number) {
    this.store.dispatch(actionUser.deleteUser({ id }));
  }

  public redaction(user: User) {
    this.editUserEvent.emit(user);
  }
}
