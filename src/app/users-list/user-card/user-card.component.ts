import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IUser} from "../../interface/user";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input({ required: true }) user!: IUser;
  @Output() onDeleteUser = new EventEmitter<number>()
  @Output() onEditUser = new EventEmitter<IUser>()
}
