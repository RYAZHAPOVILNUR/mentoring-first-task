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
export class UsersListComponent implements OnInit {
    private usersService = inject(UsersService);
    public readonly users$ = this.usersService.users$;
    private readonly dialog = inject(MatDialog);

    ngOnInit(): void {
        console.log('Initializing UsersListComponent...');
        this.usersService.loadUsersAPI();
    }

    public deleteUser(id: number): void {
        console.log('Deleting user with ID:', id);
        this.usersService.deleteUser(id);
    }

    public openDialog(user?: User) {
        const dialogRef = this.dialog.open(CreateEditUserComponent,
            {
                data: {
                    isEdit: !!user,
                    user: user,
                    title: user ? 'editUser' : 'addUser'
                }
            });

        dialogRef.afterClosed().subscribe((result) => {
            console.log('Dialog result:', result);
            if (user) {
                this.usersService.updateUser({ ...user, ...result });
            } else {
                this.usersService.addUser(result);
            }
        });
    }
}


