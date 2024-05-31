import { AsyncPipe, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
    @Input()

    public readonly users$ = this.usersService.users$;

    constructor(private usersService: usersService) {
    }

    onDeleteUser(id: number) {
        this.usersService.deleteUser(id);
    }

    ngOnInit() {
        this.usersService.loadUsers();
    }
}