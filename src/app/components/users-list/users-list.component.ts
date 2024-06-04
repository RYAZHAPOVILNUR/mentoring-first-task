import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { selectLoadUsers } from "@app/store/selectors/user.selectors";
import * as UserActions from "@store/actions/user.actions";
import { User } from "@models/user.interface";
import { UserCardComponent } from "@components/user-card/user-card.component";
import { CreateEditUserComponent } from "@components/create-edit-user/create-edit-user.component";
// import { UsersService } from "@services/users.service";

@Component({
    selector: 'users-list-app',
    standalone: true,
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    imports: [
        UserCardComponent,
        CommonModule,
        CreateEditUserComponent,
    ]
})
export class UsersListComponent {
    // private usersService = inject(UsersService);
    // public readonly users$ = this.usersService.users$;
    private readonly dialog = inject(MatDialog);

    private readonly store = inject(Store);
    public readonly users$ = this.store.select(selectLoadUsers);

    constructor() {
        this.store.dispatch(UserActions.loadUsers());
    }

    public openDialog(user?: User) {
        const dialogRef = this.dialog.open(CreateEditUserComponent,
            {
                data: {
                    isEdit: Boolean(user),
                    user: user,
                    title: user ? 'editUser' : 'addUser'
                }
            });

        dialogRef.afterClosed().subscribe(result => {
            if (!result) return;
            if (user) {
                // this.usersService.updateUser({ ...user, ...result });
                this.store.dispatch(UserActions.updateUser({ user: { ...user, ...result }}));
            } else {
                this.store.dispatch(UserActions.addUser({ user: result }))
                // this.usersService.addUser(result);
            }
        });
    }

    public deleteUser(id: number): void {
        this.store.dispatch(UserActions.deleteUser({ id }))
        // this.usersService.deleteUser(id);
    }
}