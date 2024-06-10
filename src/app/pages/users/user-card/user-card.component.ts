import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../interfaces/users';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DialogAlertComponent } from '../../components/dialog-alert/dialog-alert.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

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
    @Output() updateUserId = new EventEmitter<User>();
    DialogAlertConfirmation: boolean = false;

    constructor(
        public dialog: MatDialog,
        private toastr: ToastrService
    ) {}

    onUpdateUserId() {
        this.updateUserId.emit(this.user);
    }

    onDeleteUserId() {
        this.openDialog();
        if (this.DialogAlertConfirmation) {
            this.deleteUserId.emit(this.user.id);
        }
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogAlertComponent, {
            data: { message: 'Вы точно котите удалить пользователя?' },
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteUserId.emit(this.user.id);
            }
        });
    }
}
