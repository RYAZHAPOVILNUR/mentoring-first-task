import { AsyncPipe, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { UserCard } from '../user-card/user-card.component';
import { usersService } from '../../usersService';
import { CreatEditUser } from "../create-edit-user/create-edit-user.component";
import { IUser } from '../../user';

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
    public isEdit = true;

    constructor(private usersService: usersService, public dialog: MatDialog) {
    }

    onCreateUser(user: IUser) {
        this.usersService.createUser(user);
    }

    onEditUser(user: IUser) {
        this.usersService.editUser(user);
    }

    onDeleteUser(id: number) {
        this.usersService.deleteUser(id);
    }

    openEditDialog(user: IUser) {
        const dialogRef = this.dialog.open(CreatEditUser, {
            data: user
        });

        dialogRef.afterClosed().subscribe(res => {
            this.onEditUser(res.data);
        });
    }

    openAddDialog() {
        const dialogRef = this.dialog.open(CreatEditUser, {});

        dialogRef.afterClosed().subscribe(res => {
            const id = crypto.randomUUID();
            const data = { ...res.data, id: id };
            this.onCreateUser(data);
        });
    }

    ngOnInit() {
        this.usersService.getUsers();
    }
}