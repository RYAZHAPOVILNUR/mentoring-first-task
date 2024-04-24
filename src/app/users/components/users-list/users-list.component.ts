import { Component, OnInit, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { createUser, createUserSuccess, deleteUser, deleteUserSuccess, editUser, editUserSuccess, getUsers } from "../../store/users/users.actions";
import { User } from "../../modules/interfaces/user.interface";
import { UsersLocalStorageService } from "../../services/users-local-storage.services";
import { selectAllUsers } from "../../store/users/users.selectors";
import { USERS_FEATURE_KEY } from "../../store/users/users.reducers";
import { UserCardComponent } from "../user-card/user-card.component";
import { CommonModule, NgIf } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { CreateEditUserComponent } from "../create-edit-user/create-edit-user.component";

@Component({
    selector: 'app-users-list',
    standalone: true,
    imports: [
        UserCardComponent,
        CommonModule,
        NgIf,
        CreateEditUserComponent,
        ReactiveFormsModule,
    ],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
    readonly store = inject(Store);
    readonly usersLocalService = inject(UsersLocalStorageService);
    readonly users$ = this.store.select(selectAllUsers);

    constructor(
        private dialog: MatDialog,
    ) { }

    openDialog(): void {
        const dialogRef = this.dialog.open(CreateEditUserComponent, {
            data: { isEdit: false }
        })
        this.store.dispatch(createUser())
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog was closed`);
            if (result) {
                console.log(result);
                this.store.dispatch(createUserSuccess({ user: result }))

                let localUsers = this.usersLocalService.getLocalStorageUsers(USERS_FEATURE_KEY);
                localUsers = [...localUsers, result]
                this.usersLocalService.setLocalStorageUsers(USERS_FEATURE_KEY, localUsers)
            }
        })
    }

    deleteUser(id: number): void {
        this.store.dispatch(deleteUser())
        this.store.dispatch(deleteUserSuccess({ id: id }))
        console.log(`Пользователь с id ${id} был удален`);
    }

    editUser(user: User): void {

        const openDialogEditUser = this.dialog.open(CreateEditUserComponent,
            {
                data: { isEdit: true, user }
            });

        this.store.dispatch(editUser());

        openDialogEditUser.afterClosed().subscribe(result => {
            console.log(`edit dialog was closed`);
            if (result) {
                this.store.dispatch(editUserSuccess({ user: result }));
                this.usersLocalService.updateLocalStorage(USERS_FEATURE_KEY, result)
            }
        })
    }

    clearStorage(): void {
        this.usersLocalService.clearLocalStorage()
    }

    ngOnInit(): void {
        this.store.dispatch(getUsers())
    }
}