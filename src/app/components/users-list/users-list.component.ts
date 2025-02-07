import { Component, inject } from '@angular/core';
import { UsersApiService } from '../../services/users-api.service';
import { NgFor } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';
import { User } from '../../interface/user';

@Component({
    selector: 'app-users-list',
    standalone: true,
    imports: [NgFor, UserCardComponent],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
    readonly usersApiService = inject(UsersApiService);
    users: User[] = [];

    constructor() {
        this.usersApiService.getUsers().subscribe(
            (Response: any) => {
                this.users = Response;
            }
        )
    }

    deleteUser(id: number) {
        this.users = this.users.filter(
            user => {
                if (id === user.id) {
                    return false
                } else {
                    return true;
                }
            }
        )
    }
}
