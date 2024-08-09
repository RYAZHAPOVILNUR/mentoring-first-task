import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {User} from "../../types/user.types";
import {DialogOverviewComponent} from "../dialog-overview/dialog-overview.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-user-card',
  standalone: true,
  templateUrl: './user-card.component.html',
  imports: [
    DialogOverviewComponent,
    AsyncPipe,
    NgForOf,
    FormsModule,
  ],
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input({required: true}) user!: User;
  @Output() deleteUserEvent = new EventEmitter<number>();
  @Output() editUserEvent = new EventEmitter<any>();

  delete(user: User): void {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      console.log(user.id + ' user is deleted');
      this.deleteUserEvent.emit(user.id);
    }
  };

  edit(user: User): void {
    this.editUserEvent.emit(user);
  }
}
