import { Component, OnInit, inject } from "@angular/core";
import { UsersService } from "../services/users.service";
import { UserCardComponent } from "../user-card/user-card.component";
import { CreateEditUserComponent } from "../create-edit-user/create-edit-user.component";
import { User } from "../models/user.interface";
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";

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
    
    private usersService = inject(UsersService);
    public readonly users$ = this.usersService.users$;
    private readonly dialog = inject(MatDialog);

    public openDialog(user?: User) {
        const dialogRef = this.dialog.open(CreateEditUserComponent,
            {
                data: {
                    isEdit: Boolean(user),
                    user: user,
                    title: user ? 'editUser' : 'addUser'
                }
            });

        dialogRef.afterClosed().subscribe((result) => {
            if(!result) return;
            if (user) {
                this.usersService.updateUser({ ...user, ...result });
            } else {
                this.usersService.addUser(result);
            }
        });
    }

    public deleteUser(id: number): void {
        this.usersService.deleteUser(id);
    }
}


