import { Component, EventEmitter, Input, Output } from "@angular/core";
import { User } from "../models/user.interface";

@Component({
    selector: 'user-card-app',
    standalone: true,
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
    @Input({ required: true }) user!: User;
    @Output() deleteUser = new EventEmitter<number>();
    @Output() editUserEvent = new EventEmitter<User>();

    public onDeleteUser(): void {
        console.log('Deleting user:', this.user);
        this.deleteUser.emit(this.user.id);
    }

    public editUser(): void {
        console.log('Editing user:', this.user);
        this.editUserEvent.emit(this.user);
    }
}   