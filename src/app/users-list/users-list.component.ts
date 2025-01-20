import { NgFor } from "@angular/common";
import { Component, inject } from "@angular/core";
import {UsersApiService} from "../users-api.service";
import {UserCardComponent} from "./user-card/user-card.component";
import { ChangeDetectionStrategy } from "@angular/core";
import { UsersService } from "../users.service";
import { AsyncPipe } from "@angular/common";

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
    imports: [NgFor, UserCardComponent, AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent {
    readonly usersApiService = inject(UsersApiService);
    readonly usersService = inject(UsersService);

    constructor() {
      this.usersApiService.getUsers().subscribe(
          (response: any) => {
              this.usersService.setUsers(response);
          }
      )
    }

    deleteUser(id: number) {
        this.usersService.deleteUser(id)
    }
}

