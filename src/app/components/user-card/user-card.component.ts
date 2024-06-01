import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'

import { IUser } from "../../user";
@Component({
    selector: 'user-card',
    standalone: true,
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.css'],
    imports: [MatCardModule, MatButtonModule]
})

export class UserCard implements OnInit {

    @Input() user!: IUser;

    @Output() onDelete: EventEmitter<any> = new EventEmitter();

    onDeleteUser(id: number) {
        this.onDelete.emit(id);
    }

    ngOnInit() {
    }
}