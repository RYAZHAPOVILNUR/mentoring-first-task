import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UsersListComponent } from '../users-list/users-list.component'
import { User } from "../../modules/interfaces/user.interface";
@Component({
    selector: 'app-user-card',
    standalone: true,
    imports: [
        CommonModule,
        UsersListComponent,
    ],
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.css',
})
export class UserCardComponent {
    @Input({ required: true }) user: User | undefined

    @Output() deleteUser = new EventEmitter;
    @Output() editUser: EventEmitter<User> = new EventEmitter<User>;

    constructor(public userList: UsersListComponent) { }

    delUser() {
        this.deleteUser.emit(this.user?.id)
    }

    onEditUser() {
        this.editUser.emit(this.user)
    }
}