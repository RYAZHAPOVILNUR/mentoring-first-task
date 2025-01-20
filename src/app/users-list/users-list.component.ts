import { NgFor } from "@angular/common";
import { Component, inject } from "@angular/core";
import {UsersApiService} from "../users-api.service";
import {UserCardComponent} from "./user-card/user-card.component";

export interface User {
  "id": number,
  "name": string,
  "username": string,
  "email": string,
  "address": {
      "street": string,
      "suite": string,
      "city": string,
      "zipcode": number,
      "geo": {
          "lat": string,
          "lng": string
    }
  },
  "phone": number,
  "website": string,
  "company": {
      "name": string,
      "catchPhrase": string,
      "bs": string
  }
}

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
    standalone:true,
    imports: [NgFor, UserCardComponent]
})

export class UsersListComponent {
    readonly usersApiService = inject(UsersApiService)
    users: User[] = [];

    constructor() {
      this.usersApiService.getUsers().subscribe(
          (response: any) => {
              this.users = response;
              console.log('USERS: ',this.users)
          }
      )
    }

    deleteUser(id: number) {
      this.users = this.users.filter(
        (item: { id: number; }) => {
          return item.id !== id;
        }
      )

    }
}

