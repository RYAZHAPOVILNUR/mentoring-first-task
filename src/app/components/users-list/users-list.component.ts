import { AsyncPipe, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UserCard } from '../user-card/user-card.component';
import { usersService } from '../../usersService';
import { MatListModule } from '@angular/material/list';
import { CreatEditUser } from "../create-edit-user/create-edit-user.component";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IUser } from '../../user';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'users-list',
    imports: [NgFor, UserCard, AsyncPipe, MatListModule, MatDialogModule, MatButtonModule],
    standalone: true,
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css'],
})

export class UsersListComponent implements OnInit {
    @Input()

    public readonly users$ = this.usersService.users$;

    constructor(private usersService: usersService, public dialog: MatDialog) {
    }

    onCreateUser(user: IUser) {
        this.usersService.createUser(user);
    }
    
    onDeleteUser(id: number) {
        this.usersService.deleteUser(id);
    }

    openDialog() {
        const dialogRef = this.dialog.open(CreatEditUser, {})

        dialogRef.afterClosed().subscribe(res => {
            this.onCreateUser(res.data)
        })
    }

    ngOnInit() {
        this.usersService.loadUsers();
    }
}