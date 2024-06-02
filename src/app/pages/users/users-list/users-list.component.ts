import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { HeaderComponent } from '../../header/header.component';
import { DisplayViewComponent } from '../../display-view/display-view.component';
import { MatrixComponent } from '../../components/matrix/matrix.component';

@Component({
    selector: 'app-users-list',
    standalone: true,
    imports: [
        UserCardComponent,
        AsyncPipe,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        ReactiveFormsModule,
        HeaderComponent,
        DisplayViewComponent,
        NgComponentOutlet,
    ],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
    public readonly users$ = this.usersService.users$;

    constructor(
        private usersService: UsersService,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        this.usersService.loadUsers();
    }
    onDeleteUserId(id: number): void {
        this.usersService.deleteUser(id);
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(CreateEditUserComponent, {
            width: '350px',
            height: '500px',
            data: {},
        });
    }

    protected readonly displayComponent = MatrixComponent;
}
