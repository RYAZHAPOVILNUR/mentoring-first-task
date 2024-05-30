import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { UserCard } from '../user-card/user-card.component';
import { usersService } from '../../usersService';

@Component({
    selector: 'users-list',
    imports: [NgFor, UserCard, AsyncPipe],
    standalone: true,
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css'],
})

export class UsersListComponent implements OnInit {
    public readonly users$ = this.usersService.users$;

    constructor(private usersService: usersService) {
    }

    ngOnInit() {
        this.usersService.loadUsers();
    }
}