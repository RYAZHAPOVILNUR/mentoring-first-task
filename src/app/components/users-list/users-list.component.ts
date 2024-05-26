import {Component} from '@angular/core';
import {UsersApiService} from "../../services/usersApi.service";
import {UserCardComponent} from "../user-card/user-card.component";
import {IUser} from "../../types/user.interface";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  protected user: IUser;

  constructor(private readonly usersService: UsersApiService) {
    this.usersService.getUsers();

    this.user = {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496"
        }
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets"
      }
    }
  }
}
