import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { User } from "@models/user.interface";
import { UserCardComponent } from "@components/user-card/user-card.component";
import { CreateEditUserComponent } from "@components/create-edit-user/create-edit-user.component";
import { Observable } from "rxjs";
import { UsersFacade } from "@app/store/users.facade";

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
    private readonly dialog = inject(MatDialog);
    private readonly facade = inject(UsersFacade);
    
    public readonly users$: Observable<User[]> = this.facade.users$;

    ngOnInit(): void {
        this.facade.loadUsers();
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

        dialogRef.afterClosed().subscribe((result: User) => {
            if (!result) return;
            if (user) {
                this.facade.updateUser({ ...user, ...result });
                this.facade.setUsers();
            } else {
                this.facade.addUser( result);
                this.facade.setUsers();
            }
        });
    }

    public deleteUser(user: User): void {
        this.facade.deleteUser(user);
        this.facade.setUsers();
    }  
}