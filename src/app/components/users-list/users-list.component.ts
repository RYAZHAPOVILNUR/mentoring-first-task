import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsersApiService } from '../../http.service';
import { User } from '../../user';
import { UserCard } from '../user-card/user-card.component';

@Component({
    selector: 'users-list',
    imports: [NgFor, UserCard],
    standalone: true,
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
})


export class UsersListComponent implements OnInit {

    users: User[] = [];

    constructor(
        private usersService: UsersApiService
    ) { }

    getUsers(): void {
        this.usersService.getUsers()
            .subscribe((users: any) => this.users = users)
    }

    ngOnInit() {
        this.getUsers()
    }
}