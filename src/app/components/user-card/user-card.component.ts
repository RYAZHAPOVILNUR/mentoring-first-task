import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Input } from '@angular/core';
import { IUser } from '@models/user.model';
import { MatButton } from "@angular/material/button";
import { LocalStorageAct } from "@services/localStorageAct";

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
  @Output() userToDelete = new EventEmitter<IUser>();
  @Output() userToEdit = new EventEmitter<IUser>();

  private readonly localStorageAct = inject(LocalStorageAct);

  public deleteUserEvent(): void {
    this.localStorageAct.updateUsers();
    this.userToDelete.emit(this.user);
  }

  public editUserEvent(user?: IUser): void {
    this.userToEdit.emit(user);
  }
}
