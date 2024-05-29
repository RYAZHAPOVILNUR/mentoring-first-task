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
        this.deleteUser.emit(this.user.id);
    }

    public editUser(): void {
        this.editUserEvent.emit(this.user);
    }
}   