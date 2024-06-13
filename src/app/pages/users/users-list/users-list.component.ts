import { Component } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { HeaderComponent } from '../../header/header.component';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../../_model/users';
import { Store } from '@ngrx/store';
import { selectAllUsers } from '../../../_store/User/User.Selector';
import {
    createUserSuccess,
    editedUserSuccess,
    loadUsers,
    removeUserSuccess,
} from '../../../_store/User/User.Action';
import { Observable, take } from 'rxjs';

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
        NgComponentOutlet,
    ],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
    public readonly users$: Observable<User[]> = this.store.select(selectAllUsers);

    constructor(
        private store: Store,
        public dialog: MatDialog,
        private toastr: ToastrService
    ) {
        this.checkAndLoadUsers();
    }

    private checkAndLoadUsers(): void {
        this.users$.pipe(take(1)).subscribe(users => {
            users && users.length > 0 ? null : this.store.dispatch(loadUsers());
        });
    }

    updateUserId(user: User): void {
        this.openDialog(user);
    }

    onRemoveUser(id: number): void {
        this.store.dispatch(removeUserSuccess({ id }));
        this.toastr.success('Пользователь удален', 'Success', {});
    }

    openDialog(data?: User): void {
        const dialogRef = this.dialog.open(CreateEditUserComponent, {
            width: '350px',
            height: '500px',
            data: data,
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (result.id) {
                    this.store.dispatch(editedUserSuccess({ user: result }));
                } else {
                    this.store.dispatch(createUserSuccess({ user: result }));
                }
            }
        });
    }
}
