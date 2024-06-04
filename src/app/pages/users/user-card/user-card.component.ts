import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../interfaces/users';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-user-card',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatIconModule],
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
    @Input({ required: true }) user!: User;
    @Output() deleteUserId = new EventEmitter<number>();

    onDeleteUserId() {
        this.deleteUserId.emit(this.user.id);
    }
}
