import { NgFor } from "@angular/common";
import { Comment } from "@angular/compiler";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
    standalone: true,
    imports: [NgFor],
})

export class UserCardComponent {
    
    @Input()
    user: any

    @Output()
    deleteUser = new EventEmitter<number>()

    onDeleteUser(userId:number) {
        this.deleteUser.emit(userId)
    }
}