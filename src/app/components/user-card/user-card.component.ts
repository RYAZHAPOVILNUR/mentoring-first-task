import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Input } from '@angular/core';
import { IUser } from '@models/user.model';
import { MatButton } from "@angular/material/button";
import { UsersService } from "@services/users.service";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatButton,
  ],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss',],
})
export class UserCardComponent {
  @Input({required: true}) user!: IUser;
  @Output() userToDelete = new EventEmitter<string>();
  @Output() userToEdit = new EventEmitter<IUser>();

  private readonly usersService = inject(UsersService);

  public deleteUserEvent(): void {
    this.usersService.updateUsers();
    this.userToDelete.emit(this.user.username);
  }

  public editUserEvent(user?: IUser): void {
    this.userToEdit.emit(user);
  }
}
