import {Component, Input} from '@angular/core';
import {IUser} from "../../types/user.interface";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input()
  user?: IUser;

  constructor() {
  }
}
