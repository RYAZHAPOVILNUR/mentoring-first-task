import { NgFor, NgIf } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { UsersApiService } from "../../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";


@Component({
    selector: 'app-users-list',
    standalone: true,
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
    imports: [ NgFor, NgIf, UserCardComponent, ]
})

export class UsersComponent {
    readonly usersApiService = inject(UsersApiService)
    users: any = [];

    constructor() {
        this.usersApiService.getUsers().subscribe(
            (respons: any) => {
                this.users = respons;
                console.log('USERS:', 'this.users')
            }
        )
    }

    deleteUser(id: number) {
        this.users = this.users.filter(
            // @ts-ignore
            item => {
                if (id === item.id) {
                    return false   
                }   
                    else {
                        return true
                    }
            }
        )
    }
}