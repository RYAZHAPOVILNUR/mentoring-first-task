import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import {
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardTitleGroup,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-dialog-alert',
    standalone: true,
    imports: [
        MatDialogClose,
        MatCard,
        MatCardHeader,
        MatCardTitleGroup,
        MatCardTitle,
        MatIcon,
        MatCardContent,
        MatButton,
    ],
    templateUrl: './dialog-alert.component.html',
    styleUrl: './dialog-alert.component.scss',
})
export class DialogAlertComponent {
    public message!: string;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { message: string },
        public dialogRef: MatDialogRef<DialogAlertComponent>
    ) {
        this.message = data.message;
    }

    onConfirmation() {
        this.dialogRef.close(true);
    }
}
